import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, Shield, Castle } from "lucide-react";
import { ReactNode } from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const FeatureCard = ({
  icon,
  title,
  backText,
  index,
}: {
  icon: ReactNode;
  title: string;
  backText: string;
  index: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-full h-[400px] perspective-1000"
      onClick={handleFlip}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: '1000px' }}
      key={index}
    >
      {/* Front Card */}
      <motion.div
        className="absolute w-full h-full bg-[#206A7C] rounded-lg p-8 flex flex-col text-white overflow-hidden"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="mb-6">{icon}</div>
        <h3 className="text-2xl font-semibold text-left mt-auto">{title}</h3>
      </motion.div>

      {/* Back Card */}
      <motion.div
        className="absolute w-full h-full bg-[#206A7C] rounded-lg p-8 text-white overflow-hidden"
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex flex-col justify-end h-full">
          <p className="text-base">{backText}</p>
        </div>
      </motion.div>
    </div>
  );
};

const WhatSetsUsApart = () => {
  const { language } = useChangeLanguageContext();

  const translations = {
    en: {
      sectionTitle: "What sets us apart",
      features: [
        {
          icon: <Target className="w-12 h-12 text-white text-left" />,
          title: "Market Certainty",
          backText:
            "We don't rely on predictions—we use predefined parameters like interest rates and options premiums to drive our strategies.",
        },
        {
          icon: <Shield className="w-12 h-12 text-white" />,
          title: "Risk management",
          backText:
            "Every position we take is fully hedged, ensuring minimized risk and stable returns.",
        },
        {
          icon: <Castle className="w-12 h-12 text-white" />,
          title: "Quantitative trading",
          backText:
            "Our strategies leverage advanced trading systems across options and futures markets for precision and efficiency.",
        },
      ],
    },
    nl: {
      sectionTitle: "Wat ons onderscheidt",
      features: [
        {
          icon: <Target className="w-12 h-12 text-white text-left" />,
          title: "Marktzekerheid",
          backText:
            "We vertrouwen niet op voorspellingen—we gebruiken vooraf gedefinieerde parameters zoals rentetarieven en optiepremies om onze strategieën te sturen.",
        },
        {
          icon: <Shield className="w-12 h-12 text-white" />,
          title: "Risicobeheer",
          backText:
            "Elke positie die we innemen is volledig afgedekt, wat zorgt voor geminimaliseerd risico en stabiele rendementen.",
        },
        {
          icon: <Castle className="w-12 h-12 text-white" />,
          title: "Kwantitatieve handel",
          backText:
            "Onze strategieën maken gebruik van geavanceerde handelssystemen op opties- en futuresmarkten voor precisie en efficiëntie.",
        },
      ],
    },
  };

  const currentLanguageData = translations[language];

  return (
    <section className="py-16 px-[10px] md:px-4 ">
      <div className="w-[98%] max-w-[1700px] mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {currentLanguageData.sectionTitle}
        </motion.h2>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
          {currentLanguageData.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              index={index}
              backText={feature.backText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
