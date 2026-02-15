import { NAVReturnChart } from "@/component/Institutional/charts/NAVReturnChart";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
    en: {
        performance: "Performance",
        navTitle: "Net Asset Value Total Return (%)",
    },
    nl: {
        performance: "Prestaties",
        navTitle: "Netto Vermogenswaarde Totaalrendement (%)",
    },
};

export function NAVPerformance() {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    return (
        <div className="relative z-10 bg-[#050A0C] border-y border-institutional-charcoal/30">
            <div className="w-[98%] max-w-[1700px] mx-auto py-16 md:py-24 px-[10px] md:px-8">
                {/* Header */}
                <div className="mb-10">
                    <span className="text-sm font-mono uppercase tracking-widest text-institutional-slate/60 mb-2 block">
                        {t.performance}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-institutional-white">
                        {t.navTitle}
                    </h2>
                </div>

                {/* Chart */}
                <NAVReturnChart />
            </div>
        </div>
    );
}
