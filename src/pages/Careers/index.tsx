import JoinTheTeam from "@/component/Careers/CareersHeroSection";
import OpenPositions from "@/component/Careers/OpenPosition";
import WhyWorkWithUs from "@/component/Careers/WhyWorkWithUs";
import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";

const Careers = () => {
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
        <JoinTheTeam />
        <WhyWorkWithUs />
        <OpenPositions />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Careers;
