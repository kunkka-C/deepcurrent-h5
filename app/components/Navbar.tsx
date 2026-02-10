import Link from "next/link";

const navLinks = [
  { label: "首页", href: "/#hero" },
  { label: "功能", href: "/#features" },
  { label: "价值", href: "/#values" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A1628]/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#hero" className="text-lg font-semibold text-white">
          DeepCurrent
        </Link>

        <div className="flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
