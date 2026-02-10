"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

// 打字机效果 Hook
function useTypewriter(text: string, speed: number = 100, delay: number = 1500) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayText("");
    setIsComplete(false);
    
    const startTyping = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, speed, delay]);

  // 光标闪烁效果
  useEffect(() => {
    if (isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [isComplete]);

  return { displayText, isComplete, showCursor };
}

export default function Hero() {
  const { displayText, showCursor } = useTypewriter(
    "AI 驱动的科技信息「外脑」",
    80,
    1200
  );

  const scrollToNext = useCallback(() => {
    const painPointsSection = document.getElementById("pain-points");
    if (painPointsSection) {
      painPointsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 背景渐变叠加 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1628]/80 pointer-events-none" />
      
      {/* 装饰光效 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* 内容 */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/品牌标识 */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI 原生信息平台
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="gradient-text">深澜 DeepCurrent</span>
        </motion.h1>

        {/* 副标题 - 打字机效果 */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00D4FF] mb-6 h-10 sm:h-12"
        >
          <span>{displayText}</span>
          <motion.span
            className="inline-block w-0.5 h-6 sm:h-8 bg-[#00D4FF] ml-1 align-middle"
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* 描述 */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          专为科技从业者打造的 AI 原生信息平台
          <br className="hidden sm:block" />
          将碎片化的科技信息转化为可行动的专业洞察
        </motion.p>

        {/* CTA 按钮组 */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button className="group relative px-8 py-4 bg-[#00D4FF] text-[#0A1628] rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] flex items-center gap-2">
            免费体验
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="px-8 py-4 bg-transparent border border-[#00D4FF]/50 text-[#00D4FF] rounded-full font-semibold text-base transition-all duration-200 hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]">
            预约演示
          </button>
        </motion.div>

        {/* 信任背书 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 text-white/50 text-sm"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] border-2 border-[#0A1628]"
                style={{ opacity: 0.6 + i * 0.1 }}
              />
            ))}
          </div>
          <span>已服务 <strong className="text-white/80">10,000+</strong> 科技从业者</span>
        </motion.div>
      </motion.div>

      {/* 滚动指示器 */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-[#00D4FF] transition-colors cursor-pointer group"
      >
        <span className="text-xs tracking-wider">向下滚动</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00D4FF]/50 transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent pointer-events-none" />
    </section>
  );
}
