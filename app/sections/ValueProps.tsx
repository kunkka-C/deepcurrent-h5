"use client";

import { motion, Variants } from "framer-motion";

type ValueProp = {
  number: string;
  icon: string;
  title: string;
  description: string;
};

const valueProps: ValueProp[] = [
  {
    number: "01",
    icon: "⏱️",
    title: "省时",
    description: "AI聚合全网信息，5分钟掌握精华（传统方式需1小时）",
  },
  {
    number: "02",
    icon: "🔍",
    title: "深入",
    description: "解析技术原理、商业逻辑、市场影响",
  },
  {
    number: "03",
    icon: "⚖️",
    title: "客观",
    description: "多角度聚合，呈现不同立场分析",
  },
  {
    number: "04",
    icon: "💾",
    title: "沉淀",
    description: "一键收藏，构建个人科技知识库",
  },
  {
    number: "05",
    icon: "🚀",
    title: "行动",
    description: "信息转化为洞察，支持决策和行动",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ValueProps() {
  return (
    <section className="relative px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[560px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 text-center text-[28px] font-bold leading-tight text-white"
        >
          五大核心价值
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4"
        >
          {valueProps.map((item) => (
            <motion.div
              key={item.number}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 18px 40px rgba(0, 212, 255, 0.24)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="rounded-[20px] bg-gradient-to-r from-[#00D4FF]/60 via-[#00D4FF]/15 to-[#7C3AED]/60 p-[1px]"
            >
              <div className="rounded-[19px] bg-[linear-gradient(180deg,rgba(15,39,68,0.8)_0%,rgba(15,39,68,0.4)_100%)] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex min-w-11 items-center justify-center rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/15 px-3 py-1 text-sm font-semibold tracking-[0.08em] text-[#00D4FF]">
                    {item.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00D4FF]/35 to-[#7C3AED]/45 text-2xl shadow-[0_8px_24px_rgba(0,212,255,0.25)]">
                    <span aria-hidden>{item.icon}</span>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
