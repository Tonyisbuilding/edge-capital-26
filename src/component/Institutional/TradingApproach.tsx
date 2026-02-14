import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ShieldCheck, 
  Monitor, 
  Search, 
  Laptop, 
  PieChart,
  LucideIcon
} from 'lucide-react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

interface TradingApproachCardProps {
  icon: LucideIcon; // Use LucideIcon type for icon components
  title: string;
  description: string;
}

const TradingApproachCard: React.FC<TradingApproachCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      className="bg-[#F9A600] p-6 rounded-lg shadow-lg lg:h-[26rem]"
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-white w-6 h-6" />
      </div>
      <h3 className="text-[19.81px] lg:text-[23.1px] font-semibold text-black mb-3">{title}</h3>
      <p className="text-black text-opacity-80 font-normal text-[14.71px] lg:text-[17.45px]">{description}</p>
    </motion.div>
  );
};

const TradingApproachSection = () => {
  const { language } = useChangeLanguageContext();

  // Define translations for English and Dutch
  const translations = {
    en: {
      title: "Our trading approach",
      tradingApproachData: [
        {
          icon: BarChart3,
          title: "Market-neutral trading",
          description: "Our strategy focuses on 0DTE options on the S&P 500 and Nasdaq, allowing us to capitalize on short-term market movements while minimizing overnight exposure. By maintaining a market-neutral approach, we generate returns in both rising and falling markets, ensuring consistent performance regardless of volatility shifts.",
        },
        {
          icon: ShieldCheck,
          title: "Automated risk management",
          description: "Risk is dynamically managed through delta-hedging, which adjusts positions in real-time based on market conditions. Our proprietary algorithms, enhanced by machine learning, analyze volatility and execute trades with precision, ensuring optimal risk-reward balance across all market environments.",
        },
        {
          icon: Monitor,
          title: "Scalability & no overnight risk",
          description: "With deep liquidity and institutional-grade execution, our model can scale seamlessly up to €100 million without performance degradation. By exclusively trading 0DTE options, we eliminate overnight risk, ensuring capital efficiency and reducing exposure to unpredictable after-hours market swings.",
        },
        {
          icon: Search,
          title: "In-house research & development",
          description: "We continuously refine our strategies through rigorous research and real-time market testing. Our in-house development team integrates the latest advancements in quantitative finance, volatility modeling, and machine learning, ensuring our trading systems remain adaptive and resilient in ever-changing market conditions.",
        },
        {
          icon: Laptop,
          title: "Multi-broker integration",
          description: "Our technology seamlessly connects with leading brokers, including Interactive Brokers, TastyTrade, Exante, and Swissquote, providing institutional clients with flexible execution solutions. Through API-based trading, our strategies can be integrated into existing fund structures, ensuring a smooth and efficient trading experience.",
        },
        {
          icon: PieChart,
          title: "Proven performance & risk metrics",
          description: "Backed by real-world execution data, our strategy delivers an average daily return of 0.18% gross (0.12% net) with a win ratio of 1.82 net and 2.41 gross. Our systematic, research-backed approach ensures consistent returns while maintaining strict risk controls.",
        },
      ],
    },
    nl: {
      title: "Waarom Edge Capital?",
      tradingApproachData: [
        {
          icon: BarChart3,
          title: "Marktneutraal handelen",
          description: "Onze strategie richt zich op 0DTE-opties op de S&P 500 en Nasdaq, waarmee we kunnen inspelen op kortetermijnbewegingen in de markt terwijl we blootstelling ‘overnight’ vermijden. Door een marktneutrale aanpak genereren we rendement in zowel stijgende als dalende markten — en blijven we consistent presteren, ongeacht volatiliteitsschommelingen.",
        },
        {
          icon: ShieldCheck,
          title: "Geautomatiseerd risicobeheer",
          description: "Risico’s worden dynamisch beheerd via delta-hedging, waarbij posities in realtime worden aangepast op basis van marktomstandigheden. Onze eigen algoritmes, versterkt met machine learning, analyseren volatiliteit en voeren transacties nauwkeurig uit — voor een optimaal risico-rendementsevenwicht in elke marktomgeving.",
        },
        {
          icon: Monitor,
          title: "Schaalbaarheid & geen overnight-risico",
          description: "Dankzij diepe liquiditeit en institutionele uitvoering kan ons model moeiteloos opschalen tot €100 miljoen zonder prestatieverlies. Door uitsluitend te handelen in 0DTE-opties elimineren we overnight-risico’s, verbeteren we kapitaalefficiëntie en vermijden we onvoorspelbare marktschommelingen buiten handelsuren.",
        },
        {
          icon: Search,
          title: "Intern onderzoek & ontwikkeling",
          description: "Wij verfijnen onze strategieën continu door grondig onderzoek en realtime marktanalyses. Ons interne team ontwikkelt voortdurend met de nieuwste inzichten in kwantitatieve financiering, volatiliteitsmodellering en machine learning — zodat onze systemen robuust blijven in veranderende marktomstandigheden.",
        },
        {
          icon: Laptop,
          title: "Multi-Broker integratie",
          description: "Onze technologie integreert naadloos met toonaangevende brokers zoals Interactive Brokers, TastyTrade, Exante en Swissquote. Via API kunnen onze strategieën worden geïntegreerd in bestaande fondsstructuren — voor een efficiënte, flexibele uitvoering.",
        },
        {
          icon: PieChart,
          title: "Bewezen prestaties & risicometrics",
          description: "Op basis van echte handelsdata laat onze strategie een gemiddelde dagelijkse opbrengst zien van 0,18% bruto (0,12% netto) met een winratio van 1,82 netto en 2,41 bruto. Onze systematische, onderzoeksgerichte aanpak levert consistente rendementen op binnen strikte risicogrensen.",
        },
      ],
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;
  const tradingApproachData = content.tradingApproachData;

  return (
    <div className="bg-[#192227] min-h-screen py-12 px-4 sm:px-6 lg:px-8 rounded-[20px] relative">
      <div className="w-[98%] max-w-[1700px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[26.68px] sm:text-4xl lg:text-[62.09px] font-normal text-left text-white mb-12"
        >
          {content.title}
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradingApproachData.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
            >
              <TradingApproachCard 
                icon={approach.icon}
                title={approach.title}
                description={approach.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingApproachSection;