import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import PainPoints from "./sections/PainPoints";
import ValueProps from "./sections/ValueProps";
import Features from "./sections/Features";
import UserScenes from "./sections/UserScenes";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 5rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 5rem)",
        }}
      >
        {/* 粒子背景 */}
        <ParticleBackground />
        
        {/* 页面内容 */}
        <div className="relative z-10">
          <section id="hero" className="scroll-mt-24">
            <Hero />
          </section>
          
          <Stats />
          
          <PainPoints />
          
          <section id="values" className="scroll-mt-24">
            <ValueProps />
          </section>
          
          <section id="features" className="scroll-mt-24">
            <Features />
          </section>
          
          <section id="scenes" className="scroll-mt-24">
            <UserScenes />
          </section>
          
          <section id="faq" className="scroll-mt-24">
            <FAQ />
          </section>
          
          <section id="cta" className="scroll-mt-24">
            <CTA />
          </section>
          
          <Footer />
        </div>
      </main>
    </>
  );
}
