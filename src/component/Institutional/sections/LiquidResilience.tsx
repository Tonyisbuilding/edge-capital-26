import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
    en: {
        heading: "A liquid resilience sleeve.",
        p1: "The platform is structured to sit alongside core equity and rates as a liquid resilience sleeve seeking return drivers that are less dependent on broad equity and interest-rate beta than traditional portfolios.",
        p2: "As a firm, we focus on building systematic systems that are designed to benefit from the market conditions that typically intensify during stress: dislocations, forced positioning, widening spreads, correlation breakdowns, liquidity gaps, and volatility repricing.",
        p3: "In practice, this is implemented through a research-to-execution stack spanning market-neutral strategies, mean reversion models and multiple forms of arbitrage, across highly liquid markets. The aim is simple: returns driven by relative mispricings, not directional market views, to deliver more consistent outcomes for our investors.",
    },
    nl: {
        heading: "Een liquide veerkrachtportefeuille.",
        p1: "Het platform is ontworpen om naast kern-aandelen en vastrentende waarden te functioneren als een liquide veerkrachtportefeuille, gericht op rendementsbronnen die minder afhankelijk zijn van brede aandelen- en rentebèta dan traditionele portefeuilles.",
        p2: "Als bedrijf richten wij ons op het bouwen van systematische systemen die zijn ontworpen om te profiteren van marktomstandigheden die doorgaans intensiveren tijdens stress: dislocaties, gedwongen positionering, verruimende spreads, correlatie-afbraak, liquiditeitstekorten en volatiliteitsherprijzing.",
        p3: "In de praktijk wordt dit geïmplementeerd via een research-to-execution stack die marktneutrale strategieën, mean-reversion modellen en meerdere vormen van arbitrage omvat, over zeer liquide markten. Het doel is eenvoudig: rendementen gedreven door relatieve misprijzingen, niet door directionele marktvisies, om consistentere resultaten te leveren voor onze investeerders.",
    },
};

export function LiquidResilience() {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    return (
        <section className="bg-[#050A0C] py-20 md:py-28 px-[10px] md:px-8">
            <div className="w-[98%] max-w-[1700px] mx-auto">
                {/* Heading — centered, large */}
                <h2
                    className="text-white font-bold text-center leading-[1.05] mb-12 md:mb-16"
                    style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                >
                    {t.heading}
                </h2>

                {/* Body text — right-aligned block */}
                <div className="max-w-[800px] ml-auto lg:mr-[5%] xl:mr-[10%] space-y-6">
                    <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed">
                        {t.p1}
                    </p>
                    <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed">
                        {t.p2}
                    </p>
                    <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed">
                        {t.p3}
                    </p>
                </div>
            </div>
        </section>
    );
}
