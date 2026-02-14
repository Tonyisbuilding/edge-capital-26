import React from "react";
import { motion } from "framer-motion";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
    en: {
        annualTarget: "Annual net return target",
        totalCumulative: "Total cumulative result",
        monthlyTarget: "Monthly net return target",
        bestMonth: "Best month",
    },
    nl: {
        annualTarget: "Jaarlijks netto rendementsdoel",
        totalCumulative: "Totaal cumulatief resultaat",
        monthlyTarget: "Maandelijks netto rendementsdoel",
        bestMonth: "Beste maand",
    },
};

const CorrelationArbitrageFundStats = () => {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    const stats = [
        { label: language === 'nl' ? <>Gemiddeld jaarlijkse<br />netto rendement</> : <>Average net<br />return</>, value: "~12,5%" },
        { label: language === 'nl' ? <>Totaal cumulatief resultaat<br />(Participatieklasse I)</> : <>Total Cumulative Return<br />(Share Class I)</>, value: "94.02%" },
        { label: language === 'nl' ? <>Maximale drawdown<br />(na upgrade 2022)</> : <>Maximum drawdown<br />(after the 2022 upgrade)</>, value: "~1,7%" },
        { label: language === 'nl' ? "Geen enkel verliesjaar sinds" : "No losing years since", value: "\u20602020" },
    ];

    return (
        <section className="relative z-10 bg-[#005569] pt-40 pb-20 -mt-32 px-[10px] md:px-8">
            <div className="w-[98%] max-w-[1700px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col justify-between pl-6 lg:pl-10 relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        {/* Gradient Border/Divider */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-[1px]"
                            style={{
                                background: "linear-gradient(to bottom, transparent 0%, #FCFFFF 29%, #49ACC7 48%, #FCFFFF 67%, transparent 100%)"
                            }}
                        />

                        <h4 className="text-white text-[12px] md:text-[16px] font-medium leading-tight mb-8 md:mb-12 opacity-80 max-w-[220px]">
                            {stat.label}
                        </h4>
                        <span
                            className="text-[32px] md:text-[50px] lg:text-[42px] font-semibold leading-none tracking-tight bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(to right, #F4FFFF 0%, #6C898F 100%)",
                                display: 'inline-block'
                            }}
                        >
                            {stat.value}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CorrelationArbitrageFundStats;
