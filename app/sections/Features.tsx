"use client";

import { motion } from "framer-motion";
import { Newspaper, Search, Eye, BookOpen, Bot, Check } from "lucide-react";

const features = [
  {
    icon: Newspaper,
    title: "AI日报",
    description: "智能聚合全网科技资讯，AI生成核心摘要，重要性智能排序，5分钟掌握每日精华",
    points: ["智能聚合数百个科技源", "AI生成3句话核心摘要", "重要性智能排序", "故事线关联展示"],
    color: "#00D4FF",
  },
  {
    icon: Search,
    title: "深度搜索",
    description: "科技领域的Perplexity式AI搜索，自然语言提问，多源整合答案，代码示例支持",
    points: ["自然语言提问", "多源信息整合", "研究模式自动拆解", "代码示例支持"],
    color: "#7C3AED",
  },
  {
    icon: Eye,
    title: "智能监控",
    description: "持续追踪公司、技术、话题，重要动态即时推送，竞品追踪与情绪分析",
    points: ["多维度监控对象", "重要程度智能分级", "跨平台信息追踪", "自动生成分析报告"],
    color: "#EC4899",
  },
  {
    icon: BookOpen,
    title: "知识库",
    description: "阅读+笔记+分享三合一，一键收藏，AI自动标注分类，构建个人科技知识库",
    points: ["一键收藏任意内容", "AI自动提取关键信息", "智能分类与关联", "全文搜索支持"],
    color: "#00D4FF",
  },
  {
    icon: Bot,
    title: "AI助手",
    description: "实时问答、术语解释、写作辅助，上下文感知，渐进式交互不打断阅读",
    points: ["选中即问实时解答", "技术术语自动解释", "多语言实时翻译", "写作辅助生成"],
    color: "#7C3AED",
  },
];

export default function Features() {
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
          <span className="inline-block px-4 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-xs sm:text-sm font-medium mb-4">
            核心功能
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            五大核心功能
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            全方位覆盖科技信息获取与管理的每个环节
          </p>
        </motion.div>

        {/* 功能列表 */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                
              }}
            >
              <div className="glass-card rounded-3xl p-8 lg:p-10 transition-all duration-300 hover:border-[#00D4FF]/20">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  {/* 图标区域 */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                        border: `1px solid ${feature.color}40`
                      }}
                    >
                      <feature.icon className="w-12 h-12" style={{ color: feature.color }} />
                    </motion.div>
                  </div>

                  {/* 内容区域 */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-lg mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* 功能点 */}
                    <div className="grid grid-cols-2 gap-3">
                      {feature.points.map((point) => (
                        <div key={point} className="flex items-center gap-2">
                          <div 
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${feature.color}20` }}
                          >
                            <Check className="w-3 h-3" style={{ color: feature.color }} />
                          </div>
                          <span className="text-white/80 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
