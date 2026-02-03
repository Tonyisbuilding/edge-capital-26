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
      <div
        className="bg-white"
        style={{
          maxWidth: "1550px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <HeroSection />
        <ResearchDevelopmentSection />
        <PrinciplesSection />
        <TradingApproachSection />
        <InstitutionalInvestmentSolutions />
        <ClientsSection />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Institutional;
