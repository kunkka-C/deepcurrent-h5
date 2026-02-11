"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Compass, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockGraph } from "@/app/data/mockGraph";
import { explorationStore, useExplorationStore } from "@/app/stores/explorationStore";
import type { GraphData, GraphNode } from "@/app/types/graph";
import { getNodeId } from "@/app/types/graph";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const GROUP_COLORS: Record<GraphNode["group"], string> = {
  core: "#00D4FF",
  concept: "#7C3AED",
  signal: "#EC4899",
  agent: "#22D3EE",
  tool: "#60A5FA",
};

const WAVE_DURATION_MS = 1200;

interface FogGraphProps {
  className?: string;
  graphData?: GraphData;
  onClose?: () => void;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

export default function FogGraph({
  className,
  graphData = mockGraph,
  onClose,
}: FogGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const graphRef = useRef<any>(null);
  const didFitRef = useRef(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const {
    discoveredNodeIds,
    recentlyDiscoveredNodeIds,
    discoveredAt,
    focusNodeId,
    waveOriginNodeId,
    waveStartedAt,
    totalNodes,
    isClosed,
  } = useExplorationStore((state) => state);

  const discoveredSet = useMemo(() => new Set(discoveredNodeIds), [discoveredNodeIds]);
  const recentlyDiscoveredSet = useMemo(
    () => new Set(recentlyDiscoveredNodeIds),
    [recentlyDiscoveredNodeIds],
  );

  const adjacencyMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    graphData.nodes.forEach((node) => {
      map.set(node.id, new Set<string>());
    });

    graphData.links.forEach((link) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);
      map.get(sourceId)?.add(targetId);
      map.get(targetId)?.add(sourceId);
    });

