import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { translations } from "@/constant/translation";


const StrategySection = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const { language } = useChangeLanguageContext();
  const t = translations[language];

  const strategies = [
    {
      id: "Volatility risk premium",
      title: t.volatilityRiskPremiumTitle,
      description: t.volatilityRiskPremiumDescription,
      popupTitle: t.volatilityRiskPremiumPopupTitle,
      popupContent: t.volatilityRiskPremiumPopupContent,
    },
    {
      id: "interest-rate-arbitrage",
      title: t.interestRateArbitrageTitle,
      description: t.interestRateArbitrageDescription,
      popupTitle: t.marketNeutralSwapArbitragePopupTitle,
      popupContent: t.marketNeutralSwapArbitragePopupContent,
    },
  ];

  const openPopup = (id: string) => {
    setActivePopup(id);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setActivePopup(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="bg-[#EEF4F5C2] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative inline-block mb-8">
          <h2 className="text-5xl font-bold text-gray-900 z-10 relative">{t.ourStrategy}</h2>
          <img
            src={images.landingPage.Brush}
            alt="Brush underline"
            className="absolute bottom-[-10px] left-0 h-[6px] z-0"
          />
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-2">
          {strategies.map((strategy, index) => (
            <div
              key={strategy.id}
              className={`bg-[#EEF4F5C2] ${index === 0 ? "rounded-l-lg" : "rounded-r-lg"
                } 
             p-8 border-1 border-[#206A7C] flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {strategy.title}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-12"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center relative top-[-1rem]">
                      <img
                        src={images.edgefund.scaleUp}
                        alt={language === 'nl' ? "Onderzoeksteam dat marktgegevens analyseert" : "Research team analyzing market data"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                <p className="text-gray-600 mb-6">{strategy.description}</p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => openPopup(strategy.id)}
                  className="text-[#0E7490] hover:text-[#0e7490b7] font-medium 
                  hover:cursor-pointer underline"
                >
                  {t.learnMore}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex flex-col">
          {strategies.map((strategy, index) => (
            <div
              key={strategy.id}
              className={`bg-[#EEF4F5C2] p-6 border border-[#206A7C]
             ${index === 0 ? "rounded-t-lg" : "rounded-b-lg"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {strategy.title}
                </h3>
                <motion.div whileHover={{ scale: 1.05 }} className="w-12 h-10">
                  <div className="flex-shrink-0 flex items-center justify-center relative top-[-1rem]">
                    <img
                      src={images.edgefund.scaleUp}
                      alt={language === 'nl' ? "Onderzoeksteam dat marktgegevens analyseert" : "Research team analyzing market data"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{strategy.description}</p>
              <div className="text-right">
                <button
                  onClick={() => openPopup(strategy.id)}
                  className="text-[#0E7490] hover:text-[#0e7490b7] font-medium text-sm underline"
                >
                  {t.learnMore}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup */}
        <AnimatePresence>
          {activePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#00000098] bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closePopup}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {strategies
                  .filter((s) => s.id === activePopup)
                  .map((strategy) => (
                    <div key={strategy.id} className="p-6 sm:p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {strategy.popupTitle}
                        </h3>
                        <button
                          onClick={closePopup}
                          className="text-gray-400 hover:text-gray-600 p-2"
                          aria-label={language === 'nl' ? "Popup sluiten" : "Close popup"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="prose max-w-none">
                        {strategy.popupContent
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-600">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                      <div className="mt-8 text-right">
                        <button
                          onClick={closePopup}
                          className="bg-[#0E7490] hover:bg-[#0e7490b7] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                          {t.close}
                        </button>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StrategySection;