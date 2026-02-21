import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeCapitalHero = () => {
  const [headingInView, setHeadingInView] = useState(false);
  const [buttonInView, setButtonInView] = useState(false);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const { language } = useChangeLanguageContext();

  // Translation dictionary
  const translations = {
    en: {
      heading: "Our name is more than just a nod to 'hedge funds.' 'Edge' represents the advantage we provide Our clients—staying ahead with strategies based on market facts rather than predictions.",
      subheading: "Our strategies are built on arbitrage methods and market-neutral investing, giving us an edge over traditional wealth management products.",
      getInTouch: "Get in Touch",
      altText: "Edge Capital Team"
    },
    nl: {
      heading: "Onze naam is meer dan slechts een knipoog naar ‘hedge funds’. ‘Edge’ staat voor het voordeel dat we onze cliënten bieden. Vooroplopen met strategieën gebaseerd op marktfeiten in plaats van voorspellingen.",
      subheading: "Onze strategieën zijn gebaseerd op arbitragemethoden en marktonafhankelijke beleggingen, wat ons een voordeel geeft ten opzichte van traditionele vermogensbeheerproducten.",
      getInTouch: "Neem Contact op",
      altText: "Edge Capital Team"
    }
  };

  // Get translation based on current language
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  useEffect(() => {
    // Custom intersection observer implementation
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHeadingInView(true);
          headingObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const buttonObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setButtonInView(true);
          buttonObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    if (buttonRef.current) {
      buttonObserver.observe(buttonRef.current);
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current);
      }
      if (buttonRef.current) {
        buttonObserver.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <div className="w-[98%] max-w-[1700px] mx-auto px-[10px] sm:px-6 lg:px-8 py-12 md:py-16 mt-[6rem] pt-[54px] sm:pt-0">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-[clamp(1.1rem,2vw,2.25rem)] font-bold text-gray-900 leading-tight">
              {t("heading")}
            </h1>

            <p className="text-lg text-gray-600">
              {t("subheading")}
            </p>
          </motion.div>

          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              buttonInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
<button className="mt-4 px-6 py-3 bg-[#206A7C] text-white font-medium rounded-full 
shadow-[0_4px_10px_rgba(32,106,124,0.3)] hover:shadow-[0_8px_20px_rgba(32,106,124,0.45)] 
hover:bg-[#206A7C] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 
transition-all duration-300">
              <Link to="/contact" className="block ">
                {t("getInTouch")}
              </Link>
            </button>
          </motion.div>
        </div>

        <div className="lg:w-1/2">
          <motion.div className="rounded-lg overflow-hidden shadow-lg">
            <motion.img
              initial={{
                right: "-100",
              }}
              whileInView={{
                left: "0",
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut",
              }}
              src={images.about.herosectionforabout}
              alt={t("altText")}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EdgeCapitalHero;