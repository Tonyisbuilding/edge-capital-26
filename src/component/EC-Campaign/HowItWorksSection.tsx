import React from 'react';
import HowItWorksBg from "@/assets/images/EC-campaign/how-it-works.jpg";
import ArrowIllustration from "@/assets/images/EC-campaign/hiw-arrow.svg"; // Note: User said hiw-arrow.svg
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const HowItWorksSection = () => {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            badge: "This is how it works",
            headline: "Reach your investment goals in three easy steps",
            step1Title: "Introduction",
            step1Desc: "We start with a no-obligation consultation to discuss your situation, goals and wishes.",
            step2Title: "Personal advice", // Keeping as Introduction per screenshot/request, or maybe "Analysis"? Will stick to screenshot fidelity or generic for now
            step2Desc: "Our adviser will discuss which investment fund best matches your goals and risk appetite.",
            step3Title: "Start investing",
            step3Desc: "After your approval, we start the investment and keep you proactively informed about the progress."
        },
        nl: {
            badge: "Zo werkt het",
            headline: "Bereik uw beleggingsdoelen in drie eenvoudige stappen",
            step1Title: "Introductie",
            step1Desc: "We beginnen met een vrijblijvend gesprek om uw situatie, doelen en wensen te bespreken.",
            step2Title: "Persoonlijk advies",
            step2Desc: "Onze adviseur bespreekt met u welk beleggingsfonds het beste aansluit bij uw doelen en risicobereidheid.",
            step3Title: "Investering Starten",
            step3Desc: "Na uw goedkeuring starten we de investering en blijven we u proactief informeren over de voortgang."
        }
    };

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key];
    };

    const steps = [
        {
            number: "01.",
            title: t("step1Title"),
            desc: t("step1Desc")
        },
        {
            number: "02.",
            title: t("step2Title"),
            desc: t("step2Desc")
        },
        {
            number: "03.",
            title: t("step3Title"),
            desc: t("step3Desc")
        }
    ];

    return (
        <div className="ec-how-it-works-section" style={{ backgroundImage: `url('${HowItWorksBg}')` }}>
            <div className="ec-hiw-overlay"></div>
            <div className="ec-hiw-content">
                <div className="ec-hiw-header">
                    <span className="ec-hiw-badge">{t("badge")}</span>
                    <h2>{t("headline")}</h2>
                </div>

                <div className="ec-hiw-steps-container">

                    {steps.map((step, index) => (
                        <div key={index} className="ec-hiw-card">
                            {/* Clipped Arrow Segment */}
                            <img
                                src={ArrowIllustration}
                                alt=""
                                className="ec-hiw-arrow-clipped"
                                style={{
                                    left: `calc(-${index} * (100% + 30px))`
                                }}
                            />

                            <span className="ec-hiw-number">{step.number}</span>
                            <div className="ec-hiw-card-content">
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
