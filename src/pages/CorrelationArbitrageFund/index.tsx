import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import AboutCorrelationArbitrageFund from "@/component/CorrelationArbitrageFund/AboutCorrelationArbitrageFund";
import Target from "@/component/CorrelationArbitrageFund/Target";
import WhatSetsUsApart from "@/component/CorrelationArbitrageFund/WhatSetUsApart";
import StrategySection from "@/component/CorrelationArbitrageFund/Strategy";
import Feature from "@/component/CorrelationArbitrageFund/Features";
import FundCostStructure from "@/component/CorrelationArbitrageFund/FundCostStructure";
import InvestmentPerformance from "@/component/CorrelationArbitrageFund/InvestmentPerformance";
import FAQSection from '@/component/EC-Campaign/FAQSection';
import CorrelationArbitrageFundHero from "@/component/CorrelationArbitrageFund/CorrelationArbitrageFundHero";
import CorrelationArbitrageFundStats from "@/component/CorrelationArbitrageFund/CorrelationArbitrageFundStats";

const CorrelationArbitrageFund = () => {
  return (
    <div className="bg-[#FCFFFF]">
      <CorrelationArbitrageFundHero />
      <AboutCorrelationArbitrageFund />
      <CorrelationArbitrageFundStats />
      <div
        style={{
          maxWidth: "1550px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <StrategySection />
        <WhatSetsUsApart />
        <Feature />
        <FundCostStructure />
        <InvestmentPerformance />
      </div>
      <FAQSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default CorrelationArbitrageFund;
