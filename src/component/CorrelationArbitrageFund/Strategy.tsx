import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
  en: {
    ourStrategy: "Our strategy",
    learnMore: "Learn More",
    strategyTitle: "Correlation arbitrage",
    strategyDesc: "The EdgeNext Fund uses a fully automated trading strategy focused on over 30 carefully selected currency combinations. These pairs are primarily composed of strong currencies such as the Euro (EUR), uS Dollar (USD), New Zealand Dollar (NZD), Australian Dollar (AuD), and Canadian Dollar (CAD). Our strategy specifically targets currency pairs that share a common base or quote currency, leading to historically strong correlations — for example, EuR/CAD and USD/CAD, both sharing CAD.",
    strategyPopup: `The EdgeNext Fund uses a fully automated trading strategy focused on over 30 carefully selected currency combinations. These pairs are primarily composed of strong currencies such as the Euro (EUR), uS Dollar (USD), New Zealand Dollar (NZD), Australian Dollar (AuD), and Canadian Dollar (CAD). Our strategy specifically targets currency pairs that share a common currency, leading to historically strong correlations — for example, EuR/CAD and USD/CAD.\n\nThe trading method is based on the principle of 'mean reversion' — the idea that currency prices tend to stabilize around their historical average ratios. When a currency pair deviates significantly from its historical pattern, our models predict a correction toward the mean. Once such a deviation is detected by our quantitative models, we take simultaneous long and short positions in related currency pairs, a process known as hedging. This enables us to profit from both upward and downward market moves, depending on the direction of the correction. Profits are generated when the market reverts and currency pairs return to their expected relationship. This strategy typically carries lower-than-average market risk.\n\nThis market-neutral approach allows us to generate returns without relying on overall market direction while minimizing risk. If the market becomes unpredictable or volatility rises, positions are automatically adjusted, hedged, or closed to limit losses and optimize returns. This ensures a stable strategy, even in turbulent periods.\n\nAdditionally, the system is fully automated and optimized monthly using the latest market analysis methods and accurate data. This allows us to quickly adapt to changing market conditions and emerging trends. Thanks to this setup, the strategy is executed effectively — free from emotions or subjective decision-making.`,
    close: "Close",
  },
  nl: {
    ourStrategy: "Onze strategie",
    learnMore: "Meer informatie",
    strategyTitle: "Correlatie arbitrage",
    strategyDesc: "Het Correlatie arbitrage Fund maakt gebruik van een volautomatische handelsstrategie die zich richt op meer dan 30 zorgvuldig geselecteerde valutacombinaties. Deze combinaties bestaan voornamelijk uit sterke valuta\u2019s zoals de Euro (EUR), de Amerikaanse dollar (USD), Nieuw-Zeelandse dollar (NZD), Australische dollar (AUD) en de Canadese dollar (CAD). Onze strategie richt zich specifiek op valutaparen die een gemeenschappelijke valuta delen en daardoor historisch sterke correlaties vertonen. Denk hierbij aan paren als EUR/CAD en USD/CAD, waarbij de CAD als gemeenschappelijke valuta fungeert.",
    strategyPopup: `Het Correlatie arbitrage Fund maakt gebruik van een volautomatische handelsstrategie die zich richt op meer dan 30 zorgvuldig geselecteerde valutacombinaties. Deze combinaties bestaan voornamelijk uit sterke valuta\u2019s zoals de Euro (EUR), de Amerikaanse dollar (USD), Nieuw-Zeelandse dollar (NZD), Australische dollar (AUD) en de Canadese dollar (CAD). Onze strategie richt zich specifiek op valutaparen die een gemeenschappelijke valuta delen en daardoor historisch sterke correlaties vertonen. Denk hierbij aan paren als EUR/CAD en USD/CAD, waarbij de CAD als gemeenschappelijke valuta fungeert.\n\nDe handelsaanpak is gebaseerd op het principe van \u2018mean reversion\u2019 \u2013 het idee dat prijzen van valuta steeds weer stabiliseren rond hun \u2018gemiddelde verhouding\u2019. Wanneer een valutapaar aanzienlijk afwijkt van zijn historische prijspatroon, voorspellen onze modellen een correctie richting dat gemiddelde. Zodra onze kwantitatieve modellen zo\u2019n afwijking detecteren, nemen we gelijktijdig long- en shortposities in op gerelateerde valutaparen, ook wel \u2018hedging\u2019. Dit stelt ons in staat om te profiteren van zowel stijgingen als dalingen in de markt, afhankelijk van de richting van de correctie. Winst wordt gegenereerd wanneer de markt zich herstelt en de valutaparen terugkeren naar hun verwachte verhouding. Dit type strategie wordt doorgaans gekenmerkt door een lager dan gemiddeld marktrisico.\n\nDeze marktneutrale benadering stelt ons in staat om winst te genereren zonder afhankelijk te zijn van de algemene richting van de markt, terwijl het risico tegelijkertijd wordt geminimaliseerd. Als de markt onvoorspelbaar wordt of als volatiliteit toeneemt, worden posities automatisch aangepast, afgedekt of gesloten om verliezen te beperken en het rendement te optimaliseren. Op deze manier behouden we een stabiele strategie, ook tijdens onrustige periodes.\n\nVerder opereert het systeem volledig geautomatiseerd en wordt het maandelijks geoptimaliseerd op basis van de laatste marktanalysemethoden en accurate data. Dit stelt ons in staat om snel in te spelen op veranderingen in de marktomstandigheden en ons aan te passen aan nieuwe trends. Dankzij deze aanpak kunnen we de strategie effectief uitvoeren zonder dat emoties of subjectieve overwegingen de handelsbeslissingen be\u00EFnvloeden.`,
    close: "Sluiten",
  },
};

