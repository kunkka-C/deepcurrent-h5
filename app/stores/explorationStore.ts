"use client";

import { useSyncExternalStore } from "react";
import type { GraphData } from "@/app/types/graph";

const DEFAULT_STAGGER_MS = 150;
const RECENT_DISCOVERY_MS = 900;

export interface ExplorationState {
  discoveredNodeIds: string[];
  recentlyDiscoveredNodeIds: string[];
  discoveredAt: Record<string, number>;
  coreNodeIds: string[];
  focusNodeId: string | null;
  waveOriginNodeId: string | null;
  waveStartedAt: number | null;
  totalNodes: number;
  isClosed: boolean;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let graphSnapshot: GraphData | null = null;
let revealTimeouts: ReturnType<typeof setTimeout>[] = [];
let recentNodeTimeouts: ReturnType<typeof setTimeout>[] = [];

const buildDefaultState = (): ExplorationState => ({
  discoveredNodeIds: [],
  recentlyDiscoveredNodeIds: [],
  discoveredAt: {},
  coreNodeIds: [],
  focusNodeId: null,
  waveOriginNodeId: null,
  waveStartedAt: null,
  totalNodes: 0,
  isClosed: false,
});

let state: ExplorationState = buildDefaultState();

function notify(): void {
  listeners.forEach((listener) => listener());
}

function setState(updater: (currentState: ExplorationState) => ExplorationState): void {
  state = updater(state);
  notify();
}

function clearTimers(): void {
  revealTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  revealTimeouts = [];

  recentNodeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  recentNodeTimeouts = [];
}

function pickCoreNodeIds(graphData: GraphData): string[] {
  const preferred = graphData.nodes.filter((node) => node.isCore).map((node) => node.id);
  const fallback = graphData.nodes.map((node) => node.id);
  const source = preferred.length > 0 ? preferred : fallback;
  const coreCount = Math.min(3, Math.max(1, source.length));

  return source.slice(0, coreCount);
}

function createStateFromGraph(graphData: GraphData, isClosed: boolean): ExplorationState {
  const coreNodeIds = pickCoreNodeIds(graphData);
  const discoveredAt = coreNodeIds.reduce<Record<string, number>>((acc, nodeId) => {
    acc[nodeId] = Date.now();
    return acc;
  }, {});

  return {
    discoveredNodeIds: [...coreNodeIds],
    recentlyDiscoveredNodeIds: [],
    discoveredAt,
    coreNodeIds,
    focusNodeId: coreNodeIds[0] ?? null,
    waveOriginNodeId: null,
    waveStartedAt: null,
    totalNodes: graphData.nodes.length,
    isClosed,
  };
}

function addRecentDiscovery(nodeId: string): void {
  setState((currentState) => ({
    ...currentState,
    recentlyDiscoveredNodeIds: [...new Set([...currentState.recentlyDiscoveredNodeIds, nodeId])],
  }));

  const timeoutId = setTimeout(() => {
    setState((currentState) => ({
      ...currentState,
      recentlyDiscoveredNodeIds: currentState.recentlyDiscoveredNodeIds.filter(
        (recentNodeId) => recentNodeId !== nodeId,
      ),
    }));
  }, RECENT_DISCOVERY_MS);

  recentNodeTimeouts.push(timeoutId);
}

function markNodeDiscovered(nodeId: string): void {
  const isAlreadyDiscovered = state.discoveredNodeIds.includes(nodeId);
  if (isAlreadyDiscovered) {
    return;
  }

  const discoveredAt = Date.now();
  setState((currentState) => ({
    ...currentState,
    discoveredNodeIds: [...currentState.discoveredNodeIds, nodeId],
    discoveredAt: {
      ...currentState.discoveredAt,
      [nodeId]: discoveredAt,
    },
  }));

  addRecentDiscovery(nodeId);
}

const subscribe = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = (): ExplorationState => state;

export function useExplorationStore<T>(selector: (snapshot: ExplorationState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getSnapshot()),
    () => selector(getSnapshot()),
  );
}

export const explorationStore = {
  getState(): ExplorationState {
    return state;
  },

  initialize(graphData: GraphData): void {
    graphSnapshot = graphData;
    clearTimers();
    state = createStateFromGraph(graphData, state.isClosed);
    notify();
  },

  discoverNode(nodeId: string): void {
    markNodeDiscovered(nodeId);
  },

  discoverNodesWithWave(nodeIds: string[], staggerMs = DEFAULT_STAGGER_MS): void {
    const uniqueNodeIds = [...new Set(nodeIds)];
    const hiddenNodeIds = uniqueNodeIds.filter((nodeId) => !state.discoveredNodeIds.includes(nodeId));

    hiddenNodeIds.forEach((nodeId, index) => {
      const timeoutId = setTimeout(() => {
        markNodeDiscovered(nodeId);
      }, index * Math.max(0, staggerMs));

      revealTimeouts.push(timeoutId);
    });
  },

  setFocusNode(nodeId: string | null): void {
    setState((currentState) => ({
      ...currentState,
      focusNodeId: nodeId,
    }));
  },

  startWave(nodeId: string | null): void {
    setState((currentState) => ({
      ...currentState,
      waveOriginNodeId: nodeId,
      waveStartedAt: nodeId ? Date.now() : null,
    }));
  },

  close(): void {
    setState((currentState) => ({
      ...currentState,
      isClosed: true,
    }));
  },

  open(): void {
    setState((currentState) => ({
      ...currentState,
      isClosed: false,
    }));
  },

  reset(): void {
    if (!graphSnapshot) {
      return;
    }

    clearTimers();
    state = createStateFromGraph(graphSnapshot, false);
    notify();
  },

  dispose(): void {
    clearTimers();
  },
};
