import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const JoinTheTeam = () => {
  const { language } = useChangeLanguageContext();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-8 overflow-hidden bg-[##EEF4F5] mt-[5rem]">
      <div className="w-[98%] max-w-[1700px] mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-[20%] lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left content */}
          <motion.div
            className="w-full lg:w-1/2 max-w-lg"
            variants={itemVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              {language === `nl`
                ? `Sluit U aan bij het team`
                : `Join the team`}
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-gray-700 mb-8"
              variants={itemVariants}
            >
              {language === "nl"
                ? `Wij integreren geavanceerde financiële modellering, kwantitatief onderzoek en state-of-the-art technologie om marktefficiëntie te optimaliseren en liquiditeit te stimuleren. Ons team van experts werkt samen om innovatieve handelsstrategieën te ontwikkelen die het financiële landschap van morgen vormgeven.`
                : `We integrate advanced financial modeling, quantitative research,
              and state-of-the-art technology to optimize market efficiency and
              drive liquidity. Our team of experts collaborates to develop
              innovative trading strategies that shape the financial landscape
              of tomorrow.`}
            </motion.p>
            <motion.a
              href="#open"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#206A7C] text-white rounded-full 
              shadow-[0_4px_10px_rgba(32,106,124,0.3)] hover:shadow-[0_8px_20px_rgba(32,106,124,0.45)] 
              hover:bg-[#206A7C] transition-all duration-300"

              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              { language === 'nl' ? 'Openstaande posities' : 'Open positions'} ↓
            </motion.a>
          </motion.div>

          {/* Right content with profile image and decorative circles */}
          <motion.div
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
            variants={circleVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src={images.form.career}
                alt="Research team analyzing market data"
                className="w-[50%] md:w-full h-full object-cover mt-[2rem] md:mt-0"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinTheTeam;
