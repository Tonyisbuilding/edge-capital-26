import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import HeroSection from "@/component/Institutional/HeroSection";
import ResearchDevelopmentSection from "@/component/Institutional/ResearchDevelopmentSection";
import PrinciplesSection from "@/component/Institutional/Principles";
import TradingApproachSection from "@/component/Institutional/TradingApproach";
import InstitutionalInvestmentSolutions from "@/component/Institutional/InstitutionalInvestmentSolutions";
import ClientsSection from "@/component/Institutional/ClientSection";


const Institutional = () => {
  return (
    <>
      <NavBar />
      <div className="bg-white">
        <HeroSection />
        <ResearchDevelopmentSection />
        <PrinciplesSection />
        <TradingApproachSection />
        <InstitutionalInvestmentSolutions />
        <ClientsSection />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Institutional;
