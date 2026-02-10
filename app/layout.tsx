import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "深澜 DeepCurrent - AI驱动的科技信息外脑",
  description: "专为科技从业者打造的 AI 原生信息平台，将碎片化的科技信息转化为可行动的专业洞察",
  keywords: ["AI", "科技媒体", "信息聚合", "DeepCurrent", "深澜", "科技资讯"],
  authors: [{ name: "DeepCurrent" }],
  openGraph: {
    title: "深澜 DeepCurrent - AI驱动的科技信息外脑",
    description: "专为科技从业者打造的 AI 原生信息平台",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
