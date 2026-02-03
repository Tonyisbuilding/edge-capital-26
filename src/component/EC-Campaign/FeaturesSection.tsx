import React from 'react';
import ScaleIcon from "@/assets/icons/scale.svg"; // Updated to .svg
import BadgeIcon from "@/assets/icons/badge.svg";
import PersonIcon from "@/assets/icons/person.svg"; // Updated to person.svg
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const FeaturesSection = () => {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            afmTitle: "AFM registered",
            afmDesc: "In accordance with the AIFMD registration regime",
            trackRecordTitle: "Proven track record",
            trackRecordDesc: "A steady, verified return since 2021.",
            personalContactTitle: "Personal contact",
            personalContactDesc: "No AI customer service, a personal advisor who is always there for you"
        },
        nl: {
            afmTitle: "AFM geregistreerd",
            afmDesc: "Conform het AIFMD-registratieregime",
            trackRecordTitle: "Bewezen track record",
            trackRecordDesc: "Een stabiel, geverifieerd rendement sinds 2021.",
            personalContactTitle: "Persoonlijk contact",
            personalContactDesc: "Geen AI-klantenservice, maar een persoonlijke adviseur die altijd voor u klaarstaat"
        }
    };

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key];
    };

    const features = [
        {
            icon: ScaleIcon,
            title: t("afmTitle"),
            description: t("afmDesc")
        },
        {
            icon: BadgeIcon,
            title: t("trackRecordTitle"),
            description: t("trackRecordDesc")
        },
        {
            icon: PersonIcon, // Updated icon
            title: t("personalContactTitle"),
            description: t("personalContactDesc")
        }
    ];

    return (
        <div className="ec-features-section">
            <div className="ec-features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="ec-feature-item">
                        <div className="ec-feature-icon-box">
                            <img src={feature.icon} alt={feature.title} />
                        </div>
                        <div className="ec-feature-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesSection;
