import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeConnectHero = () => {
  const { language } = useChangeLanguageContext();

  // Translations object
  const translations = {
    en: {
      heading: "Edge Connect is the first step in our Edge Impact initiative. As our company continues to grow, we believe in giving back.",
      subtitle: "Earn & Give Back",
      description: "We reward you for introducing new clients. Keep your reward or donate part (or all) to a charity selected by our team—making an impact where it matters most.",
      cta: "Speak to our team"
    },
    nl: {
      heading: "Edge Connect is de eerste stap in ons Edge Impact initiatief. Naarmate ons bedrijf blijft groeien, geloven wij in het teruggeven aan de maatschappij.",
      subtitle: "Verdien & Geef Terug",
      description: "We belonenU voor het introduceren van nieuwe klanten. BehoudU beloning of doneer een deel (of alles) aan een goed doel geselecteerd door ons team—voor impact waar het er het meest toe doet.",
      cta: "Spreek met ons team"
    }
  };

  // Get the appropriate language translations
  const t = translations[language] || translations.en;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      className="w-[98%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden mt-[5rem]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left content */}
        <motion.div
          className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0 py-12 md:py-16"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            variants={itemVariants}
          >
            {t.heading}
          </motion.h2>

          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-2 text-black">{t.subtitle}</h3>
            <p className="text-gray-700">
              {t.description}
            </p>
          </motion.div>

          <motion.button
            className="px-6 py-3 bg-[#206A7C] text-white rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label={language === 'nl' ? "Spreek met ons team over het Edge Connect programma" : "Speak to our team about the Edge Connect program"}
          >
            <Link to="/team" className="block">
              {t.cta}
            </Link>
          </motion.button>
        </motion.div>

        {/* Right content - Edge Connect logo and icons */}
        <motion.div
          className="w-full md:w-1/2 relative top-[-5rem]"
          variants={itemVariants}
        >
          <div className="relative h-64 md:h-76">
            <div className=" w-full flex justify-center items-center">
              <img src={images.edgeConnect.Edge_Connect} 
              alt={language === 'nl' ? "Edge Connect logo" : "Edge Connect logo"} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EdgeConnectHero;