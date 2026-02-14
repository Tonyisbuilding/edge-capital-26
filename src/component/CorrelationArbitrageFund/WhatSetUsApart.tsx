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
          title: "Correlation breakdown",
          description: "Historical correlations between currency pairs can temporarily break down during extreme market conditions such as geopolitical shocks or central bank interventions.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Measures</span>
              <p className="opacity-80">Dynamic models that detect deviations in real-time. Automatic position reduction or switch to alternative currency pairs.</p>
            </div>
          )
        },
        {
          title: "Delayed correlation",
          description: "The return to the mean can take longer than expected, leading to prolonged exposure and increased risk of loss.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Measures</span>
              <p className="opacity-80">Time-based exit rules, maximum drawdown limits, and active hedging to lower portfolio volatility.</p>
            </div>
          )
        },
        {
          title: "Technical failure",
          description: "System failures or delays may prevent accurate responses to market fluctuations, leading to missed opportunities or uncontrolled losses.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Measures</span>
              <p className="opacity-80">Redundant VPS hosting with 99.99% uptime, automatic backups, failover systems, and multi-level alert monitoring.</p>
            </div>
          )
        }
      ]
    },
    nl: {
      sectionTitle: "Risk & Mitigation",
      sectionDesc: "Hieronder vindt u een gedetailleerde uitsplitsing van specifieke markt- en operationele risico's, samen met de waarborgen en hedgingstrategie\u00EBn die we gebruiken om de blootstelling te minimaliseren.",
      riskItems: [
        {
          title: "Correlatiebreuk",
          description: "Historische correlaties tussen valutaparen kunnen tijdelijk wegvallen bij extreme marktomstandigheden zoals geopolitieke schokken of centrale bankinterventies.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Maatregelen</span>
              <p className="opacity-80">Dynamische modellen die afwijkingen in real-time detecteren. Automatische positieverlaging of overschakeling naar alternatieve valutaparen.</p>
            </div>
          )
        },
        {
          title: "Late correlatie",
          description: "Het herstel naar het gemiddelde kan langer duren dan verwacht, wat leidt tot langere blootstelling en verhoogd verliesrisico.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Maatregelen</span>
              <p className="opacity-80">Tijdsgebonden exitregels, maximum drawdown-limieten en actieve hedging om de portefeuillevolatiliteit te verlagen.</p>
            </div>
          )
        },
        {
          title: "Technisch falen",
          description: "Systeemuitval of vertragingen kunnen nauwkeurige reacties op marktschommelingen verhinderen, met gemiste kansen of ongecontroleerde verliezen als gevolg.",
          measures: (
            <div className="flex flex-col gap-2">
              <span className="text-[22px] font-medium">Maatregelen</span>
              <p className="opacity-80">Redundante VPS-hosting met 99,99% uptime, automatische backups, failover-systemen en monitoring op meerdere waarschuwingsniveaus.</p>
            </div>
          )
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <section className="bg-[#F6FEFF] py-24">
      <div className="w-[98%] max-w-[1700px] mx-auto px-[10px] md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-[#00222C]">
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
