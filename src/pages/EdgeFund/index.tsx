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

const EdgeFund = () => {
  return (
    <>
      <NavBar />
      <div
        style={{
          maxWidth: "1550px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <AboutEdgeFund />
        <Target />
        <StrategySection />

        <WhatSetsUsApart />
        <Feature />
        <FundCostStructure />
        <InvestmentPerformance />
      </div>
      <FAQSection />
      <Contact />
      <Footer />
    </>
  );
};

export default EdgeFund;
