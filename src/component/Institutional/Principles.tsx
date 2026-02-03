import React, { useState } from "react";
import { TrendingUp, Scale, Award, BarChart2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

// Define types for principle data
interface Principle {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PrinciplesSection: React.FC = () => {
  const { language } = useChangeLanguageContext();
  const [activeCard, setActiveCard] = useState<number>(0);

  // Define translations for English and Dutch
  const translations = {
    en: {
      subheader: "Edge Capital Principles",
      header: "5 principles that drive our success",
      principles: [
        {
          id: 1,
          title: "Volatility premium strategy",
          description:
            "Our strategy based on ES (S&P 500) and NQ (Nasdaq) options utilizes a model focused on selling volatility and targets short-term systems. We sell options with 0 days to expiration (DTE) at deltas between 0.1 and 0.3 with an asymmetrical preference for the call side.",
          icon: <TrendingUp className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 2,
          title: "Dynamic Delta-hedging",
          description:
            "Delta-hedging adjusts dynamically based on market volatility, supported by parameters enhanced with machine learning. This allows us to maintain optimal Risk management regardless of market conditions.",
          icon: <Scale className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 3,
          title: "Proven performance",
          description:
            "The strategy shows an average daily expected return of 0.18% gross (before commissions) and 0.12% net (after costs). The win ratio, calculated as the ratio of profitable days to losing days, is 1.82 net and 2.41 gross.",
          icon: <Award className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 4,
          title: "Risk management & scalability",
          description:
            "By exclusively using 0DTE options on the S&P 500 and Nasdaq, we avoid overnight risks. Moreover, our model offers high scalability of up to €100 million without compromising efficiency or performance.",
          icon: <BarChart2 className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 5,
          title: "Institutional-grade collaboration",
          description:
            "We offer flexible collaboration options through Direct fund participation or tailor-made SaaS solutions, allowing various types of investors to benefit from our strategies.",
          icon: <Users className="w-12 h-12 text-[#000D14]" />,
        },
      ],
      prevAriaLabel: "Previous principle",
      nextAriaLabel: "Next principle",
      goToAriaLabel: (index: number) => `Go to principle ${index + 1}`,
    },
    nl: {
      subheader: "Edge Capital Principes",
      header: "5 Principes die ons succes aandrijven",
      principles: [
        {
          id: 1,
          title: "Volatiliteitspremiestrategie",
          description:
            "Onze strategie is gebaseerd op ES (S&P 500) en NQ (Nasdaq) opties en gebruikt een model dat zich richt op het verkopen van volatiliteit binnen kortetermijnsystemen. Wij verkopen opties met 0 dagen looptijd (DTE) en deltas tussen 0,1 en 0,3 — met een asymmetrische voorkeur voor callopties.",
          icon: <TrendingUp className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 2,
          title: "Dynamische delta-hedging",
          description:
            "Delta-hedging wordt dynamisch aangepast op basis van marktvolatiliteit, ondersteund door parameters die zijn verbeterd met machine learning. Dit stelt ons in staat om optimaal risicobeheer te handhaven onder alle marktomstandigheden.",
          icon: <Scale className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 3,
          title: "Bewezen prestaties",
          description:
            "De strategie toont een gemiddelde verwachte dagelijkse bruto-opbrengst van 0,18% (voor commissies) en netto 0,12% (na kosten). De win-ratio, berekend als de verhouding tussen winstgevende en verlieslatende dagen, is 1,82 netto en 2,41 bruto.",
          icon: <Award className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 4,
          title: "Risicobeheer & schaalbaarheid",
          description:
            "Door uitsluitend 0DTE-opties te gebruiken op de S&P 500 en Nasdaq vermijden we risico’s van posities ‘overnight’. Bovendien biedt ons model een hoge schaalbaarheid tot €100 miljoen, zonder in te leveren op efficiëntie of prestaties.",
          icon: <BarChart2 className="w-12 h-12 text-[#000D14]" />,
        },
        {
          id: 5,
          title: "Samenwerking op institutioneel niveau",
          description:
            "We bieden flexibele samenwerkingsopties via Directe fondsdeelname of op maat gemaakte SaaS-oplossingen, waardoor verschillende soorten beleggers kunnen profiteren van onze strategieën.",
          icon: <Users className="w-12 h-12 text-[#000D14]" />,
        },
      ],
      prevAriaLabel: "Vorig principe",
      nextAriaLabel: "Volgend principe",
      goToAriaLabel: (index: number) => `Ga naar principe ${index + 1}`,
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;
  const principles: Principle[] = content.principles;

  // Mobile navigation handlers
  const goToPrevCard = () => {
    setActiveCard((prev) => (prev - 1 + principles.length) % principles.length);
  };

  const goToNextCard = () => {
    setActiveCard((prev) => (prev + 1) % principles.length);
  };

  return (
    <section className="bg-[#F2F7F7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* <h3 className="text-teal-400 text-xl md:text-2xl font-medium mb-2">
            {content.subheader}
          </h3> */}
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {content.header}
          </h2>
        </div>

        {/* Mobile Display */}
        <div className="md:hidden">
          <div className="relative">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-6 flex flex-col h-full justify-between py-8">
                <div>
                  <div className="flex mb-6">
                    {principles[activeCard].icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {principles[activeCard].title}
                  </h3>

                  <p className="text-md text-gray-600 leading-relaxed">
                    {principles[activeCard].description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-teal-600 font-semibold">
                    {`0${principles[activeCard].id}`}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={goToPrevCard}
                      className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
                      aria-label={content.prevAriaLabel}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={goToNextCard}
                      className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
                      aria-label={content.nextAriaLabel}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Navigation Indicator */}
          <div className="flex justify-center mt-4">
            {principles.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === activeCard ? "bg-teal-500" : "bg-gray-400"
                }`}
                aria-label={content.goToAriaLabel(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {principles.slice(0, 3).map((principle, index) => (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="bg-white p-6 rounded-lg flex flex-col h-full justify-between py-8 
                shadow-lg transition-shadow duration-300 shadow-[rgba(32,106,124, 0.25)]"
                onClick={() => setActiveCard(index)}
              >
                <div>
                  <div className="flex  mb-6">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {principle.title}
                  </h3>
                  <p className="text-md text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-6 lg:hidden">
                  <span className="text-teal-600 font-semibold">{`0${principle.id}`}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last Two Cards Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.slice(3).map((principle, index) => (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (index + 3) * 0.1,
                }}
                className="bg-white p-6 rounded-lg flex flex-col h-full justify-between 
                py-8 shadow-lg transition-shadow duration-300 shadow-[rgba(32,106,124, 0.25)]"
                onClick={() => setActiveCard(index + 3)}
              >
                <div>
                  <div className="flex  mb-6">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {principle.title}
                  </h3>
                  <p className="text-md text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-6 lg:hidden">
                  <span className="text-teal-600 font-semibold">{`0${principle.id}`}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;