const footerLinks = [
  { label: "首页", href: "#hero" },
  { label: "功能", href: "#features" },
  { label: "定价", href: "#cta" },
  { label: "关于", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-md sm:max-w-3xl">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="text-lg font-semibold text-white">
            深澜 <span className="text-[#00D4FF]">DeepCurrent</span>
          </p>

          <nav className="mt-5" aria-label="页脚导航">
            <ul className="flex flex-col items-center gap-3 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:items-start sm:gap-6">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-[#00D4FF]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 text-center text-sm text-white/45 sm:text-left">
          © 2025 深澜 DeepCurrent
        </p>
      </div>
    </footer>
  );
}
