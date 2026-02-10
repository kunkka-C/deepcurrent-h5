"use client";

import { motion, type Variants } from "framer-motion";

type Feature = {
  emoji: string;
  title: string;
  description: string;
  points: string[];
  borderGradient: string;
  iconGradient: string;
};

const features: Feature[] = [
  {
    emoji: "📰",
    title: "AI日报",
    description: "智能聚合全网科技资讯，AI生成核心摘要，重要性智能排序。",
    points: ["全网科技资讯聚合", "AI提炼核心摘要", "按重要性智能排序"],
    borderGradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(124, 58, 237, 0.8))",
    iconGradient: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
  },
  {
    emoji: "🔎",
    title: "深度搜索",
    description: "科技领域的Perplexity式AI搜索，理解技术问题给出专业答案。",
    points: ["理解复杂技术问题", "多源信息交叉验证", "输出专业结构化答案"],
    borderGradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.9), rgba(236, 72, 153, 0.85))",
    iconGradient: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
  },
  {
    emoji: "👁️",
    title: "智能监控",
    description: "持续追踪公司/技术/话题动态，实时推送关键更新。",
    points: ["多维对象持续追踪", "关键变动实时提醒", "动态趋势持续记录"],
    borderGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(0, 212, 255, 0.8))",
    iconGradient: "linear-gradient(135deg, #EC4899 0%, #00D4FF 100%)",
  },
  {
    emoji: "📚",
    title: "知识库",
    description: "阅读+笔记+分享三合一，构建个人科技知识体系。",
    points: ["阅读与笔记无缝衔接", "沉淀可复用知识资产", "支持团队协作分享"],
    borderGradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(16, 185, 129, 0.8))",
    iconGradient: "linear-gradient(135deg, #00D4FF 0%, #10B981 100%)",
  },
  {
    emoji: "🤖",
    title: "AI助手",
    description: "实时问答+术语解释+写作辅助，随叫随到的AI外脑。",
    points: ["上下文实时问答", "技术术语即刻解释", "写作表达辅助优化"],
    borderGradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.9), rgba(0, 212, 255, 0.8))",
    iconGradient: "linear-gradient(135deg, #7C3AED 0%, #00D4FF 100%)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Features() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="text-[28px] font-bold leading-tight text-white">
            五大核心功能
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-5 sm:gap-6"
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="rounded-[28px] p-[1.5px]"
              style={{ background: feature.borderGradient }}
            >
              <div className="rounded-[26px] bg-[#0F2744]/80 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:p-7">
                <div className="mb-5 flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                    style={{ background: feature.iconGradient }}
                    aria-hidden="true"
                  >
                    <span className="text-[22px] leading-none">{feature.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/85 marker:text-[#00D4FF]">
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
