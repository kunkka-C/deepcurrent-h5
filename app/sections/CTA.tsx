"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 via-transparent to-[#7C3AED]/10" />
        
        {/* 光效脉冲 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00D4FF]/5 blur-3xl animate-pulse-glow" />
        
        {/* 网格装饰 */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            开启智能信息时代
          </motion.div>

          {/* 标题 */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            准备好升级你的
            <span className="gradient-text"> 信息获取方式</span>
            了吗？
          </h2>

          {/* 副标题 */}
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10">
            免费开始使用，体验AI驱动的信息获取方式
            <br className="hidden sm:block" />
            让科技洞察触手可及
          </p>

          {/* CTA 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <button className="group relative px-10 py-4 bg-[#00D4FF] text-[#0A1628] rounded-full font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] flex items-center gap-2">
              立即开始
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-10 py-4 bg-transparent border border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/10 hover:border-white/50">
              预约演示
            </button>
          </motion.div>

          {/* 辅助信息 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-white/40 text-sm"
          >
            免费版包含每日10条AI日报 + 20次搜索 · 无需信用卡
          </motion.p>

          {/* 信任标识 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>7×24小时服务</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>数据安全保障</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>随时可取消</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
