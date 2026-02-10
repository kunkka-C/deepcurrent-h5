"use client";

import { motion, Variants } from "framer-motion";
import { BarChart3, Newspaper, Eye, Trash2 } from "lucide-react";

const painPoints = [
  {
    icon: BarChart3,
    title: "信息过载",
    description: "每天面对数百条科技资讯，筛选耗时费力，重要信息淹没在噪音中",
  },
  {
    icon: Newspaper,
    title: "理解表面",
    description: "浅层报道多，缺乏深度分析和洞察，难以把握技术本质",
  },
  {
    icon: Eye,
    title: "视角单一",
    description: "单一媒体视角，难以获得全面客观的信息，容易被片面观点误导",
  },
  {
    icon: Trash2,
    title: "知识流失",
    description: "阅后即忘，珍贵的信息无法沉淀和复用，重复劳动浪费时间",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function PainPoints() {
  return (
    <section id="pain-points" className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 区域标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            还在被信息淹没？
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            科技从业者每天面临的四大痛点
          </p>
        </motion.div>

        {/* 痛点卡片网格 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl glass-card transition-all duration-300 hover:border-[#00D4FF]/30 hover:-translate-y-2"
            >
              {/* 悬停发光效果 */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00D4FF]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* 图标 */}
                <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#00D4FF]/20 transition-colors duration-300">
                  <point.icon className="w-6 h-6 text-[#00D4FF]" />
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {point.title}
                </h3>

                {/* 描述 */}
                <p className="text-white/60 leading-relaxed">
                  {point.description}
                </p>
              </div>

              {/* 序号 */}
              <div className="absolute top-6 right-6 text-white/10 text-6xl font-bold">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
