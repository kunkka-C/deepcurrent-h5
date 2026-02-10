import ParticleBackground from "./components/ParticleBackground";
import Hero from "./sections/Hero";
import PainPoints from "./sections/PainPoints";
import ValueProps from "./sections/ValueProps";
import Features from "./sections/Features";
import UserScenes from "./sections/UserScenes";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 页面内容 */}
      <div className="relative z-10">
        <div id="hero" className="scroll-mt-24">
          <Hero />
        </div>

        <PainPoints />

        <div id="values" className="scroll-mt-24">
          <ValueProps />
        </div>

        <div id="features" className="scroll-mt-24">
          <Features />
        </div>

        <div id="scenes" className="scroll-mt-24">
          <UserScenes />
        </div>

        <div id="cta" className="scroll-mt-24">
          <CTA />
        </div>

        <Footer />
      </div>
    </main>
  );
}
