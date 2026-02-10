"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
      >
        <span className="text-base sm:text-lg font-medium text-white pr-4 group-hover:text-[#00D4FF] transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-[#00D4FF]/20" : "bg-white/5"
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${
              isOpen ? "text-[#00D4FF]" : "text-white/50"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 },
            }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="pt-0 border-t border-white/10">
                <p className="pt-4 text-sm sm:text-base text-white/70 leading-relaxed">
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const faqs = [
  {
    question: "深澜与其他科技媒体有什么区别？",
    answer:
      "深澜不是传统的新闻媒体，而是AI原生的信息平台。我们不生产内容，而是通过AI技术聚合、分析、提炼全网科技信息。核心差异在于：智能摘要帮你5分钟掌握要点、深度搜索支持自然语言提问、AI助手实时解答疑问、知识库功能帮你沉淀信息资产。",
  },
  {
    question: "免费版和付费版有什么区别？",
    answer:
      "免费版包含每日10条AI日报、20次AI搜索、基础的监控和收藏功能，足以满足日常信息获取需求。付费版（Pro）提供无限量的AI日报和搜索、更深入的AI分析、更多监控对象、团队协作功能、API接入等高级特性，适合专业用户和团队。",
  },
  {
    question: "如何保证信息的准确性和客观性？",
    answer:
      "我们采用多源交叉验证机制：每条信息都会聚合多个权威来源，AI会标注信息来源和可信度。同时，我们的AI模型经过特别调优，会主动呈现不同观点和立场，避免单一视角。对于重要信息，我们会标注\"多方确认\"或\"单一来源\"等可信度标识。",
  },
  {
    question: "支持哪些信息源？",
    answer:
      "深澜目前覆盖500+优质科技信息源，包括：国内主流科技媒体（36氪、虎嗅、极客公园等）、国际顶级科技媒体（TechCrunch、The Verge、Ars Technica等）、学术预印本平台（arXiv）、开发者社区（GitHub、Hacker News）、公司官方博客和财报等。我们还在持续扩展信息源覆盖范围。",
  },
  {
    question: "如何保护我的隐私和数据安全？",
    answer:
      "数据安全是我们的首要原则：所有数据传输采用TLS加密、用户数据存储在符合SOC2标准的数据中心、我们承诺不会出售用户数据给第三方、AI处理过程中敏感信息会被脱敏处理。对于企业用户，我们还提供私有化部署选项，确保数据完全自主可控。",
  },
  {
    question: "是否支持团队使用？",
    answer:
      "是的，深澜提供完善的团队协作功能。团队版支持：共享知识库和收藏、团队成员间的信息共享、团队级的监控和提醒设置、权限管理和使用统计、与Slack/飞书/钉钉等企业工具集成。我们还提供企业定制服务，可根据团队需求进行功能定制和私有化部署。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* 区域标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7C3AED]/20 border border-[#00D4FF]/20 mb-6"
          >
            <MessageCircleQuestion className="w-8 h-8 text-[#00D4FF]" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            常见问题
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto">
            关于深澜，你可能想知道的一切
          </p>
        </motion.div>

        {/* FAQ 列表 */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
              index={index}
            />
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm sm:text-base text-white/50 mb-3">
            还有其他问题？
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00D4FF]/30 text-[#00D4FF] text-sm font-medium hover:bg-[#00D4FF]/10 transition-colors">
            联系我们
          </button>
        </motion.div>
      </div>
    </section>
  );
}
