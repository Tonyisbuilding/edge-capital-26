import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import "../landingPage/component.css";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";


// Translations object
const translations = {
  en: {
    title: "About EdgeFund",
    description: "EdgeFund uses an automated, volatility-driven strategy focused on selling options while minimizing risk through delta hedging. Futures are used for hedging, with the S&P 500 as the primary market due to its liquidity. Additionally, the fund employs interest rate and FX arbitrage to enhance returns.",
    minimumInvestment: "Minimum investment: €100,000.",
    participateButton: "Participate"
  },
  nl: {
    title: "Over EdgeFund",
    description: "EdgeFund maakt gebruik van een geautomatiseerde, op volatiliteit gebaseerde strategie die zich richt op het verkopen van opties, terwijl het risico wordt geminimaliseerd via delta-hedging. Futures worden ingezet voor hedging, met de S&P 500 als primaire markt vanwege de hoge liquiditeit. Daarnaast maakt het fonds gebruik van rente- en valutaarbitrage om het rendement te verhogen.",
    minimumInvestment: "Minimale investering: €100.000.",
    participateButton: "Deelnemen"
  }
};

const AboutEdgeFund = () => {
  const { language } = useChangeLanguageContext();
  const content = translations[language] || translations.en;

  return (
    <section className="w-full max-w-7xl mx-auto px-0 py-16 md:py-16 md:mt-[7rem] mt-[4rem]">
      <motion.div
        className="flex flex-col md:flex-row gap-8 md:gap-3 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#EEF4F5] rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative inline-block mb-2">
              <h2 className="font-bold text-gray-900 text-[30.86px] md:text-[35px] relative z-10">
                {content.title}
              </h2>
              <img
                src={images.landingPage.Brush}
                alt="Brush underline"
                className="absolute bottom-[-1px] left-0 h-[6px] z-0"
              />
            </div>


            {/* <div className="w-24 h-[1.2px] bg-yellow-400 mb-6"></div> */}

            <p className="text-gray-800 mb-8 inter font-medium md:text-[20px] text-[14.91px]">
              {content.description}
            </p>

            <p className="font-bold text-gray-900 mb-8 inter md:text-[18px] text-[10.72px]">
              {content.minimumInvestment}
            </p>
            <Link to="/participate">
              <motion.button
                className="bg-[#206A7C] text-white px-8 py-3 rounded-full 
                shadow-[0_4px_10px_rgba(32,106,124,0.3)] hover:shadow-[0_8px_20px_rgba(32,106,124,0.45)] 
                hover:bg-[#206A7C] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {content.participateButton}
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Image Side */}
        <motion.div
          className="w-full md:w-1/2 h-64 md:h-auto relative bottom-[1.5rem] md:bottom-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="w-full h-full relative">
            <img
              src={images.edgefund.edgehero}
              alt="Edge Capital team meeting"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutEdgeFund;