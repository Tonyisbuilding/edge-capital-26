import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeCareHero = () => {
  const { language } = useChangeLanguageContext();

  return (
    <section className="relative w-full h-screen overflow-hidden md:mt-[5rem]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <iframe
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[177.78vh] h-[100vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={images.csr.csrvid}
          title="Edge Care background"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>


      {/* Content Layer */}
      <div
        className="relative z-10 flex flex-col items-center 
      justify-center h-full px-4 md:px-8 lg:px-16 bg-[#0000009d]"
      >
        <div className="max-w-4xl text-center">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 mt-[50%] "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {language === "nl"
              ? "Toegewijd aan het gezamenlijk bouwen van een duurzame toekomst"
              : "Committed to building a sustainable future together"}
          </motion.h1>

          <motion.p
            className="text-sm md:text-base lg:text-lg text-white mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {language === "nl"
              ? `Bij Edge Capital wordt onze missie om blijvende waarde te creëren voor de samenleving, het milieu en onze stakeholders gedreven door Maatschappelijk Verantwoord Ondernemen.`
              : `At Edge Capital, Corporate Social Responsibility drives our mission
            to create lasting value for society, the environment, and our
            stakeholders.`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* <motion.button
              className="px-8 py-3 bg-teal-600 text-white rounded-4xl text-sm md:text-base font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#0E7490",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Partner with Edge Capital"
            >
              <a href="mailto:info@edge-capital.nl">{ language === 'nl' ? 'Werk met ons samen' : 'Partner With Us'}</a>
            </motion.button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EdgeCareHero;
