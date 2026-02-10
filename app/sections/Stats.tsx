"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { Users, Database, Globe, Clock } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span className="flex items-baseline">
      <span ref={ref} className="tabular-nums">0</span>
      <span>{suffix}</span>
    </span>
  );
}

function StatCard({ icon: Icon, value, suffix, label, delay = 0 }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative"
    >
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center transition-all duration-300 hover:border-[#00D4FF]/30 hover:-translate-y-2">
        {/* 悬停发光效果 */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00D4FF]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* 图标 */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7C3AED]/20 flex items-center justify-center border border-[#00D4FF]/20 group-hover:border-[#00D4FF]/40 transition-colors"
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#00D4FF]" />
          </motion.div>

          {/* 数字 */}
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            <AnimatedNumber value={value} suffix={suffix} />
          </div>

          {/* 标签 */}
          <p className="text-sm sm:text-base text-white/60">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "科技从业者",
  },
  {
    icon: Database,
    value: 50,
    suffix: "万+",
    label: "日处理信息量",
  },
  {
    icon: Globe,
    value: 500,
    suffix: "+",
    label: "覆盖科技源",
  },
  {
    icon: Clock,
    value: 90,
    suffix: "%",
    label: "节省时间",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00D4FF]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 区域标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium mb-4">
            数据说话
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            值得信赖的选择
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            深澜已帮助数千名科技从业者提升信息获取效率
          </p>
        </motion.div>

        {/* 数据卡片网格 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
