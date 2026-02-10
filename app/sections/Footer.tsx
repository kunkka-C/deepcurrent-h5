"use client";

import { motion } from "framer-motion";
import { Zap, Twitter, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  product: {
    title: "产品",
    links: ["AI日报", "深度搜索", "智能监控", "知识库", "AI助手"],
  },
  resources: {
    title: "资源",
    links: ["帮助中心", "使用指南", "API文档", "更新日志"],
  },
  company: {
    title: "公司",
    links: ["关于我们", "联系我们", "加入我们", "媒体报道"],
  },
  legal: {
    title: "法律",
    links: ["服务条款", "隐私政策", "Cookie政策"],
  },
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "Github" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo 和简介 */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">深澜 DeepCurrent</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              AI驱动的科技信息「外脑」，专为科技从业者打造的原生信息平台
            </p>
            {/* 社交媒体 */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 transition-all duration-200 hover:bg-[#00D4FF]/20 hover:text-[#00D4FF]"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 链接列表 */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 text-sm transition-colors duration-200 hover:text-[#00D4FF]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* 底部版权 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 深澜 DeepCurrent. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              服务条款
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Cookie设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
