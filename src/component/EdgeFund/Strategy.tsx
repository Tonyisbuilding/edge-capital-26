import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
  en: {
    ourStrategy: "Our strategy",
    learnMore: "More information",
    volatilityTitle: "Volatility risk premium",
    volatilityDesc: "EdgeFund aims to capitalize on volatility risk premiums on globally developed equity and bond markets by writing call and put options to buyers seeking financial insurance in exchange for a premium.",
    volatilityPopup: `The VPF sells options based on our proprietary quantitative models. We focus on 'expensive' options where demand for protection is high, resulting in attractive premiums. We can sell both uncovered and covered options. When selling an option, delta hedging is applied by taking long or short positions in the underlying instrument of the option to hedge directional exposure and reduce return volatility. We use ETFs, CFDs, and/or futures for this purpose. During a rebalancing process, written options may be closed by buying the same option or by purchasing a comparable option on the same underlying instrument as determined by the quantitative model.\n\nThe premiums received from the sale of put and call options may be fully or partially offset by the amounts that need to be paid out. The goal is to execute an option strategy in such a way that the received premiums exceed the amounts paid out, including any profits or losses from hedging activities.\n\nThe Volatility risk premium is the difference between implied volatility and realized volatility. When implied volatility is higher than realized volatility, investors demand a higher return for bearing the risk of volatile assets than what has historically been realized. If implied volatility is lower than realized volatility, investors are willing to accept a lower return for holding volatile assets than what has historically been realized.\n\nWithin the strategy, there is a choice of three options-based strategies, all of which can be applied to the S&P 500. All strategies share a common basis of shorting options, allowing us to target a predefined premium.\n\n→ Low correlation between the 3 strategies → Diversification in approach for each strategy → Different term structure in each strategy\n\n1. 40 DTE (days-to-expiry) strangles (or straddles) strategy. This strategy is applied depending on the current volatility in the market. The sold options are hedged by delta hedging with ES futures to closely mimic the profit and loss movements of the options. We work with weekly contracts, so positions are closed at the end of each week.\n\n2. 0 DTE intraday iron condor strategy. This strategy is only applied during the U.S. trading session with positions opened based on a fully rule-based approach. This takes into account the hours before expiration and the current volatility in the market. Each iron condor is managed with a stop loss based on the expected premium gained.\n\n3. Close 45 DTE strangles strategy. This strategy selects the nearest 45 DTE strangles based on optimal IVR (Implied Volatility Rank) and deltas. Positions are closed when profit reaches 50% of the credit received. In case of loss, positions are rolled over to the next period or adjusted to reduce delta exposure and rebalance the beta exposure of the overall portfolio.`,
    arbitrageTitle: "Interest Rate Arbitrage",
    arbitrageDesc: "Market-neutral interest rate arbitrage is an investment strategy aimed at generating profits by exploiting price inefficiencies between interest rates, while simultaneously minimizing exposure to general market movements.",
    arbitragePopup: `Identifying interest rate differentials: We identify price differences or discrepancies between interest rates. These differences can arise due to factors such as changes in interest rates, market expectations, or credit conditions.\n\nCreating a market-neutral position: The strategy involves creating a market-neutral position by simultaneously entering into transactions that offset each other. This means taking both a long (buy) and a short (sell) position on the positions simultaneously. The idea is to balance exposure to interest rate movements.\n\nExploiting price inefficiencies: By holding long and short positions simultaneously, we aim to profit from the relative mispricing of comparable interest rates. This may involve exploiting differences in yields, credit spreads, or other relevant factors.\n\nMinimizing market risk: The market-neutral aspect of the strategy is crucial. The goal is to minimize exposure to overall market movements. Instead, the focus is on capturing potential price differences between specific interest rates.\n\nRisk management: Despite the market-neutral nature, there are still risks associated with the strategy. Interest rate movements or unexpected changes in market conditions can affect the strategy. Risk management techniques, such as stop-loss orders or determining position size, are always applied to limit potential losses.\n\nMonitoring and Adjusting Positions: Our trading desk actively monitors the performance of their market-neutral Interest rate arbitrage positions. Adjustments may be made in response to changes in market conditions or as part of an ongoing strategy to optimize returns. This approach requires a deep understanding of interest rate markets, derivative instruments, and principles of Risk management. Additionally, advanced financial modeling and analysis can be used to identify potential opportunities and assess the effectiveness of the market-neutral strategy.`,
    close: "Close",
  },
  nl: {
    ourStrategy: "Onze strategie",
    learnMore: "Meer informatie",
    volatilityTitle: "Volatility risk premium",
    volatilityDesc: "EdgeFund heeft als doel om de volatiliteitsrisicopremie te benutten op wereldwijd ontwikkelde aandelen- en obligatiemarkten door het schrijven van call- en putopties aan kopers die op zoek zijn naar een financiële verzekering in ruil voor een premie.",
    volatilityPopup: `De VPF verkoopt opties op basis van onze eigen kwantitatieve modellen. We richten ons op 'dure' opties waar de vraag naar bescherming hoog is, wat resulteert in aantrekkelijke premies. We kunnen zowel ongedekte als gedekte opties verkopen. Bij het verkopen van een optie wordt delta-hedging toegepast door long- of shortposities in te nemen in het onderliggende instrument van de optie om directionele blootstelling af te dekken en de volatiliteit van het rendement te verminderen. We gebruiken hiervoor ETF's, CFD's en/of futures. Tijdens een herbalanceringsproces kunnen geschreven opties worden gesloten door dezelfde optie te kopen of door een vergelijkbare optie op hetzelfde onderliggende instrument te kopen, zoals bepaald door het kwantitatieve model.\n\nDe ontvangen premies uit de verkoop van put- en callopties kunnen geheel of gedeeltelijk worden gecompenseerd door de bedragen die moeten worden uitgekeerd. Het doel is om een optiestrategie zo uit te voeren dat de ontvangen premies hoger zijn dan de uitgekeerde bedragen, inclusief eventuele winsten of verliezen uit hedging-activiteiten.\n\nDe volatiliteitsrisicopremie is het verschil tussen de geïmpliceerde volatiliteit en de gerealiseerde volatiliteit. Wanneer de geïmpliceerde volatiliteit hoger is dan de gerealiseerde volatiliteit, eisen beleggers een hoger rendement voor het dragen van het risico van volatiele activa dan wat historisch gezien is gerealiseerd. Als de geïmpliceerde volatiliteit lager is dan de gerealiseerde volatiliteit, zijn beleggers bereid een lager rendement te accepteren voor het aanhouden van volatiele activa dan wat historisch gezien is gerealiseerd.\n\nBinnen de strategie is er keuze uit drie op opties gebaseerde strategieën, die allemaal kunnen worden toegepast op de S&P 500. Alle strategieën delen een gemeenschappelijke basis van het shorten van opties, waardoor we ons kunnen richten op een vooraf gedefinieerde premie.\n\n→ Lage correlatie tussen de 3 strategieën → Diversificatie in aanpak voor elke strategie → Verschillende termijnstructuur in elke strategie\n\n1. 40 DTE (days-to-expiry) strangles (of straddles) strategie. Deze strategie wordt toegepast afhankelijk van de huidige volatiliteit in de markt. De verkochte opties worden afgedekt door delta-hedging met ES-futures om de winst- en verliesbewegingen van de opties nauwkeurig na te bootsen. We werken met wekelijkse contracten, dus posities worden aan het einde van elke week gesloten.\n\n2. 0 DTE intraday iron condor strategie. Deze strategie wordt alleen toegepast tijdens de Amerikaanse handelssessie met posities die worden geopend op basis van een volledig op regels gebaseerde aanpak. Hierbij wordt rekening gehouden met de uren voor expiratie en de huidige volatiliteit in de markt. Elke iron condor wordt beheerd met een stop-loss op basis van de verwachte ontvangen premie.\n\n3. Close 45 DTE strangles strategie. Deze strategie selecteert de dichtstbijzijnde 45 DTE strangles op basis van optimale IVR (Implied Volatility Rank) en delta's. Posities worden gesloten wanneer de winst 50% van het ontvangen krediet bereikt. In geval van verlies worden posities doorgerold naar de volgende periode of aangepast om de delta-blootstelling te verminderen en de beta-blootstelling van de totale portefeuille te herbalanceren.`,
    arbitrageTitle: "Rente-arbitrage",
    arbitrageDesc: "Marktneutrale rente-arbitrage is een beleggingsstrategie die tot doel heeft winst te genereren door gebruik te maken van prijsinefficiënties tussen rentes, terwijl tegelijkertijd de blootstelling aan algemene marktbewegingen wordt geminimaliseerd.",
    arbitragePopup: `Identificeren van rentemarges: We identificeren prijsverschillen of discrepanties tussen rentetarieven. Deze verschillen kunnen ontstaan door factoren zoals veranderingen in rentetarieven, marktverwachtingen of kredietvoorwaarden.\n\nCreëren van een marktneutrale positie: De strategie omvat het creëren van een marktneutrale positie door gelijktijdig transacties aan te gaan die elkaar compenseren. Dit betekent het tegelijkertijd innemen van zowel een long (koop) als een short (verkoop) positie op de posities. Het idee is om de blootstelling aan rentebewegingen in evenwicht te brengen.\n\nExploiteren van prijsinefficiënties: Door gelijktijdig long- en shortposities aan te houden, streven we ernaar te profiteren van de relatieve verkeerde prijsstelling van vergelijkbare rentetarieven. Dit kan inhouden dat we profiteren van verschillen in rendementen, kredietspreads of andere relevante factoren.\n\nMinimaliseren van marktrisico: Het marktneutrale aspect van de strategie is cruciaal. Het doel is om de blootstelling aan algemene marktbewegingen tot een minimum te beperken. In plaats daarvan ligt de focus op het vastleggen van potentiële prijsverschillen tussen specifieke rentetarieven.\n\nRisicobeheer: Ondanks het marktneutrale karakter zijn er nog steeds risico's verbonden aan de strategie. Rentebewegingen of onverwachte veranderingen in marktomstandigheden kunnen de strategie beïnvloeden. Risicobeheertechnieken, zoals stop-loss orders of het bepalen van de positiegrootte, worden altijd toegepast om potentiële verliezen te beperken.\n\nMonitoren en aanpassen van posities: Onze trading desk monitort actief de prestaties van hun marktneutrale rente-arbitrageposities. Aanpassingen kunnen worden gemaakt in reactie op veranderingen in marktomstandigheden of als onderdeel van een voortdurende strategie om het rendement te optimaliseren. Deze aanpak vereist een diepgaand begrip van rentemarkten, derivaten en principes van risicobeheer. Daarnaast kunnen geavanceerde financiële modellering en analyse worden gebruikt om potentiële kansen te identificeren en de effectiviteit van de marktneutrale strategie te beoordelen.`,
    close: "Sluiten",
  },
};

const StrategySection = () => {
  const { language } = useChangeLanguageContext();
  const t = translations[language] || translations.en;
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const strategies = [
    {
      id: "volatility",
      title: t.volatilityTitle,
      description: t.volatilityDesc,
      popupContent: t.volatilityPopup,
      icon: images.edgefund.arrowTrending,
    },
    {
      id: "arbitrage",
      title: t.arbitrageTitle,
      description: t.arbitrageDesc,
      popupContent: t.arbitragePopup,
      icon: images.edgefund.forecasting,
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
    <section className="py-24 px-[10px] md:px-8 bg-[#F6FEFF]">
      <div className="w-[98%] max-w-[1700px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="relative mb-20 text-center">
          <h2 className="text-[#00222C] text-3xl md:text-5xl font-bold">
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
              className="w-full max-w-[1000px] rounded-[32px] p-5 md:p-12 relative overflow-hidden"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start md:items-center justify-center pt-3 md:pt-0 px-[1%] md:p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-12 w-[98%] md:w-full md:max-w-[70%] shadow-2xl relative overflow-hidden max-h-[95vh] md:max-h-none overflow-y-auto"
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