    return map;
  }, [graphData]);

  const visibleGraph = useMemo<GraphData>(() => {
    const nodes = graphData.nodes.filter((node) => discoveredSet.has(node.id));
    const links = graphData.links.filter((link) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);
      return discoveredSet.has(sourceId) && discoveredSet.has(targetId);
    });

    return { nodes, links };
  }, [graphData, discoveredSet]);

  const discoveredCount = discoveredNodeIds.length;
  const progressRatio = totalNodes > 0 ? discoveredCount / totalNodes : 0;

  const focusNode = useCallback((node: GraphNode | null, zoom = 3): void => {
    if (!node || !graphRef.current) {
      return;
    }

    if (typeof node.x !== "number" || typeof node.y !== "number") {
      return;
    }

    graphRef.current.centerAt(node.x, node.y, 700);
    graphRef.current.zoom(zoom, 700);
  }, []);

  const fitGraph = useCallback(() => {
    if (!graphRef.current) {
      return;
    }

    graphRef.current.zoomToFit(800, 80);
  }, []);

  const handleReset = useCallback(() => {
    explorationStore.reset();
    explorationStore.startWave(null);
    didFitRef.current = false;
    window.setTimeout(() => {
      fitGraph();
    }, 80);
  }, [fitGraph]);

  const handleClose = useCallback(() => {
    explorationStore.close();
    onClose?.();
  }, [onClose]);

  const handleNodeClick = useCallback(
    (rawNode: unknown) => {
      const node = rawNode as GraphNode;
      explorationStore.discoverNode(node.id);
      explorationStore.setFocusNode(node.id);
      explorationStore.startWave(node.id);

      const linkedHiddenNodeIds = [...(adjacencyMap.get(node.id) ?? new Set<string>())].filter(
        (linkedNodeId) => !discoveredSet.has(linkedNodeId),
      );

      // Spawn related hidden nodes near the clicked origin, then release simulation.
      linkedHiddenNodeIds.forEach((hiddenNodeId, index) => {
        const hiddenNode = graphData.nodes.find((candidate) => candidate.id === hiddenNodeId);
        if (!hiddenNode) {
          return;
        }

        if (typeof node.x !== "number" || typeof node.y !== "number") {
          return;
        }

        const angle = (Math.PI * 2 * index) / Math.max(1, linkedHiddenNodeIds.length);
        const spread = 22 + Math.random() * 16;
        hiddenNode.x = node.x + Math.cos(angle) * spread;
        hiddenNode.y = node.y + Math.sin(angle) * spread;
        hiddenNode.vx = Math.cos(angle) * (0.4 + Math.random() * 0.5);
        hiddenNode.vy = Math.sin(angle) * (0.4 + Math.random() * 0.5);
      });

      explorationStore.discoverNodesWithWave(linkedHiddenNodeIds, 150);
      graphRef.current?.d3ReheatSimulation?.();
      focusNode(node);
    },
    [adjacencyMap, discoveredSet, focusNode, graphData.nodes],
  );

  const drawNode = useCallback(
    (rawNode: unknown, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const node = rawNode as GraphNode;
      const baseColor = GROUP_COLORS[node.group] ?? "#00D4FF";
      const nodeDiscoveredAt = discoveredAt[node.id] ?? Date.now();
      const revealProgress = Math.min(1, (Date.now() - nodeDiscoveredAt) / 650);
      const revealScale = 0.45 + easeOutCubic(revealProgress) * 0.55;
      const radius = (node.size ?? 7) * revealScale;
      const isFocused = node.id === focusNodeId;
      const isRecent = recentlyDiscoveredSet.has(node.id);

      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, radius + (isFocused ? 1.8 : 0), 0, 2 * Math.PI);
      ctx.fillStyle = baseColor;
      ctx.shadowBlur = isFocused ? 30 : isRecent ? 20 : 12;
      ctx.shadowColor = isFocused ? "#00D4FF" : baseColor;
      ctx.fill();

      if (isRecent || isFocused) {
        const ringProgress = Math.min(1, (Date.now() - nodeDiscoveredAt) / 1000);
        const ringAlpha = Math.max(0, 0.45 - ringProgress * 0.45);
        ctx.beginPath();
        ctx.arc(
          node.x ?? 0,
          node.y ?? 0,
          radius + 8 + ringProgress * 16,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(0, 212, 255, ${ringAlpha})`;
        ctx.lineWidth = Math.max(1.25, 2 / globalScale);
        ctx.stroke();
      }

      const label = node.label;
      const fontSize = Math.max(10, 13 / globalScale);
      ctx.font = `${fontSize}px Inter, -apple-system, BlinkMacSystemFont, sans-serif`;
      const textWidth = ctx.measureText(label).width;
      const labelX = (node.x ?? 0) + radius + 7;
      const labelY = (node.y ?? 0) + fontSize / 3;
      const paddingX = 6;
      const paddingY = 4;

      ctx.fillStyle = "rgba(10, 22, 40, 0.72)";
      ctx.fillRect(
        labelX - paddingX,
        labelY - fontSize + 1 - paddingY,
        textWidth + paddingX * 2,
        fontSize + paddingY * 2,
      );
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(label, labelX, labelY);

      ctx.restore();
    },
    [discoveredAt, focusNodeId, recentlyDiscoveredSet],
  );

  const drawFog = useCallback(() => {
    const canvas = canvasRef.current;
    const graph = graphRef.current;
    if (!canvas || !graph || viewport.width <= 0 || viewport.height <= 0) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const baseGradient = ctx.createRadialGradient(
      viewport.width / 2,
      viewport.height / 2,
      Math.min(viewport.width, viewport.height) * 0.08,
      viewport.width / 2,
      viewport.height / 2,
      Math.max(viewport.width, viewport.height) * 0.72,
    );
    baseGradient.addColorStop(0, "rgba(6, 14, 28, 0.48)");
    baseGradient.addColorStop(1, "rgba(4, 8, 18, 0.88)");
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    const graphSnapshot = graph.graphData?.();
    const visibleNodes: GraphNode[] = graphSnapshot?.nodes ?? [];
    if (visibleNodes.length === 0) {
      return;
    }

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    visibleNodes.forEach((node) => {
      if (typeof node.x !== "number" || typeof node.y !== "number") {
        return;
      }

      const screenCoords = graph.graph2ScreenCoords(node.x, node.y);
      const nodeDiscoveredAt = discoveredAt[node.id] ?? Date.now();
      const revealProgress = Math.min(1, (Date.now() - nodeDiscoveredAt) / 700);
      const revealScale = 0.6 + easeOutCubic(revealProgress) * 0.4;
      const isFocused = node.id === focusNodeId;
      const radius = ((node.size ?? 7) * 9 + 60 + (isFocused ? 34 : 0)) * revealScale;

      const lightMask = ctx.createRadialGradient(
        screenCoords.x,
        screenCoords.y,
        Math.max(16, radius * 0.16),
        screenCoords.x,
        screenCoords.y,
        radius,
      );
      lightMask.addColorStop(0, "rgba(0, 0, 0, 0.95)");
      lightMask.addColorStop(0.45, "rgba(0, 0, 0, 0.6)");
      lightMask.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = lightMask;
      ctx.beginPath();
      ctx.arc(screenCoords.x, screenCoords.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    if (waveOriginNodeId && waveStartedAt) {
      const waveSource = visibleNodes.find((node) => node.id === waveOriginNodeId);
      if (waveSource && typeof waveSource.x === "number" && typeof waveSource.y === "number") {
        const elapsed = Date.now() - waveStartedAt;
        if (elapsed < WAVE_DURATION_MS) {
          const progress = elapsed / WAVE_DURATION_MS;
          const center = graph.graph2ScreenCoords(waveSource.x, waveSource.y);
          const maxWaveRadius = Math.max(viewport.width, viewport.height) * 0.36;
          const waveRadius = 30 + progress * maxWaveRadius;
          const bandSize = 34 - progress * 22;
          const ringMask = ctx.createRadialGradient(
            center.x,
            center.y,
            Math.max(1, waveRadius - bandSize),
            center.x,
            center.y,
            waveRadius,
          );

          ringMask.addColorStop(0, "rgba(0, 0, 0, 0)");
          ringMask.addColorStop(0.75, `rgba(0, 0, 0, ${0.3 * (1 - progress)})`);
          ringMask.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = ringMask;
          ctx.beginPath();
          ctx.arc(center.x, center.y, waveRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }, [discoveredAt, focusNodeId, viewport, waveOriginNodeId, waveStartedAt]);

  useEffect(() => {
    explorationStore.open();
    explorationStore.initialize(graphData);
    didFitRef.current = false;

    return () => {
      explorationStore.dispose();
    };
  }, [graphData]);

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }

      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [handleClose, handleReset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = Math.max(320, Math.round(entry.contentRect.width));
      const nextHeight = Math.max(420, Math.round(entry.contentRect.height));
      setViewport((current) => {
        if (current.width === nextWidth && current.height === nextHeight) {
          return current;
        }

        return { width: nextWidth, height: nextHeight };
      });
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewport.width <= 0 || viewport.height <= 0) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
  }, [viewport]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph || !focusNodeId) {
      return;
    }

    const node = visibleGraph.nodes.find((candidate) => candidate.id === focusNodeId);
    if (!node) {
      return;
    }

    const timeoutId = setTimeout(() => {
      focusNode(node, 3);
    }, 60);

    return () => clearTimeout(timeoutId);
  }, [focusNode, focusNodeId, visibleGraph.nodes]);

  useEffect(() => {
    let animationFrameId = 0;

    const paint = () => {
      drawFog();
      animationFrameId = window.requestAnimationFrame(paint);
    };

    animationFrameId = window.requestAnimationFrame(paint);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawFog]);

  useEffect(() => {
    graphRef.current?.d3ReheatSimulation?.();
  }, [discoveredCount]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1b2b50_0%,#0A1628_45%,#050913_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.08),transparent_55%)]" />

      {viewport.width > 0 && viewport.height > 0 && (
        <ForceGraph2D
          ref={graphRef}
          width={viewport.width}
          height={viewport.height}
          graphData={visibleGraph}
          backgroundColor="rgba(0,0,0,0)"
          nodeRelSize={5}
          cooldownTicks={90}
          d3AlphaDecay={0.018}
          d3VelocityDecay={0.23}
          enableNodeDrag
          linkWidth={1.4}
          linkColor={() => "rgba(149, 190, 255, 0.28)"}
          linkDirectionalParticles={1}
          linkDirectionalParticleColor={() => "rgba(0, 212, 255, 0.6)"}
          linkDirectionalParticleWidth={1.7}
          linkDirectionalParticleSpeed={() => 0.0035}
          nodeCanvasObjectMode={() => "replace"}
          nodeCanvasObject={drawNode}
          onNodeClick={handleNodeClick}
          onEngineStop={() => {
            if (didFitRef.current) {
              return;
            }

            didFitRef.current = true;
            fitGraph();
          }}
        />
      )}

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />

      <div className="absolute left-4 top-4 right-4 z-20 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0F2744]/70 p-4 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between text-sm text-white/70">
            <span className="inline-flex items-center gap-2 font-medium text-white/90">
              <Compass className="h-4 w-4 text-[#00D4FF]" />
              Fog Exploration
            </span>
            <span>
              Discovered {discoveredCount}/{totalNodes} nodes
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#38BDF8] to-[#7C3AED] transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round(progressRatio * 100))}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-white/60">
            Click a node to unveil connected knowledge hidden in the fog.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-[#0F2744]/65 p-2 backdrop-blur-xl">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-3 py-2 text-xs font-medium text-[#BDEFFF] transition-colors hover:bg-[#00D4FF]/20"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset (R)
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/10"
          >
            <X className="h-3.5 w-3.5" />
            Close (Esc)
          </button>
        </div>
      </div>

      {isClosed && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#030712]/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-[#0F2744]/80 p-6 text-center shadow-2xl">
            <p className="mb-3 text-sm text-white/80">Exploration paused</p>
            <button
              type="button"
              onClick={() => explorationStore.open()}
              className="rounded-xl bg-[#00D4FF] px-4 py-2 text-sm font-semibold text-[#0A1628] transition-transform hover:scale-[1.03]"
            >
              Reopen graph
            </button>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-xl border border-white/10 bg-[#0A1628]/70 px-3 py-2 text-[11px] text-white/65 backdrop-blur-xl">
        <span className="font-medium text-white/75">Shortcuts:</span> Esc close • R reset
      </div>
    </div>
  );
}
