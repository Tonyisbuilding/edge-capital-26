import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images";

const RiskCard = ({
  title,
  description,
  measures,
  isOpen,
  index,
  onHover
}: {
  title: string;
  description: string;
  measures: React.ReactNode;
  isOpen: boolean;
  index: number;
  onHover: () => void;
}) => {
  return (
    <motion.div
      className="relative rounded-[20px] p-8 md:p-8 min-h-[475px] flex flex-col justify-end overflow-hidden cursor-pointer"
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        backgroundColor: '#206A7C',
      }}
    >
      {/* Grainy Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("${images.edgefund.grains}")`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
          zIndex: 0
        }}
      />
      {/* Arrow Icon in top-left */}
      <div className="absolute top-8 left-8">
        <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white">
          <motion.div
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          </motion.div>
        </div>
      </div>

      {/* Content with 40px gap from arrow area (32 top + 40 icon + 40 gap) */}
      <div className="relative z-10 flex flex-col gap-2 mt-[112px]">
        <h3 className="text-white text-[22px] font-medium leading-tight">
          {title}
        </h3>

        <div className="overflow-hidden">
          <motion.div
            animate={{
              height: isOpen ? 'auto' : '48px',
              opacity: 1
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-4"
          >
            <p className="text-white/80 text-[16px] leading-relaxed">
              {description}
            </p>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {/* <div className="h-[1px] bg-white/20 w-full" /> */}
                  <div className="text-white text-[16px] leading-relaxed">
                    {measures}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const WhatSetsUsApart = () => {
  const { language } = useChangeLanguageContext();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const content = {
    en: {
      sectionTitle: "Risk & Mitigation",
      sectionDesc: "Below is a detailed breakdown of specific market and operational risks, alongside the safeguards and hedging strategies we use to minimise exposure.",
      riskItems: [
        {
          title: "Liquidity risk",
          description: "The inability to easily exit a position due to the lack of liquidity of the investment instrument being used.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Measures</span>
              <p className="opacity-80">Trading in the most liquid markets (S&P 500). Trading across various exchanges and brokers.</p>
            </div>
          )
        },
        {
          title: "Execution risk",
          description: "The risk of your order not being fully or not executed at all due to a technical issue.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Measures</span>
              <p className="opacity-80">Automated risk management scenarios, 24/7 human monitoring, backups, testing periods.</p>
            </div>
          )
        },
        {
          title: "Counterparty risk",
          description: "The probability that a particular exchange will not be able to make the required payments for their debt obligations.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Measures</span>
              <p className="opacity-80">Diversification across the largest and safest exchanges.</p>
            </div>
          )
        }
      ]
    },
    nl: {
      sectionTitle: "Risk & Mitigation",
      sectionDesc: "Hieronder vindt u een gedetailleerde uitsplitsing van specifieke markt- en operationele risico's, samen met de waarborgen en hedgingstrategieën die we gebruiken om de blootstelling te minimaliseren.",
      riskItems: [
        {
          title: "Correlatiebreuk",
          description: "Het onvermogen om gemakkelijk uit een positie te stappen vanwege het gebrek aan liquiditeit van het gebruikte beleggingsinstrument.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Maatregelen</span>
              <p className="opacity-80">Handelen in de meest liquide markten (S&P 500). Handelen via verschillende beurzen en brokers.</p>
            </div>
          )
        },
        {
          title: "Executie risico",
          description: "Het risico van uw order wordt door een technisch probleem niet geheel of helemaal niet uitgevoerd.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Maatregelen</span>
              <p className="opacity-80">Geautomatiseerde risicobeheerscenario's, 24/7 menselijke monitoring, back-ups, test periodes.</p>
            </div>
          )
        },
        {
          title: "Tegenpartij risico",
          description: "De kans dat een bepaalde beurs niet in staat zal zijn om de vereiste betalingen voor hun schuldverplichtingen te doen.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Maatregelen</span>
              <p className="opacity-80">Verspreiding tussen de grootste en veiligste beurzen.</p>
            </div>
          )
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <section className="bg-[#F6FEFF] py-24">
      <div className="w-[98%] max-w-[1700px] mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <h2 className="text-[40px] md:text-[56px] font-bold text-[#00222C]">
              {currentContent.sectionTitle}
            </h2>
            <img
              src={images.landingPage.Brush}
              alt=""
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[200px] h-[8px]"
            />
          </div>
          <p className="text-[#00222C]/60 text-lg md:text-xl max-w-3xl leading-relaxed">
            {currentContent.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentContent.riskItems.map((item, index) => (
            <RiskCard
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              measures={item.measures}
              isOpen={activeCardIndex === index}
              onHover={() => setActiveCardIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;