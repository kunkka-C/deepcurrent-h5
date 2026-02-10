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
      {/* 导航栏 - 放在 main 之外 */}
      <Navbar />
      
      <main className="relative min-h-screen overflow-x-hidden">
        {/* 粒子背景 */}
        <ParticleBackground />
        
        {/* 页面内容 */}
        <div className="relative z-10">
          <section id="hero">
            <Hero />
          </section>
          
          <Stats />
          
          <PainPoints />
          
          <section id="values">
            <ValueProps />
          </section>
          
          <section id="features">
            <Features />
          </section>
          
          <section id="scenes">
            <UserScenes />
          </section>
          
          <section id="faq">
            <FAQ />
          </section>
          
          <section id="cta">
            <CTA />
          </section>
          
          <Footer />
        </div>
      </main>
    </>
  );
}