const StrategySection = () => {
  const { language } = useChangeLanguageContext();
  const t = translations[language] || translations.en;
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const strategies = [
    {
      id: "correlation-arbitrage",
      title: t.strategyTitle,
      description: t.strategyDesc,
      popupContent: t.strategyPopup,
      icon: images.edgefund.arrowTrending,
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
    <section className="py-24 px-8 bg-[#F6FEFF]">
      <div className="w-[98%] max-w-[1700px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="relative mb-20 text-center">
          <h2 className="text-[#00222C] text-[40px] md:text-[48px] font-bold">
            {t.ourStrategy}
          </h2>
          <img
            src={images.landingPage.Brush}
            alt="Brush underline"
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-[8px] w-auto max-w-[200px]"
          />
        </div>

        {/* Cards Container */}
        <div className="w-full flex flex-col gap-12 items-center">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              className="w-full max-w-[1000px] rounded-[32px] p-8 md:p-12 relative overflow-hidden"
              style={{
                border: "1px solid transparent",
                background: `linear-gradient(#BDE0E8, #F6FEFF) padding-box, linear-gradient(to bottom, rgba(36, 109, 126, 1), rgba(65, 197, 228, 0.29)) border-box`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Icon Container */}
              <div
                className="w-14 h-14 rounded-2xl bg-[#206A7C] flex items-center justify-center mb-10"
                style={{
                  boxShadow: "inset 0 5.52px 5.52px rgba(111, 191, 200, 0.5)"
                }}
              >
                <img src={strategy.icon} alt="" className="w-6 h-6 object-contain" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[#00222C] text-[22px] md:text-[24px] font-bold">
                  {strategy.title}
                </h3>
                <p className="text-[#00222C]/70 text-[16px] leading-relaxed font-normal lg:max-w-[90%]">
                  {strategy.description}
                </p>
              </div>

              {/* Action */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => openPopup(strategy.id)}
                  className="text-[#0E7490] hover:underline font-semibold transition-all text-[14px]"
                >
                  {t.learnMore}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Logic */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 md:p-12 w-full max-w-[70%] shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-[28px] md:text-[32px] font-bold text-[#00222C]">
                  {strategies.find(s => s.id === activePopup)?.title}
                </h3>
                <button
                  onClick={closePopup}
                  className="text-[#00222C]/40 hover:text-[#00222C] p-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-[#00222C]/70 leading-relaxed max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                {strategies.find(s => s.id === activePopup)?.popupContent.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex justify-end mt-10">
                <button
                  onClick={closePopup}
                  className="bg-[#0E7490] text-white px-10 py-3 rounded-full font-bold hover:bg-[#0E7490]/90 transition-all"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StrategySection;
