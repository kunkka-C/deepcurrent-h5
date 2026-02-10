"use client";

import { motion, type Variants } from "framer-motion";

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const titleItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-6">
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-end gap-x-2 gap-y-1 text-[36px] font-bold leading-tight"
        >
          <motion.span
            variants={titleItemVariants}
            className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent"
          >
            深澜
          </motion.span>
          <motion.span
            variants={titleItemVariants}
            className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent"
          >
            DeepCurrent
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-[20px] font-semibold text-[#00D4FF]"
        >
          AI 驱动的科技信息「外脑」
        </motion.h2>

        <p className="text-[16px] leading-7 text-white/60">
          专为科技从业者打造的 AI 原生信息平台，将碎片化的科技信息转化为可行动的专业洞察
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="flex w-full flex-col gap-3"
        >
          <button
            type="button"
            className="w-full rounded-xl bg-[#00D4FF] px-6 py-3 text-base font-semibold text-[#04131E] transition-opacity hover:opacity-90"
          >
            免费体验
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-[#00D4FF] bg-transparent px-6 py-3 text-base font-semibold text-[#00D4FF] transition-colors hover:bg-[#00D4FF]/10"
          >
            预约演示
          </button>
        </motion.div>

        <p className="text-sm text-white/70">已服务 10,000+ 科技从业者</p>
      </div>
    </section>
  );
}
