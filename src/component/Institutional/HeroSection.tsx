import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const HeroSection = () => {
  const { language } = useChangeLanguageContext();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="h-[120vh] relative mt-[5rem] bg-[#EEF4F5C2]">
      <div className="relative min-h-screen font-sans">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${images.edgefund.edgehero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Main content */}
        <main className="relative z-10 container mx-auto px-4 flex flex-col min-h-screen">
          <div className=" mt-8 md:mt-16 gap-8 relative">
            {/* Hero Section - 40% width on medium+ screens */}
            <motion.div
              className="md:w-2/5 flex flex-col justify-center mt-6 md:mt-0 absolute
               bottom-[-99vh] right-[3rem] "
              initial="hidden"
              whileInView="visible"
              variants={staggerChildren}
            >
              {/* <div className="blur-xl absolute h-[30%] w-full bg-[#206A7C] top-[15rem]"></div> */}
              <motion.div
                className="bg-[#206A7C] text-white p-6 md:p-8 rounded-lg shadow-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
              >
                <motion.h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                >
                  {language === "nl"
                    ? "Wij zijn de toekomst van institutionele handel"
                    : "We are the future of institutional trading"}
                </motion.h1>

                <motion.p
                  className="text-sm md:text-base mb-6"
                  variants={fadeIn}
                >
                  {language === "nl"
                    ? `Wij combineren diepgaande handelskennis met geavanceerde analyses en technologie om essentiële liquiditeit te leveren en de wereldmarkten van morgen vorm te geven.`
                    : `We combine deep trading acumen with advanced analytics and
                  technology to deliver critical liquidity and shape the global
                  markets of tomorrow.`}
                </motion.p>

                <motion.button
                  className="bg-[#192227] hover:bg-[#1922279d] text-white font-medium 
                  py-2 px-6 rounded-4xl transition duration-300 relative z-10"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="block ">
                  { language === 'nl' ? 'Neem Contact op' : 'Contact us'}
                  </Link>
                </motion.button>
                {/* <div
                  className="blur-sm absolute h-[30%] w-full bg-[#206a7c3a] lg:top-[16rem] top-[87%] left-0
                 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 
                "
                ></div> */}
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
      <motion.div
        className="md:w-1/2 mx-[2rem]  absolute left-0 md:top-[85%] bottom-[10vh]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          {language === 'nl' ? 'Waar financiën, wiskunde en technologie samenkomen' : 'Where finance, mathematics & technology converge'}
        </h2>
      </motion.div>
    </div>
  );
};

export default HeroSection;
