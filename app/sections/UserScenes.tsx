"use client";

import { motion, Variants } from "framer-motion";
import { BriefcaseBusiness, Smartphone, Code2, Rocket } from "lucide-react";

const userScenes = [
  {
    icon: BriefcaseBusiness,
    emoji: "💼",
    role: "科技投资人",
    tag: "投资洞察",
    description: "晨间5分钟掌握24小时重大事件，投资决策快人一步",
  },
  {
    icon: Smartphone,
    emoji: "📱",
    role: "产品经理",
    tag: "竞品监控",
    description: "竞品监控与动态周报，洞察行业趋势",
  },
  {
    icon: Code2,
    emoji: "💻",
    role: "研发工程师",
    tag: "技术跟踪",
    description: "技术学习与深度解读，追踪前沿技术发展",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    role: "创业者",
    tag: "商业决策",
    description: "市场洞察与决策支持，把握商业机会",
  },
];

const cardsContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function UserScenes() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10 sm:mb-12 text-center"
        >
          <h2 className="text-[28px] leading-tight font-bold text-white">
            为谁而造？
          </h2>
        </motion.div>

        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {userScenes.map((scene) => (
            <motion.article key={scene.role} variants={cardItem} className="h-full">
              <div className="glass-card group h-full rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7C3AED]/35">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED]/25 to-[#EC4899]/20 border border-[#7C3AED]/35 flex items-center justify-center">
                    <scene.icon className="w-7 h-7 text-[#A78BFA]" />
                  </div>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#C4B5FD]">
                    {scene.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                  <span className="mr-2" role="img" aria-label={scene.role}>
                    {scene.emoji}
                  </span>
                  {scene.role}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-white/70">
                  {scene.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
