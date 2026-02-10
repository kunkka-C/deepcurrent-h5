"use client";

import { motion } from "framer-motion";
import { Clock, Search, Scale, Database, Rocket } from "lucide-react";

const values = [
  {
    icon: Clock,
    number: "01",
    title: "省时",
    subtitle: "AI聚合全网信息",
    description: "5分钟掌握精华，传统方式需1小时",
    highlight: "节省 90% 时间",
  },
  {
    icon: Search,
    number: "02",
    title: "深入",
    subtitle: "不只是表面报道",
    description: "AI解析技术原理、商业逻辑、市场影响",
    highlight: "深度洞察",
  },
  {
    icon: Scale,
    number: "03",
    title: "客观",
    subtitle: "打破单一视角",
    description: "多角度聚合，呈现不同立场和分析",
    highlight: "全面客观",
  },
  {
    icon: Database,
    number: "04",
    title: "沉淀",
    subtitle: "构建知识资产",
    description: "一键收藏，构建个人科技知识库",
    highlight: "永久保存",
  },
  {
    icon: Rocket,
    number: "05",
    title: "行动",
    subtitle: "信息转化为洞察",
    description: "支持决策和行动，创造实际价值",
    highlight: "落地执行",
  },
];

export default function ValueProps() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#A78BFA] text-xs sm:text-sm font-medium mb-4">
            核心价值
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            五大核心价值
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            让科技信息真正为你所用
          </p>
        </motion.div>

        {/* 价值卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                
              }}
              className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <div className="group relative h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* 背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F2744]/80 to-[#0F2744]/40 rounded-3xl border border-white/10 group-hover:border-[#00D4FF]/30 transition-colors" />
                
                {/* 发光效果 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF]/0 via-[#00D4FF]/0 to-[#7C3AED]/0 group-hover:from-[#00D4FF]/20 group-hover:via-[#7C3AED]/20 group-hover:to-[#00D4FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* 头部 */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-white/10 group-hover:text-[#00D4FF]/20 transition-colors">
                      {value.number}
                    </span>
                  </div>

                  {/* 内容 */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[#00D4FF] font-medium mb-3">
                    {value.subtitle}
                  </p>
                  <p className="text-white/60 mb-4 leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* 高亮标签 */}
                  <span className="inline-block px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium">
                    {value.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
