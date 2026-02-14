import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const ReachOut = () => {
  const { language } = useChangeLanguageContext();

  return (
    <section
      className="bg-[#F0FAFC] text-[#002028] py-16 md:py-24 relative overflow-hidden mt-[5rem] "
      aria-labelledby="contact-heading"
    >
      {/* Background dots pattern */}
      <div className="absolute left-[2rem] top-[19rem] opacity-100">
        <div className="flex-shrink-0  flex items-center justify-center">
          <img
            src={images.form.flare}
            alt="Research team analyzing market data"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-[98%] max-w-[1700px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-[20%] lg:pl-20">
          {/* Text content */}
          <motion.div
            className="mb-10 md:mb-0 md:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              id="contact-heading"
              className="text-[19.47px] md:text-4xl font-bold mb-4 leading-tight text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {language === "nl"
                ? "Voel u vrij om contact met ons op te nemen!"
                : "Feel free to contact us!"}
            </motion.h2>

            <motion.p
              className="text-[8.76px] md:text-lg opacity-90 leading-relaxed mx-[1.5rem] md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {language === "nl"
                ? `Wilt u samenwerken of heeft u vragen over onze diensten? We komen graag met u in contact om te ontdekken hoe Edge Capital u kan helpen
uw financiële doelen te bereiken.`
                : `Looking to collaborate or have questions about our services? We'd
              love to connect and explore how Edge Capital can help you achieve
              your financial goals.`}
            </motion.p>
          </motion.div>

          {/* Email icon/graphic */}
          <motion.div
            className="w-[18rem] md:w-64 lg:w-72 flex-shrink-0 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="flex-shrink-0  flex items-center justify-center">
              <img
                src={images.form.inbox}
                alt="Research team analyzing market data"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReachOut;
