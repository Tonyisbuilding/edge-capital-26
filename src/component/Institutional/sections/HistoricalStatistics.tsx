import { motion } from "framer-motion";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import BtnCArrow from "@/assets/icons/btn-c-arrow.svg";

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

export function HistoricalStatistics() {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    const stats = [
        {
            label:
                language === "nl" ? (
                    <>
                        Jaarlijks netto
                        <br />
                        rendementsdoel
                    </>
                ) : (
                    <>
                        Annual net
                        <br />
                        return target
                    </>
                ),
            value: "20%",
        },
        {
            label:
                language === "nl" ? (
                    <>
                        Totaal cumulatief
                        <br />
                        resultaat
                    </>
                ) : (
                    <>
                        Total cumulative
                        <br />
                        result
                    </>
                ),
            value: "143.11%",
        },
        {
            label:
                language === "nl" ? (
                    <>
                        Maandelijks netto
                        <br />
                        rendementsdoel
                    </>
                ) : (
                    <>
                        Monthly net
                        <br />
                        return target
                    </>
                ),
            value: "1.66%",
        },
        {
            label: language === "nl" ? "Beste maand" : "Best month",
            value: "8.15%",
        },
    ];

    return (
        <section className="relative z-10 bg-[#050A0C] py-20 px-[10px] md:px-8 border-b border-institutional-charcoal/30">
            <div className="w-[98%] max-w-[1700px] mx-auto">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                    <div>
                        <span className="block font-mono tracking-[0.2em] uppercase text-[#5A8A8F] mb-2"
                            style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                        >
                            Performance
                        </span>
                        <h2
                            className="font-mono font-bold text-white leading-tight"
                            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)" }}
                        >
                            Historical Statistics
                        </h2>
                    </div>
                    <button
                        onClick={() => {
                            const el = document.getElementById("institutional-monthly-performance");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 bg-[#1A3A42] hover:bg-[#24505B] text-white font-mono text-sm tracking-wide px-6 py-3 rounded-full transition-colors cursor-pointer self-start md:self-auto"
                    >
                        Performance
                        <img src={BtnCArrow} alt="" className="w-4 h-4" />
                    </button>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
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
                                    background:
                                        "linear-gradient(to bottom, transparent 0%, #FCFFFF 29%, #49ACC7 48%, #FCFFFF 67%, transparent 100%)",
                                }}
                            />

                            <h4 className="text-white text-[12px] md:text-[16px] font-medium leading-tight mb-8 md:mb-12 opacity-80 max-w-[220px]">
                                {stat.label}
                            </h4>
                            <span
                                className="text-[32px] md:text-[50px] lg:text-[42px] font-semibold leading-none tracking-tight bg-clip-text text-transparent"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, #F4FFFF 0%, #6C898F 100%)",
                                    display: "inline-block",
                                }}
                            >
                                {stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
