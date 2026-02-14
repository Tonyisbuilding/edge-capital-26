import React from "react";
import { motion } from "framer-motion";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeDocuments = () => {
  const { language } = useChangeLanguageContext();

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for the circles
  const circlesVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <section
      className="w-full bg-[#F8F9FA] py-20 px-4 md:px-6 lg:px-8 overflow-hidden mt-[5rem]"
      aria-labelledby="edge-documents-heading"
    >
      <div className="w-[98%] max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[20%]">
          {/* Text content */}
          <div className="lg:max-w-xl z-10">
            <motion.h2
              id="edge-documents-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#206A7C] mb-6"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {language === "nl" ? "Documenten" : "Edge documents"}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-lg"
              initial="hidden"
              animate="visible"
              variants={{
                ...textVariants,
                visible: {
                  ...textVariants.visible,
                  transition: {
                    ...textVariants.visible.transition,
                    delay: 0.1,
                  },
                },
              }}
            >
              {language === "nl"
                ? `Alle benodigde documenten van Edge Capital.`
                : `Everything you need for your investment journey, all in one place. Download, sign, and submit with ease.`}
            </motion.p>
          </div>

          {/* Circles graphic */}
          <motion.div
            className="relative mt-12 lg:mt-0 lg:ml-10"
            initial="hidden"
            animate="visible"
            variants={circlesVariants}
            aria-hidden="true"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 bg-blue-100 rounded-full"></div>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-full absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EdgeDocuments;
