import { Header } from "@/component/Institutional/layout/Header";
import { Hero } from "@/component/Institutional/sections/Hero";
import { HistoricalStatistics } from "@/component/Institutional/sections/HistoricalStatistics";
import { EngineTimeline } from "@/component/Institutional/sections/EngineTimeline";
import { NAVPerformance } from "@/component/Institutional/sections/NAVPerformance";
import { LiquidResilience } from "@/component/Institutional/sections/LiquidResilience";
import { StressTest2022 } from "@/component/Institutional/sections/StressTest2022";
import { Governance } from "@/component/Institutional/sections/Governance";
import { InvestmentFramework } from "@/component/Institutional/sections/InvestmentFramework";
import Footer from "@/component/Institutional/sections/Footer";
import Contact from "@/component/Institutional/sections/Contact";
import { Newsletter } from "@/component/Institutional/sections/Newsletter";

// Institutional-scoped CSS
import "@/component/Institutional/styles/institutional-common.css";
import "@/component/Institutional/styles/institutional-component.css";

const Institutional = () => {
  return (
    <main className="min-h-screen bg-institutional-white flex flex-col">
      <Header />
      <Hero />
      <HistoricalStatistics />
      <NAVPerformance />
      <LiquidResilience />
      <StressTest2022 />
      <EngineTimeline />

      <Governance />
      <div style={{ display: "none" }}>
        <InvestmentFramework />
      </div>
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
};

export default Institutional;
