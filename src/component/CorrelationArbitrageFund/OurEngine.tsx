import React from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images";

const OurEngine: React.FC = () => {
    const { language } = useChangeLanguageContext();

    const statsCopy = {
        en: [
            {
                title: "Performance profile",
                description:
                    "The combination of moderate volatility and an average return of over 12.5% per year makes EdgeNext stand out within the hedge fund landscape.",
                image: images.landingPage.PerformanceProfile,
            },
            {
                title: "Market-independent alpha",
                description:
                    "The strategy extracts returns from structural inefficiencies completely decoupled from equity, credit, or rate direction.",
                image: images.landingPage.MarketIndependentAlpha,
            },
            {
                title: "Pure data discipline",
                description:
                    "No trend following. No predictions. Just data-driven decisions that keep the fund resilient through crisis scenarios.",
                image: images.landingPage.PureDataDiscipline,
            },
        ],
        nl: [
            {
                title: "Performance profiel",
                description:
                    "De combinatie van gematigde volatiliteit en een gemiddeld rendement van ruim 12,5% per jaar maakt EdgeNext uniek in het hedgefund-landschap.",
                image: images.landingPage.PerformanceProfileDutch,
            },
            {
                title: "Marktonafhankelijke alpha",
                description:
                    "De strategie haalt rendement uit structurele inefficiënties volledig losgekoppeld van bewegingen in aandelen, rente of kredietmarkten.",
                image: images.landingPage.MarketIndependentAlphaDutch,
            },
            {
                title: "Pure datadiscipline",
                description:
                    "Geen trend following. Geen voorspellingen. Alleen datagedreven beslissingen die het fonds ook in crisisscenario's veerkrachtig houden.",
                image: images.landingPage.PureDataDisciplineDutch,
            },
        ],
    } as const;

    return (
        <section className="py-10 md:py-12">
            <div className="w-[98%] max-w-[1700px] mx-auto px-[10px] md:px-8">
                <div className="flex flex-col items-center text-center mb-8 md:mb-10">
                    <div className="relative mb-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#00222C]">
                            {language === 'nl' ? 'Een Engine voor Onafhankelijke Returns' : 'An Engine for Independent Returns'}
                        </h2>
                        <img
                            src={images.landingPage.Brush}
                            alt=""
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[200px] h-[8px]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {statsCopy[language].map((item) => (
                        <div className="flex flex-col items-start px-3" key={item.title}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover mb-3"
                            />
                            <h3 className="text-[1.1rem] font-bold text-[#00464b]">
                                {item.title}
                            </h3>
                            <p className="text-[0.95rem] leading-relaxed text-[#1a1a1a] mt-1">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurEngine;
