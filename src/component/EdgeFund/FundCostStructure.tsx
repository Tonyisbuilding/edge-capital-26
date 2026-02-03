import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const FundCostStructure = () => {
  const [activePopup, setActivePopup] = useState<boolean | null>(null);
  const { language } = useChangeLanguageContext();

  const openPopup = () => {
    setActivePopup(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setActivePopup(null);
    document.body.style.overflow = "auto";
  };

  // Translations
  const translations = {
    en: {
      fundCostStructure: "Participation requirements",
      minimumInvestment: "Minimum participation",
      requestInformation: "Request information",
      bookConsultation: "Book a consultation",
      learnMore: "Learn more",
      close: "Close",
      highWatermarkTitle: "High watermark principle explained",
      highWatermarkDescription: "Our commission structure protects your investments with the High Watermark principle",
      highWatermarkPopupTitle: "High watermark principle",
      highWatermarkPopupContent: "The manager calculates profit sharing based on the \"high water mark principle.\" High watermark: A high watermark refers to the highest value achieved by an investment fund or asset manager. This term is often used in performance-based compensation of a fund or asset manager. In a fee structure with a high watermark application, commission fees of a fund manager or asset manager are only calculated based on net results. The fee is only calculated after past losses have been recovered. This prevents the fund manager or asset manager from receiving fees from volatile performance. Profit sharing is calculated retrospectively on a monthly basis, and the high watermark level is also determined monthly."
    },
    nl: {
      fundCostStructure: "Kostenstructuur van het Fonds",
      minimumInvestment: "Minimale deelname",
      requestInformation: "Schrijf u nu in!",
      bookConsultation: "Schrijf u nu in!",
      learnMore: "Meer informatie",
      close: "Sluiten",
      highWatermarkTitle: "Toelichting high watermark-principe",
      highWatermarkDescription: "Het High watermark principe beschermt u tegen onverwachte kosten",
      highWatermarkPopupTitle: "High watermark principe",
      highWatermarkPopupContent: "Een high watermark refereert naar de hoogste waarde die een beleggingsfonds of vermogensbeheerder heeft behaald. Deze term wordt vaak gebruikt bij prestatieafhankelijke compensatie van een fonds- of vermogensbeheerder.\nBij een kostenstructuur met een high watermark toepassing worden provisiekosten van een fondsmanager of vermogensbeheerder alleen berekend over de nettoresultaten. De vergoeding wordt pas berekend nadat de verliezen uit het verleden zijn teruggewonnen. Zo wordt voorkomen dat de fondsmanager of vermogensbeheerder vergoedingen ontvangt uit een volatiele prestatie.\nDe winstdeling wordt op maandbasis achteraf berekend en het high watermark-niveau wordt ook per maand bepaald.",
    }
  };

  // Fund class data with translations
  const fundClassesData = {
    en: [
      {
        id: "class-i",
        title: "Participation class I",
        stars: 1,
        description: "Perfect for individual investors and small Family offices.",
        investment: "€100K-€250K",
        buttonText: "Sign up now!",
        buttonClass: "bg-gray-900 hover:bg-gray-800",
        features: [
          "1.5% Management fee (per year)",
          "22.5% Profit share (per month) High",
          "High watermark protection",
          "Monthly performance reports",
        ],
      },
      {
        id: "class-ii",
        title: "Participation class II",
        stars: 2,
        description:
          "Ideal for established investors and medium-sized institutions.",
        investment: "€250K-€500K",
        buttonText: "Sign up now!",
        buttonClass:
          "bg-gradient-to-r from-[#5A7B8D] to-[#192227] hover:bg-slate-700",
        features: [
          "1.25% Management fee (per year)",
          "17.5% Profit sharing (per month)",
          "High watermark protection",
          "Monthly performance reports",
        ],
      },
      {
        id: "class-iii",
        title: "Participation class III",
        stars: 3,
        description:
          "Built for institutional investors and large Family offices.",
        investment: "€ 500K - en hoger",
        buttonText: "Sign up now!",
        buttonClass: "bg-gray-900 hover:bg-gray-800",
        features: [
          "1% Management fee (per year)",
          "12.5% Profit sharing (per month)",
          "High watermark protection",
          "Monthly performance reports",
        ],
      },
    ],
    nl: [
      {
        id: "class-i",
        title: "Participatieklasse I",
        stars: 1,
        description: "Perfect voor individuele beleggers en kleine Family offices.",
        investment: "€100K-€250K",
        buttonText: "Schrijf u nu in!",
        buttonClass: "bg-gray-900 hover:bg-gray-800",
        features: [
          "1,5% Beheervergoeding (per jaar)",
          "22,5% Winstdeling (per maand) Hoog",
          "High watermark-bescherming",
          "Maandelijkse prestatieoverzichten",
        ],
      },
      {
        id: "class-ii",
        title: "Participatieklasse II",
        stars: 2,
        description:
          "Ideaal voor gevestigde beleggers en middelgrote instellingen.",
        investment: "€250K-€500K",
        buttonText: "Schrijf u nu in!",
        buttonClass:
          "bg-gradient-to-r from-[#5A7B8D] to-[#192227] hover:bg-slate-700",
        features: [
          "1,25% Beheervergoeding (per jaar)",
          "17,5% Winstdeling (per maand)",
          "High Watermark- bescherming",
          "Maandelijkse prestatieoverzichten",
        ],
      },
      {
        id: "class-iii",
        title: "Participatieklasse III",
        stars: 3,
        description:
          "Ontworpen voor institutionele beleggers en grote Family offices.",
        investment: "€ 500K - en hoger",
        buttonText: "Schrijf u nu in!",
        buttonClass: "bg-gray-900 hover:bg-gray-800",
        features: [
          "1% Beheervergoeding (per jaar)",
          "12,5% Winstdeling (per maand)",
          "High Watermark- bescherming",
          "Maandelijkse prestatieoverzichten",
        ],
      },
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const starContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const noteVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
      },
    },
  };

  // Get current language content - default to English if language selection is invalid
  const t = translations[language as keyof typeof translations] || translations.en;
  const fundClasses = fundClassesData[language as keyof typeof fundClassesData] || fundClassesData.en;

  // Star component
  const StarRating = ({ count }: { count: number }) => (
    <motion.div className="flex gap-1" variants={starContainerVariants}>
      {[...Array(count)].map((_, i) => (
        <motion.div key={i} variants={starVariants}>
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );

  // Check icon
  const CheckIcon = () => (
    <div className="flex-shrink-0 w-5 h-5 text-green-500">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  return (
    <div className="bg-[#EEF4F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl font-bold text-gray-900 border-b border-gray-300 pb-2"
          >
            {t.fundCostStructure}
          </motion.h2>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 hover:cursor-pointer">
            {fundClasses.map((fundClass) => (
              <motion.div
                key={fundClass.id}
                initial="hidden"
                whileInView={"visible"}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <StarRating count={fundClass.stars} />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {fundClass.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {fundClass.description}
                  </p>
                  <p className="mt-4 text-lg font-bold text-gray-900">
                    {fundClass.investment}
                  </p>
                  <p className="text-sm text-gray-500">{t.minimumInvestment}</p>

                  <Link to="/participate">
                    <button
                      className={`mt-4 w-full py-3 px-4 rounded-md text-white font-medium hover:cursor-pointer
                        ${fundClass.buttonClass} transition-colors duration-300`}
                    >
                      {fundClass.buttonText}
                    </button>
                  </Link>

                  <div className="mt-6 space-y-3">
                    {fundClass.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={featureVariants}
                        className="flex items-center space-x-3"
                      >
                        <CheckIcon />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {fundClasses.map((fundClass) => (
              <motion.div
                key={fundClass.id}
                variants={cardVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <StarRating count={fundClass.stars} />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {fundClass.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {fundClass.description}
                  </p>
                  <p className="mt-4 text-lg font-bold text-gray-900">
                    {fundClass.investment}
                  </p>
                  <p className="text-sm text-gray-500">{t.minimumInvestment}</p>
                  <Link to="/participate">
                    <button
                      className={`mt-4 w-full py-3 px-4 rounded-md text-white font-medium hover:cursor-pointer
                        ${fundClass.buttonClass} transition-colors duration-300`}
                    >
                      {fundClass.buttonText}
                    </button>
                  </Link>

                  <div className="mt-6 space-y-3">
                    {fundClass.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={featureVariants}
                        className="flex items-center space-x-3"
                      >
                        <CheckIcon />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Watermark Explanation Note */}
          <motion.div
            initial="hidden"
            whileInView={"visible"}
            variants={noteVariants}
            className="bg-white rounded-lg shadow-sm p-6 lg:flex items-start space-x-4 mt-8 "
          >
            <div className="flex-1 items-center justify-center">
              <h4 className="text-lg font-semibold text-gray-900">
                {t.highWatermarkTitle}
              </h4>
              <p className="mt-1 text-gray-600">
                {t.highWatermarkDescription}
              </p>
            </div>
            <button
              className="text-[#002731] hover:text-[#002731c0] font-medium transition-colors
             duration-300 shadow-sm rounded-md p-3 flex items-center justify-center mt-3 hover:cursor-pointer "
              onClick={() => openPopup()}
            >
              {t.learnMore}
            </button>
          </motion.div>
        </motion.div>

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
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t.highWatermarkPopupTitle}
                    </h3>
                    <button
                      onClick={closePopup}
                      className="text-gray-400 hover:text-gray-600 p-2"
                      aria-label="Close popup"
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
                  <div className="prose max-w-none text-black">
                    {t.highWatermarkPopupContent}
                  </div>
                  <div className="mt-8 text-right">
                    <button
                      onClick={closePopup}
                      className="bg-[#0E7490] hover:bg-[#0e7490b7] text-white font-medium 
                      py-2 px-6 rounded-lg transition-colors"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FundCostStructure;