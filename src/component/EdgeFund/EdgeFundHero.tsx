import React from "react";
import images from "@/constant/images";
import NavBar from "@/common/NavBar";
import { motion } from "framer-motion";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const EdgeFundHero = () => {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            text: "EdgeFund delivers market-neutral returns via a 'dual-engine' strategy on the S&P 500. We combine volatility premiums and interest rate arbitrage to generate consistent returns in every market direction.",
            participate: "Participate",
            scroll: "Scroll to learn more",
        },
        nl: {
            text: "EdgeFund levert marktneutraal rendement via een ‘dual–engine’ strategie op de S&P 500. Wij combineren volatiliteitspremies en rente–arbitrage om consistent rendement te genereren in elke marktrichting.",
            participate: "Deelnemen",
            scroll: "Scroll to learn more",
        },
    };

    const t = translations[language] || translations.en;

    return (
        <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${images.edgefund.edgefundHero})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: "rgba(34, 107, 125, 0.45)",
                        backdropFilter: "blur(2px)",
                        WebkitBackdropFilter: "blur(2px)",
                    }}
                ></div>
            </div>

            {/* Navbar Wrapper */}
            <div className="relative z-50">
                <NavBar />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 w-[65%] max-w-[1000px] mx-auto pb-20">
                <div className="flex-none transition-transform duration-500 translate-y-[10vh]">
                    <motion.h1
                        className="text-white font-bold leading-[1.4] md:leading-[1.6] mb-8 text-[clamp(18px,3vw,22px)]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {t.text}
                    </motion.h1>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <button className="bg-[#EEFDFF] text-[#004352] px-8 md:px-12 py-3 md:py-4 rounded-full font-medium text-base md:text-lg flex items-center gap-3 hover:bg-white transition-all">
                            {t.participate}
                            <FontAwesomeIcon icon={faChevronRight} className="text-[12px]" />
                        </button>

                        <button className="bg-white/20 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-medium text-base md:text-lg flex items-center gap-3 hover:bg-white/30 backdrop-blur-md transition-all border border-white/30">
                            {t.scroll}
                            <FontAwesomeIcon icon={faArrowDown} className="text-[14px]" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EdgeFundHero;
