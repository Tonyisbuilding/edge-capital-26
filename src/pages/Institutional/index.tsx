import { Header } from "@/component/Institutional/layout/Header";
import { Hero } from "@/component/Institutional/sections/Hero";
import { StressDefinition } from "@/component/Institutional/sections/StressDefinition";
import { EngineTimeline } from "@/component/Institutional/sections/EngineTimeline";
import { MonthlyPerformance } from "@/component/Institutional/sections/MonthlyPerformance";
import { BenchmarkComparison } from "@/component/Institutional/sections/BenchmarkComparison";
import { NAVPerformance } from "@/component/Institutional/sections/NAVPerformance";
import { StressTest2022 } from "@/component/Institutional/sections/StressTest2022";
import { Governance } from "@/component/Institutional/sections/Governance";
import { InvestmentFramework } from "@/component/Institutional/sections/InvestmentFramework";
import Footer from "@/component/Institutional/sections/Footer";
import Contact from "@/component/Institutional/sections/Contact";

// Institutional-scoped CSS
import "@/component/Institutional/styles/institutional-common.css";
import "@/component/Institutional/styles/institutional-component.css";

const Institutional = () => {
  return (
    <main className="min-h-screen bg-institutional-white flex flex-col">
      <Header />
      <Hero />
      <StressDefinition />
      <EngineTimeline />
      <MonthlyPerformance />
      <BenchmarkComparison />
      <NAVPerformance />
      <StressTest2022 />
      <Governance />
      <div style={{ display: "none" }}>
        <InvestmentFramework />
      </div>
      <Contact />
      <Footer />
    </main>
  );
};

export default Institutional;
