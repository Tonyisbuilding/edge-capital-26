import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import ReachOut from "@/component/Contact/ReachOut";
import ContactInformation from "@/component/Contact/ContactUs";

const ContactPage = () => {
  return (
    <>
        <NavBar />
      <div className="relative">
        <ReachOut />
        <ContactInformation />
        <Contact />
      </div>
        <Footer />
    </>
  );
};

export default ContactPage;
