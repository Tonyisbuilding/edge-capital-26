import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

interface CardContentItem {
  tier?: string;
  reward?: string;
  option?: string;
  description?: string;
}

interface Card {
  icon: string;
  title: string;
  content: (string | CardContentItem)[];
}

const HowDoesItWork = () => {
  const { language } = useChangeLanguageContext();

  // Translations
  const translations = {
    en: {
      sectionTitle: "How does it work?",
      subtitle: "Earn Rewards by Introducing New Clients!",
      description: "At Edge Capital, we recognize the power of personal recommendations. That's why we're excited to introduce our new referral program! When you refer new clients to us, you'll receive a cash reward based on the Annual return target (AUM) they bring in, provided they remain clients for at least 3 months.",
      cardTitles: [
        "Earn tiered rewards",
        "Invest in your network",
        "Flexible reward options"
      ],
      tierLabels: [
        "1-3 Referred Clients:",
        "4-6 Referred Clients:",
        "7+ Referred Clients:"
      ],
      rewardValues: [
        "Receive 0.75% of the referred AUM",
        "Receive 1.00% of the referred AUM",
        "Receive 1.25% of the referred AUM"
      ],
      networkContent: [
        "Share Edge Capital with friends, family, and colleagues who could benefit from our exceptional wealth management services.",
        "The more clients you refer, the higher your reward percentage becomes. Our experts will provide each referral with personalized care and attention."
      ],
      rewardOptions: [
        "Choose how you'd like to receive your rewards:",
        "Direct Cash Payment:",
        "Charitable Donation:"
      ],
      optionDescriptions: [
        "Receive funds directly to your bank account",
        "Support one of six partner organizations with your rewards"
      ],
      ctaButton: "Start Referring"
    },
    nl: {
      sectionTitle: "Hoe werkt het?",
      subtitle: "Verdien beloningen door nieuwe klanten voor te stellen!",
      description: "Bij Edge Capital erkennen we de kracht van persoonlijke aanbevelingen. Daarom zijn we verheugd om ons nieuwe verwijzingsprogramma te introduceren! Wanneer u nieuwe klanten naar ons verwijst, ontvangt u een geldelijke beloning op basis van de beheerde activa (AUM) die zij inbrengen, mits zij minimaal 3 maanden klant blijven.",
      cardTitles: [
        "Verdien getrapte beloningen",
        "Investeer in uw netwerk",
        "Flexibele beloningsopties"
      ],
      tierLabels: [
        "1-3 Verwezen klanten:",
        "4-6 Verwezen klanten:",
        "7+ Verwezen klanten:"
      ],
      rewardValues: [
        "Ontvang 0,75% van de verwezen AUM",
        "Ontvang 1,00% van de verwezen AUM",
        "Ontvang +0,55% van de verwezen AUM"
      ],
      networkContent: [
        "Deel Edge Capital met vrienden, familie en collega's die baat kunnen hebben bij onze uitzonderlijke vermogensbeheerservices.",
        "Hoe meer klanten u verwijst, hoe hoger uw beloningspercentage wordt. Onze experts zullen elke verwijzing voorzien van persoonlijke zorg en aandacht."
      ],
      rewardOptions: [
        "Kies hoe u uw beloningen wilt ontvangen:",
        "Directe contante betaling:",
        "Liefdadigheidsgift:"
      ],
      optionDescriptions: [
        "Ontvang geld rechtstreeks op uw bankrekening",
        "Ondersteun een van de zes partnerorganisaties met uw beloningen"
      ],
      ctaButton: "Begin met verwijzen"
    }
  };

  // Get translations based on current language
  const t = translations[language as keyof typeof translations] || translations.en;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    },
  };

  // Card data
  const cards: Card[] = [
    {
      icon: images.edgeConnect.handshake_icon,
      title: t.cardTitles[0],
      content: [
        {
          tier: t.tierLabels[0],
          reward: t.rewardValues[0],
        },
        {
          tier: t.tierLabels[1],
          reward: t.rewardValues[1],
        },
        {
          tier: t.tierLabels[2],
          reward: t.rewardValues[2],
        },
      ],
    },
    {
      icon: images.edgeConnect.network_icon,
      title: t.cardTitles[1],
      content: [
        t.networkContent[0],
        t.networkContent[1],
      ],
    },
    {
      icon: images.edgeConnect.money_icon,
      title: t.cardTitles[2],
      content: [
        t.rewardOptions[0],
        {
          option: t.rewardOptions[1],
          description: t.optionDescriptions[0],
        },
        {
          option: t.rewardOptions[2],
          description: t.optionDescriptions[1],
        },
      ],
    },
  ];

  return (
    <section
      className="py-12 px-4 md:px-8 lg:px-16 w-[98%] max-w-[1700px] mx-auto"
      aria-labelledby="how-it-works-title"
    >
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <div className="space-y-4">
          <motion.h2
            id="how-it-works-title"
            className="text-3xl md:text-4xl font-bold text-gray-900 after:content-[''] after:block after:w-24 after:h-1 after:bg-teal-600 after:mt-2"
            variants={itemVariants}
          >
            {t.sectionTitle}
          </motion.h2>

          <motion.h3
            className="text-xl md:text-2xl font-semibold text-gray-800"
            variants={itemVariants}
          >
            {t.subtitle}
          </motion.h3>

          <motion.p className="text-gray-600 max-w-3xl" variants={itemVariants}>
            {t.description}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-[#F3F4F6] rounded-lg p-6 shadow-sm border
               border-[#E5E7EB] relative lg:h-[70vh] w-auto mx-auto"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                  },
                },
              }}
            >
              <div className="p-3 inline-flex mb-4 border border-[#0000003a] rounded-md">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <img
                    src={card.icon}
                    alt={language === 'nl' ? "Team icoon" : "Team icon"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h4 className="text-xl font-semibold mb-4 text-gray-800">
                {card.title}
              </h4>

              <div className="space-y-3 mb-12">
                {card.content.map((item, i) => (
                  <div key={i}>
                    {typeof item === "string" ? (
                      <p className="text-gray-600">{item}</p>
                    ) : item.tier ? (
                      <div className="space-y-1">
                        <p className="font-medium text-gray-800">{item.tier}</p>
                        <p className="text-gray-600 pl-4">{item.reward}</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-medium text-gray-800">
                          {item.option}
                        </p>
                        <p className="text-gray-600 pl-4">{item.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link to='/requestinfo'>
                <motion.button
                  className="w-[90%] py-3 px-4 bg-[#0E7490] text-white rounded-md font-medium 
                  transition-colors hover:bg-[#0e7490d3] focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-teal-500 absolute bottom-[1rem] lg:w-[87%] hover:cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.ctaButton}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowDoesItWork;