import React from 'react';
import { motion } from 'framer-motion';
import { charities, charitiesDutch } from "@/constant/data";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const OurCharities = () => {
  
  const { language } = useChangeLanguageContext();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Translation text based on language
  const translations = {
    en: {
      title: 'Our charities',
      description: 'Our employees have thoughtfully chosen the six charities we support as part of the Edge Connect rewards system'
    },
    nl: {
      title: 'Onze goede doelen',
      description: 'Onze medewerkers hebben de zes goede doelen die we ondersteunen zorgvuldig gekozen als onderdeel van het Edge Connect beloningssysteem'
    }
  };

  // Choose text based on current language
  const text = translations[language] || translations.en;
  const renderedData = language === 'nl' ? charitiesDutch : charities;

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-100 relative">
      {/* Dotted background pattern */}
      {/* <div className="absolute inset-0 grid grid-cols-16 md:grid-cols-24 lg:grid-cols-32 grid-rows-12 pointer-events-none">
        {Array.from({ length: 384 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-teal-300 opacity-30"></div>
          </div>
        ))}
      </div> */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{text.title}</h2>
          <div className="w-20 h-1 bg-yellow-400 mb-4"></div>
          <p className="text-lg text-gray-700 max-w-3xl">
            {text.description}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {renderedData.map((charity, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden py-[2rem] lg:h-[24.5rem]"
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="h-20 flex items-center justify-center mb-[25%]">
                  <img 
                    src={charity.image} 
                    alt={charity.organization}
                    className="h-30 object-contain"
                  />
                </div>
                <div className="text-gray-500 text-sm mb-1 md:text-[16px]">{charity.name}</div>
                <div className={`font-bold mb-2 ${charity.organizationColor} md:text-[14px] mb-5`}>
                  {charity.organization}
                </div>
                <p className="text-gray-800 md:text-[22px]">
                  {language === 'nl' && charity.descriptionNL ? charity.descriptionNL : charity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurCharities;