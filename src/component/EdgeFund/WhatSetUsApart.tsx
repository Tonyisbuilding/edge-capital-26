import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Settings, AlertTriangle } from 'lucide-react';
import "../landingPage/component.css";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images"; // Ensure brush image is in here

type RiskCardType = {
  title: string;
  description: string;
  measures: string | ReactNode;
  icon: ReactNode;
  index: number;
};

const RiskCard = ({ title, description, measures, icon, index }: RiskCardType) => {
  return (
    <motion.div
      className="bg-[#DDE6E9] rounded-[11px] p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="bg-gray-900 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-5"
        whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
      >
        {icon}
      </motion.div>

      <h3 className="font-bold mb-3 md:text-[21.89px] text-[#192227] text-[18.71px] inter">{title}</h3>

      <p className="font-normal mb-4 text-[14.92px] md:text-[17.45px] text-[#1A1A1A]">{description}</p>

      <div className="text-[14.92px] md:text-[17.45px] text-[#1A1A1A] font-normal">
        {measures}
      </div>
    </motion.div>
  );
};

const WhatSetsUsApart = () => {
  const { language } = useChangeLanguageContext();

  const content = {
    en: {
      sectionTitle: "Risk",
      riskItems: [
        {
          title: "Liquidity risk",
          description: "The inability to easily exit a position due to the lack of liquidity of the investment instrument being used.",
          measures: (
            <>
              <strong>Measures:</strong> Trading in the most liquid markets (S&P 500). Trading across various exchanges and brokers.
            </>
          ),
          icon: <BarChart size={24} className="text-white" />
        },
        {
          title: "Execution risk",
          description: "The risk of your order not being fully or not executed at all due to a technical issue.",
          measures: (
            <>
              <strong>Measures:</strong> Automated risk management scenarios, 24/7 human monitoring, backups, testing periods.
            </>
          ),
          icon: <Settings size={24} className="text-white" />
        },
        {
          title: "Counterparty risk",
          description: "The probability that a particular exchange will not be able to make the required payments for their debt obligations.",
          measures: (
            <>
              <strong>Measures:</strong> Diversification across the largest and safest exchanges.
            </>
          ),
          icon: <AlertTriangle size={24} className="text-white" />
        }
      ]
    },
    nl: {
      sectionTitle: "Risico",
      riskItems: [
        {
          title: "Liquiditeit risico",
          description: "Het onvermogen om gemakkelijk uit een positie te stappen vanwege het gebrek aan liquiditeit van het gebruikte beleggingsinstrument.",
          measures: (
            <>
              <strong>Maatregelen:</strong> Handelen in de meest liquide markten (S&P 500). Handelen via verschillende beurzen en brokers.
            </>
          ),
          icon: <BarChart size={24} className="text-white" />
        },
        {
          title: "Executie risico",
          description: "Het risico van uw order wordt door een technisch probleem niet geheel of helemaal niet uitgevoerd.",
          measures: (
            <>
              <strong>Maatregelen:</strong> Geautomatiseerde risicobeheerscenario's, 24/7 menselijke monitoring, back-ups, test periodes.
            </>
          ),
          icon: <Settings size={24} className="text-white" />
        },
        {
          title: "Tegenpartij risico",
          description: "De kans dat een bepaalde beurs niet in staat zal zijn om de vereiste betalingen voor hun schuldverplichtingen te doen.",
          measures: (
            <>
              <strong>Maatregelen:</strong> Verspreiding tussen de grootste en veiligste beurzen.
            </>
          ),
          icon: <AlertTriangle size={24} className="text-white" />
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <section className="bg-[#EEF4F5] py-16 md:py-14">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-5xl font-bold text-black relative z-10">
              {currentContent.sectionTitle}
            </h2>
            <img
              src={images.landingPage.Brush}
              alt="Brush underline"
              className="absolute bottom-[-6px] left-0 w-auto h-[5px] z-0"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentContent.riskItems.map((item, index) => (
            <RiskCard
              key={index}
              title={item.title}
              description={item.description}
              measures={item.measures}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
