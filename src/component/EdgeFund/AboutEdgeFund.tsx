import React from "react";
import { motion } from "framer-motion";
import images from "@/constant/images";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const translations = {
  en: {
    about: "About EdgeFund",
    title: "EdgeFund transforms market uncertainty into consistent, stable returns.",
    desc1: "Unlike traditional funds that rely on rising prices, EdgeFund thrives on market uncertainty. Our strategy actively captures the Volatility Risk Premium on the S&P 500, while simultaneously enhancing yield through active Interest Arbitrage strategies.",
    desc2: "By strictly delta-hedging every position, we neutralize price risk completely. We are pragmatic, systematic, and unfailingly committed to capital preservation. This approach makes sophisticated, institutional-level stability accessible to private investors starting from €100,000.",
    requestBrochure: "Request Brochure",
  },
  nl: {
    about: "Over EdgeFund",
    title: "EdgeFund transformeert marktonzekerheid in consistent, stabiel rendement.",
    desc1: "In tegenstelling tot traditionele fondsen die afhankelijk zijn van stijgende prijzen, floreert EdgeFund bij marktonzekerheid. Onze strategie legt actief de Volatility Risk Premium vast op de S&P 500, terwijl we tegelijkertijd het rendement verhogen via actieve Interest Arbitrage-strategieën.",
    desc2: "Door elke positie strikt te delta-hedgen, neutraliseren we het prijsrisico volledig. Wij zijn pragmatisch, systematisch en onvermoeibaar toegewijd aan kapitaalbehoud. Deze aanpak maakt geavanceerde stabiliteit op institutioneel niveau toegankelijk voor particuliere beleggers vanaf €100.000.",
    requestBrochure: "Brochure aanvragen",
  },
};

const AboutEdgeFund = () => {
  const { language } = useChangeLanguageContext();
  const t = translations[language] || translations.en;

  return (
    <section className="relative z-20 w-[100%] rounded-[24px] mx-auto -mt-10 pb-12 bg-[#F6FEFF]">
      <motion.div
        className="w-[98%] max-w-[1700px] mx-auto bg-[#F6FEFF] rounded-[24px] px-[10px] pt-8 pb-[10px] md:p-12 lg:p-16 flex flex-col lg:flex-row gap-16 items-start"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Image Side */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#DCA100]"></div>
            <span className="text-[#00222C] font-semibold text-[clamp(12px,1vw,14px)] uppercase tracking-wider">
              {t.about}
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={images.edgefund.aboutSide}
              alt="EdgeFund Workspace"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[70%] flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[#00222C] font-semibold leading-[1.2] text-[clamp(24px,2.5vw,26px)]">
            {t.title}
          </h2>

          <div className="w-full h-[1px] bg-gray-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <p className="text-[#00222C]/70 leading-relaxed font-normal text-[clamp(15px,1.2vw,18px)]">
              {t.desc1}
            </p>
            <p className="text-[#00222C]/70 leading-relaxed font-normal text-[clamp(15px,1.2vw,18px)]">
              {t.desc2}
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <Link
              to="/requestinfo"
              className="text-[#0E7490] font-semibold flex items-center gap-2 hover:gap-4 transition-all text-[clamp(16px,1.5vw,18px)]"
            >
              {t.requestBrochure}
              <FontAwesomeIcon icon={faChevronRight} className="text-[clamp(14px,1vw,16px)]" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutEdgeFund;