import React from 'react';
import { motion } from 'framer-motion';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const WhyWorkWithUs = () => {
  const { language } = useChangeLanguageContext();

  // Define translations for English and Dutch
  const translations = {
    en: {
      title: "Why work with us?",
      cards: [
        {
          id: 1,
          icon: "rocket",
          iconColor: "text-teal-600",
          title: "Driven to perform",
          description:
            "We are relentless in our pursuit of exceptional investment strategies. Our approach combines rigorous research, innovative quantitative methods, and a commitment to delivering superior returns for Our clients.",
        },
        {
          id: 2,
          icon: "globe",
          iconColor: "text-teal-600",
          title: "Deep market insights",
          description:
            "We leverage deep market understanding and cutting-edge financial technology to identify unique investment opportunities across global markets, staying ahead of economic trends and market dynamics.",
        },
        {
          id: 3,
          icon: "users",
          iconColor: "text-teal-600",
          title: "Excellence through collaboration",
          description:
            "Our success is built on a collaborative culture that brings together top talent from finance, economics, data science, and technology to drive collective innovation and strategic thinking.",
        },
        {
          id: 4,
          icon: "target",
          iconColor: "text-teal-600",
          title: "Precision in Risk management",
          description:
            "We excel in sophisticated risk assessment and management, applying advanced quantitative models and strategic insights to protect and optimize our investors' capital.",
        },
        {
          id: 5,
          icon: "zap",
          iconColor: "text-teal-600",
          title: "Continuous innovation",
          description:
            "We are committed to continuous learning and innovation, constantly evolving our investment strategies, leveraging emerging technologies, and adapting to the dynamic global financial landscape.",
        },
      ],
    },
    nl: {
      title: "Waarom met ons werken?",
      cards: [
        {
          id: 1,
          icon: "rocket",
          iconColor: "text-teal-600",
          title: "Gedreven om te presteren",
          description:
            "Bij Edge Capital streven we onwrikbaar naar uitmuntende beleggingsresultaten. Door diepgaand onderzoek, geavanceerde kwantitatieve technieken en een focus op rendement, creëren we strategieën die het verschil maken voor onze cliënten.",
        },
        {
          id: 2,
          icon: "globe",
          iconColor: "text-teal-600",
          title: "Diepgaande marktinzichten",
          description:
            "Wij koppelen scherpe economische analyses aan innovatieve technologie om unieke investeringskansen wereldwijd te signaleren. Zo anticiperen we op marktbewegingen en blijven we vooroplopen in een constant veranderende wereld.",
        },
        {
          id: 3,
          icon: "users",
          iconColor: "text-teal-600",
          title: "Excelleren door samenwerking",
          description:
            "Onze kracht ligt in samenwerking. Experts uit financiën, economie, datawetenschap en technologie brengen hun kennis samen in een cultuur van gedeeld succes en grensverleggend denken.",
        },
        {
          id: 4,
          icon: "target",
          iconColor: "text-teal-600",
          title: "Precisie & risicobeheer",
          description:
            "Met strategisch inzicht en geavanceerde kwantitatieve modellen beheren we risico’s met uitzonderlijke precisie. Zo beschermen én optimaliseren we het kapitaal van onze investeerders.",
        },
        {
          id: 5,
          icon: "zap",
          iconColor: "text-teal-600",
          title: "Voortdurende innovatie",
          description:
            "We geloven in permanente ontwikkeling. Door nieuwe technologieën te omarmen en flexibel te blijven in een dynamisch financieel landschap, blijven onze strategieën relevant en vooruitstrevend.",
        },
      ],
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;
  const cards = content.cards;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Icon components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        );
      case "globe":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        );
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "target":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      case "zap":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      className="py-16 px-4 md:px-6 bg-[##EEF4F5]"
      aria-labelledby="why-work-with-us"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          id="why-work-with-us"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* First row - 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {cards.slice(0, 2).map((card) => (
              <motion.div
                key={card.id}
                className="bg-gray-50 p-6 rounded-lg text-black shadow-lg shadow-[rgba(32,106,124, 0.25)]"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">
                  <div className={`${card.iconColor}`}>
                    {renderIcon(card.icon)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Second row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.slice(2).map((card) => (
              <motion.div
                key={card.id}
                className="bg-gray-50 p-6 rounded-lg text-black shadow-lg shadow-[rgba(32,106,124, 0.25)]"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">
                  <div className={`${card.iconColor}`}>
                    {renderIcon(card.icon)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;