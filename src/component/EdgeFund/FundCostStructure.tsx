import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import "./FundCostStructure.css";

// Assets
import costStrBg from "../../assets/images/edgefund/cost-str-bg.png";
import klasse1 from "../../assets/icons/klasse-1.svg";
import klasse2 from "../../assets/icons/klasse-2.svg";
import klasse3 from "../../assets/icons/klasse-3.svg";
import doneAll from "../../assets/icons/done-all.svg";
import images from "../../constant/images";

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
      highWatermarkPopupContent: "The manager calculates profit sharing based on the \"high water mark principle.\" High watermark: A high watermark refers to the highest value achieved by an investment fund or asset manager. This term is often used in performance-based compensation of a fund or asset manager. In a fee structure with a high watermark application, commission fees of a fund manager or asset manager are only calculated based on net results. The fee is only calculated after past losses have been recovered. This prevents the fund manager or asset manager from receiving fees from volatile performance. Profit sharing is calculated retrospectively on a monthly basis, and the high watermark level is also determined monthly.",
      costStructureSubheader: "Below is a complete breakdown of our entry levels and associated costs, designed to offer competitive terms for investors at every stage of wealth.",
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
      costStructureSubheader: "Hieronder vindt u een volledig overzicht van onze instapniveaus en bijbehorende kosten, ontworpen om concurrerende voorwaarden te bieden voor investeerders in elke fase van vermogen.",
    }
  };

  // Fund class data with translations
  const fundClassesData = {
    en: [
      {
        id: "class-i",
        title: "Participation class I",
        icon: klasse1,
        description: "Perfect for individual investors and small Family offices.",
        investment: "€100K-€250K",
        buttonText: "Sign up now!",
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
        icon: klasse2,
        description: "Ideal for established investors and medium-sized institutions.",
        investment: "€250K-€500K",
        buttonText: "Sign up now!",
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
        icon: klasse3,
        description: "Built for institutional investors and large Family offices.",
        investment: "€ 500K - en hoger",
        buttonText: "Sign up now!",
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
        icon: klasse1,
        description: "Perfect voor individuele beleggers en kleine Family offices.",
        investment: "€100K-€250K",
        buttonText: "Schrijf u nu in!",
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
        icon: klasse2,
        description: "Ideaal voor gevestigde beleggers en middelgrote instellingen.",
        investment: "€250K-€500K",
        buttonText: "Schrijf u nu in!",
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
        icon: klasse3,
        description: "Ontworpen voor institutionele beleggers en grote Family offices.",
        investment: "€ 500K - en hoger",
        buttonText: "Schrijf u nu in!",
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

  const noteVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
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

  // Get current language content - default to English if language selection is invalid
  const t = translations[language as keyof typeof translations] || translations.en;
  const fundClasses = fundClassesData[language as keyof typeof fundClassesData] || fundClassesData.en;

  return (
    <div className="fcs-container">
      <div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="space-y-8"
        >
          <div className="relative mb-12 text-center flex flex-col items-center">
            <h2 className="text-3xl lg:text-[40px] font-bold text-[#00222C] relative inline-block z-10">
              EdgeFund <span className="relative inline-block">
                Cost Structure
                <img
                  src={images.landingPage.Brush}
                  alt=""
                  className="absolute bottom-[-6px] left-0 w-full h-[8px] -z-10 bg-contain bg-no-repeat"
                />
              </span>
            </h2>
            <p className="mt-6 text-[#3A494D] max-w-3xl mx-auto text-center leading-relaxed">
              {t.costStructureSubheader}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {fundClasses.map((fundClass, index) => {
              const isMiddleCard = index === 1;
              const wrapperClass = isMiddleCard ? "fcs-card-highlight" : "fcs-card-standard";

              return (
                <motion.div
                  key={fundClass.id}
                  variants={cardVariants}
                  className={`fcs-card-wrapper ${wrapperClass}`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="fcs-card-content">
                    {/* Content container (relative for z-index) */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="fcs-icon-outside-wrapper">
                        <div className="fcs-bg-img" style={{ backgroundImage: `url(${costStrBg})` }}></div>
                        <div className="fcs-icon-overlay"></div>
                        <img src={fundClass.icon} alt={fundClass.title} className="fcs-icon-svg" />
                      </div>

                      <h3 className="text-xl font-semibold fcs-text-main">
                        {fundClass.title}
                      </h3>
                      <p className="mt-2 text-sm fcs-text-sub pb-[0px]">
                        {fundClass.description}
                      </p>
                      <p className="mt-4 font-bold fcs-text-main fcs-investment-amount">
                        {fundClass.investment}
                      </p>
                      <p className="text-sm text-gray-400">{t.minimumInvestment}</p>

                      <Link to="/participate">
                        <button className="fcs-button">
                          <div className="fcs-bg-img" style={{ backgroundImage: `url(${costStrBg})` }}></div>
                          <div className="fcs-button-overlay"></div>
                          <span className="fcs-button-text">{fundClass.buttonText}</span>
                        </button>
                      </Link>

                      <div className="mt-6 space-y-3">
                        {fundClass.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={featureVariants}
                            className="flex items-center space-x-3"
                          >
                            <img src={doneAll} alt="Check" className="fcs-check-icon" />
                            <span className="fcs-text-sub">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Watermark Explanation Section (Restored & Styled) */}
          <motion.div
            initial="hidden"
            whileInView={"visible"}
            variants={noteVariants}
            className="fcs-watermark-container"
          >
            <div className="fcs-watermark-pattern"></div>
            <div className="fcs-watermark-content">
              <h4 className="fcs-watermark-title">
                {t.highWatermarkTitle}
              </h4>
              <p className="fcs-watermark-desc">
                {t.highWatermarkDescription}
              </p>
            </div>
            <button
              className="fcs-watermark-button hover:cursor-pointer"
              onClick={() => openPopup()}
            >
              {t.learnMore}
            </button>
          </motion.div>
        </motion.div>

        {/* Popup (kept from original) */}
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