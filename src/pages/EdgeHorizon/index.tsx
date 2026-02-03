import NavBar from "@/common/NavBar";
import Footer from "@/common/Footer";
import Contact from "@/component/landingPage/Contact";
import EdgeHorizonSection from "@/component/EdgeHorizon/EdgeHorizonSection";

const EdgeHorizon = () => {
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
        <EdgeHorizonSection />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default EdgeHorizon;
