import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import ReachOut from "@/component/Contact/ReachOut";
import ContactInformation from "@/component/Contact/ContactUs";

const ContactPage = () => {
  return (
    <>
        <NavBar />
      <div
        className="relative"
        style={{
          maxWidth: "1550px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <ReachOut />
        <ContactInformation />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
