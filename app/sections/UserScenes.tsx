"use client";

import { motion } from "framer-motion";
import { Briefcase, Smartphone, Code, Rocket } from "lucide-react";

const users = [
  {
    icon: Briefcase,
    role: "科技投资人",
    tag: "VC / PE",
    scenario: "晨间5分钟掌握24小时重大事件",
    description: "每日AI摘要快速浏览，深度研究报告辅助投资决策，竞品动态监控把握市场脉搏",
    color: "#00D4FF",
  },
  {
    icon: Smartphone,
    role: "产品经理",
    tag: "PM",
    scenario: "竞品监控与动态周报",
    description: "追踪竞品产品更新、用户反馈、市场反应，AI自动生成竞品动态周报",
    color: "#7C3AED",
  },
  {
    icon: Code,
    role: "研发工程师",
    tag: "Engineer",
    scenario: "技术学习与深度解读",
    description: "搜索技术话题获取AI整合的技术解读+代码示例，追踪前沿技术发展",
    color: "#EC4899",
  },
  {
    icon: Rocket,
    role: "创业者",
    tag: "Founder",
    scenario: "市场洞察与决策支持",
    description: "深度研究模式自动生成公司/赛道分析报告，把握融资动态和市场机会",
    color: "#00D4FF",
  },
];

export default function UserScenes() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/30 text-[#EC4899] text-xs sm:text-sm font-medium mb-4">
            目标用户
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            为谁而造？
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            服务四大核心科技从业者群体
          </p>
        </motion.div>

        {/* 用户场景卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                
              }}
            >
              <div className="group h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
                {/* 背景 */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F2744]/60 to-[#0F2744]/30 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors" />
                
                <div className="relative z-10">
                  {/* 图标 */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${user.color}30, ${user.color}10)`,
                      border: `1px solid ${user.color}40`
                    }}
                  >
                    <user.icon className="w-7 h-7" style={{ color: user.color }} />
                  </div>

                  {/* 角色标签 */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-white">{user.role}</h3>
                    <span 
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ 
                        background: `${user.color}20`,
                        color: user.color
                      }}
                    >
                      {user.tag}
                    </span>
                  </div>

                  {/* 场景 */}
                  <p className="text-white font-medium mb-3" style={{ color: user.color }}>
                    {user.scenario}
                  </p>

                  {/* 描述 */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {user.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
