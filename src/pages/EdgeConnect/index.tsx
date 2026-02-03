import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import EdgeConnectHero from "@/component/EdgeConnect/EdgeConnectHero";
import HowDoesItWork from "@/component/EdgeConnect/HowDoesItWork";
import GetStartedSection from "@/component/EdgeConnect/GetStarted";
import OurCharities from "@/component/EdgeConnect/OurCharities";

const EdgeConnect = () => {
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
        <EdgeConnectHero />
        <HowDoesItWork />
        <GetStartedSection />
        <OurCharities />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default EdgeConnect;
