"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { name: "首页", href: "#hero" },
  { name: "痛点", href: "#pain-points" },
  { name: "价值", href: "#values" },
  { name: "功能", href: "#features" },
  { name: "场景", href: "#scenes" },
  { name: "开始", href: "#cta" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 设置背景状态
      setIsScrolled(currentScrollY > 50);
      
      // 滚动显示/隐藏逻辑
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 向下滚动且超过100px - 隐藏
        setIsVisible(false);
      } else {
        // 向上滚动 - 显示
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A1628]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                深澜 <span className="text-[#00D4FF]">DeepCurrent</span>
              </span>
            </motion.a>

            {/* 桌面导航链接 */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* CTA 按钮 */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scrollToSection("#cta")}
                className="px-5 py-2.5 bg-[#00D4FF] text-[#0A1628] rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                免费体验
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* 背景遮罩 */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* 菜单内容 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-16 left-4 right-4 bg-[#0F2744]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-3 text-left text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <div className="border-t border-white/10 my-2" />
                <button
                  onClick={() => scrollToSection("#cta")}
                  className="w-full px-4 py-3 bg-[#00D4FF] text-[#0A1628] rounded-xl font-semibold text-center transition-all hover:bg-[#00D4FF]/90"
                >
                  免费体验
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
