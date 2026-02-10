"use client";

import { motion, type Variants } from "framer-motion";
import { BarChart3, Eye, Newspaper, Trash2, type LucideIcon } from "lucide-react";

type PainPoint = {
  emoji: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const painPoints: PainPoint[] = [
  {
    emoji: "📊",
    icon: BarChart3,
    title: "信息过载",
    description: "每天面对数百条科技资讯，筛选耗时费力",
  },
  {
    emoji: "📰",
    icon: Newspaper,
    title: "理解表面",
    description: "浅层报道多，缺乏深度分析和洞察",
  },
  {
    emoji: "👁️",
    icon: Eye,
    title: "视角单一",
    description: "单一媒体视角，难以获得全面客观的信息",
  },
  {
    emoji: "🗑️",
    icon: Trash2,
    title: "知识流失",
    description: "阅后即忘，珍贵的信息无法沉淀和复用",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PainPoints() {
  return (
    <section id="pain-points" className="relative px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="text-[28px] font-bold leading-tight text-white">
            还在被信息淹没？
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={itemVariants}
              className="group rounded-[24px] border border-white/10 bg-[rgba(15,39,68,0.6)] p-6 backdrop-blur-[12px] transition-colors duration-300 hover:border-white/20"
            >
              <div className="mb-4 flex items-center">
                <point.icon className="h-10 w-10 text-[#00D4FF]" aria-hidden="true" />
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">
                {point.emoji} {point.title}
              </h3>

              <p className="leading-relaxed text-white/70">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
