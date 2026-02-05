import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import AboutEdgeFund from "@/component/EdgeFund/AboutEdgeFund";
import Target from "@/component/EdgeFund/Target";
import WhatSetsUsApart from "@/component/EdgeFund/WhatSetUsApart";
import StrategySection from "@/component/EdgeFund/Strategy";
import Feature from "@/component/EdgeFund/Features";
import FundCostStructure from "@/component/EdgeFund/FundCostStructure";
import InvestmentPerformance from "@/component/EdgeFund/InvestmentPerformance";
import FAQSection from '@/component/EC-Campaign/FAQSection';
import EdgeFundHero from "@/component/EdgeFund/EdgeFundHero";
import EdgeFundStats from "@/component/EdgeFund/EdgeFundStats";

const EdgeFund = () => {
  return (
    <div className="bg-[#FCFFFF]">
      <EdgeFundHero />
      <AboutEdgeFund />
      <EdgeFundStats />
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

export default EdgeFund;
