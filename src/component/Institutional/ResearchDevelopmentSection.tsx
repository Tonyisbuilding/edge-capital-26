import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const ResearchDevelopmentSection = () => {
  const { language } = useChangeLanguageContext();

  // Define translations for English and Dutch
  const translations = {
    en: {
      title: "Research & development – The engine behind our success",
      sections: [
        {
          title: "In-House research for continuous adaptation",
          content: "Thorough research forms the basis for a successful and sustainable trading strategy. We continuously expand our platform based on input from our research department.",
        },
        {
          title: "Machine learning integration",
          content: "We adapt to new technologies, such as implementing machine learning to enhance our trading parameters and improve prediction accuracy.",
        },
        {
          title: "Proprietary trading engine",
          content: "We've developed hedgers that can operate on multiple exchanges, providing unparalleled flexibility and efficiency.",
        },
      ],
      contactUs: "Contact Us",
      imageAlt: "Research team analyzing market data",
    },
    nl: {
      title: "Research & Development – De motor achter ons succes",
      sections: [
        {
          title: "Intern onderzoek voor continue aanpassing",
          content: "Grondig onderzoek vormt de basis voor een succesvolle en duurzame handelsstrategie. Wij breiden ons platform continu uit op basis van input uit ons onderzoeksteam.",
        },
        {
          title: "Machine learning integratie",
          content: "Wij passen ons aan nieuwe technologieën aan, zoals machine learning, om handelsparameters te verbeteren en nauwkeuriger te voorspellen.",
        },
        {
          title: "Eigen handelsengine",
          content: "We hebben hedgers ontwikkeld die op meerdere beurzen kunnen opereren — met ongeëvenaarde flexibiliteit en efficiëntie.",
        },
      ],
      contactUs: "Neem Contact op",
      imageAlt: "Onderzoeksteam dat marktgegevens analyseert",
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-[#EEF4F5C2] lg:p-[58px]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Text content column */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2
              className="text-2xl md:text-[32px] font-bold text-gray-800"
              variants={itemVariants}
            >
              {content.title}
            </motion.h2>

            {/* <motion.p
              className="text-gray-700 mb-8 leading-relaxed md:text-[0.9rem]"
              variants={itemVariants}
            >
              {content.description}
            </motion.p> */}

            <motion.div className="space-y-2" variants={containerVariants}>
              {/* Section 1 */}
              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 flex items-center justify-center text-blue-500">
                  <img
                    src={images.institution.researchIcon}
                    alt={content.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-0">
                    {content.sections[0].title}
                  </h3>
                  <p className="text-gray-600 md:text-[0.9rem]">
                    {content.sections[0].content}
                  </p>
                </div>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 flex items-center justify-center text-blue-500">
                  <img
                    src={images.institution.MLIcon}
                    alt={content.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-0">
                    {content.sections[1].title}
                  </h3>
                  <p className="text-gray-600 md:text-[0.9rem]">
                    {content.sections[1].content}
                  </p>
                </div>
              </motion.div>

              {/* Section 3 */}
              <motion.div
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 flex items-center justify-center text-blue-500">
                  <img
                    src={images.institution.tradingEngineIcon}
                    alt={content.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-0">
                    {content.sections[2].title}
                  </h3>
                  <p className="text-gray-600 md:text-[0.9rem]">
                    {content.sections[2].content}
                  </p>
                </div>
              </motion.div>
            </motion.div>
            <Link to="/contact">
              <motion.div className="mt-8" variants={itemVariants}>
                <button className="bg-[#192227] hover:bg-gray-700 text-white py-2 px-6 rounded-4xl transition duration-300 hover:cursor-pointer">
                  {content.contactUs}
                </button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Image column */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative h-full min-h-[100px] md:min-h-[400px] bg-gray-100 overflow-hidden">
              <img
                src={images.institution.researchdevelopment}
                alt={content.imageAlt}
                className="w-full md:h-[95%] object-cover rounded-md"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResearchDevelopmentSection;