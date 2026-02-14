import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const InstitutionalInvestmentSolutions = () => {
  const { language } = useChangeLanguageContext();

  // Define translations for English and Dutch
  const translations = {
    en: {
      title: "Institutional investment solutions",
      cards: [
        {
          title: "Direct fund participation",
          content: [
            "Funds with a fund-of-funds structure can easily and directly participate in our fund. This enables you to fully leverage our market-neutral strategy.",
            "Designed for institutional clients with investments starting from €500,000.",
            "Management Fee: 1% per year",
            "Performance Fee: 12.5% per month (high watermark)",
          ],
        },
        {
          title: "API-based SaaS solutions",
          content: [
            "For funds without a fund-of-funds structure, we offer tailor-made solutions, allowing you to participate for your own account via an API.",
            "This is done through a SaaS agreement (Software as a Service), giving you the flexibility to integrate our strategies within your own fund environment.",
            "Customized fee structure based on requirements",
          ],
        },
        {
          title: "Performance-based fee structure",
          content: [
            "Our fee structure is designed to align our interests with yours. We only succeed when you succeed.",
            "This ensures we remain focused on delivering consistent performance rather than simply accumulating Annual return target.",
            "Reduced fees for larger allocations",
          ],
        },
      ],
      imageAlt: "Research team analyzing market data",
    },
    nl: {
      title: "Institutionele beleggingsoplossingen",
      cards: [
        {
          title: "Directe fondsdeelname",
          content: [
            "Fondsen met een fund-of-funds-structuur kunnen eenvoudig en rechtstreeks deelnemen aan ons fonds. Hiermee kunt u optimaal profiteren van onze marktneutrale strategie.",
            "Ontworpen voor institutionele cliënten met investeringen vanaf €500.000.",
            "Beheervergoeding: 1% per jaar",
            "Prestatievergoeding: 12,5% per maand (high watermark)",
          ],
        },
        {
          title: "API-gebaseerde SaaS-oplossingen",
          content: [
            "Voor fondsen zonder fund-of-funds-structuur bieden wij maatwerkoplossingen, waarmee u via een API op eigen rekening kunt deelnemen.",
            "Dit gebeurt via een SaaS-overeenkomst (Software as a Service), die u de flexibiliteit biedt om onze strategieën te integreren binnen uw eigen fondsstructuur.",
            "Vergoedingsstructuur aangepast aan uw wensen",
          ],
        },
        {
          title: "Prestatiegerichte vergoedingsstructuur",
          content: [
            "Onze vergoedingsstructuur is ontworpen om onze belangen op één lijn te brengen met die van u. Wij slagen pas als u dat ook doet.",
            "Dit zorgt ervoor dat we gefocust blijven op consistente prestaties, in plaats van simpelweg activa onder beheer op te bouwen.",
            "Verlaagde vergoedingen bij grotere allocaties",
          ],
        },
      ],
      imageAlt: "Onderzoeksteam dat marktgegevens analyseert",
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;

  // Animation variants for staggered card animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-[98%] max-w-[1700px] mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-800">
        {content.title}
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card 1: Direct fund participation */}
        <motion.div
          className="bg-[#DDE6E9] rounded-lg p-6 shadow-sm"
          variants={cardVariants}
          aria-labelledby="direct-fund-title"
        >
          <div className="flex justify-start mb-4">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src={images.institution.directFundIcon}
                alt={content.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3
            id="direct-fund-title"
            className="text-xl font-bold mb-3 text-gray-800"
          >
            {content.cards[0].title}
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>{content.cards[0].content[0]}</p>
            <p>{content.cards[0].content[1]}</p>
            <p>{content.cards[0].content[2]}</p>
            <p>{content.cards[0].content[3]}</p>
          </div>
        </motion.div>

        {/* Card 2: API-based SaaS solutions */}
        <motion.div
          className="bg-[#DDE6E9] rounded-lg p-6 shadow-sm"
          variants={cardVariants}
          aria-labelledby="api-saas-title"
        >
          <div className="flex justify-start mb-4">
            <div className="flex-shrink-0 flex items-center justify-center text-blue-500">
              <img
                src={images.institution.apiIcon}
                alt={content.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3
            id="api-saas-title"
            className="text-xl font-bold mb-3 text-gray-800"
          >
            {content.cards[1].title}
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>{content.cards[1].content[0]}</p>
            <p>{content.cards[1].content[1]}</p>
            <p>{content.cards[1].content[2]}</p>
          </div>
        </motion.div>

        {/* Card 3: Performance-based fee structure */}
        <motion.div
          className="bg-[#DDE6E9] rounded-lg p-6 shadow-sm"
          variants={cardVariants}
          aria-labelledby="performance-fee-title"
        >
          <div className="flex justify-start mb-4">
            <div className="flex-shrink-0 flex items-center justify-center text-blue-500">
              <img
                src={images.institution.performance_basedIcon}
                alt={content.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3
            id="performance-fee-title"
            className="text-xl font-bold mb-3 text-gray-800"
          >
            {content.cards[2].title}
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>{content.cards[2].content[0]}</p>
            <p>{content.cards[2].content[1]}</p>
            <p>{content.cards[2].content[2]}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InstitutionalInvestmentSolutions;