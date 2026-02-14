import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <>
      <div className="bg-[#F6FEFF] w-full py-12">
        <div className="w-[98%] max-w-[1700px] mx-auto grid lg:grid-cols-[55%_45%] gap-8 px-[10px] md:px-4 auto-rows-fr">
          {/* Left Side - Contact Info */}
          <div className="min-h-full">
            <ContactInfo />
          </div>
          {/* Right Side - Contact Form */}
          <div className="min-h-full flex">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
