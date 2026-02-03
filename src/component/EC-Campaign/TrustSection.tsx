import React from 'react';
import BadgeIcon from "@/assets/icons/badge.svg";
import TargetIcon from "@/assets/icons/target.svg"; // Imported target icon
import PeopleIcon from "@/assets/icons/people.svg";
import BusinessGrowthIcon from "@/assets/icons/business-growth.svg";

// Brand Logos
import IEXLogo from "@/assets/images/EC-campaign/IEX.svg";
import BusinessClassLogo from "@/assets/images/EC-campaign/biz-class.svg";
import RTLZLogo from "@/assets/images/EC-campaign/rtlz.svg";
import IEXBeleggersdagLogo from "@/assets/images/EC-campaign/IEX-b.svg";
import BVBBLogo from "@/assets/images/EC-campaign/BVBB.svg";

import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const TrustSection = () => {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            yearsExperience: "Years of experience",
            aum: "Annual return target",
            satisfiedCustomers: "satisfied clients",
            averageReturn: "Average annual return",
            knownFrom: "Known from:"
        },
        nl: {
            yearsExperience: "Jaren ervaring",
            aum: "jaarlijks rendementsdoel",
            satisfiedCustomers: "Tevreden klanten",
            averageReturn: "gemiddeld jaar rendement",
            knownFrom: "Bekend van:"
        }
    };

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key];
    };

    const stats = [
        {
            icon: BadgeIcon,
            value: "30+",
            label: t("yearsExperience")
        },
        {
            icon: TargetIcon, // Replaced MoneyIcon
            value: "20%",
            label: t("aum")
        },
        {
            icon: PeopleIcon,
            value: "150+",
            label: t("satisfiedCustomers")
        },
        {
            icon: BusinessGrowthIcon,
            value: "22.62%",
            label: t("averageReturn")
        }
    ];

    const partners = [
        { img: IEXLogo, alt: "IEX" },
        { img: BusinessClassLogo, alt: "Business Class" },
        { img: RTLZLogo, alt: "RTL Z" },
        { img: IEXBeleggersdagLogo, alt: "IEX Beleggersdag" },
        { img: BVBBLogo, alt: "Beurs Van Berlage" }
    ];

    return (
        <div className="ec-trust-section">
            <div className="ec-stats-container">
                {stats.map((stat, index) => (
                    <div key={index} className="ec-stat-card">
                        <div className="ec-stat-icon-outer">
                            <div className="ec-stat-icon-wrapper">
                                <img src={stat.icon} alt={stat.label} />
                            </div>
                        </div>
                        <div className="ec-stat-text">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ec-known-from-container">
                <h4>{t("knownFrom")}</h4>

                {/* Marquee Structure: Track containing 4x duplicated items for seamless endless loop */}
                <div className="ec-partners-marquee">
                    <div className="ec-partners-track">
                        {partners.map((partner, index) => (
                            <div key={`set1-${index}`} className="ec-partner-logo">
                                <img src={partner.img} alt={partner.alt} />
                            </div>
                        ))}
                        {partners.map((partner, index) => (
                            <div key={`set2-${index}`} className="ec-partner-logo">
                                <img src={partner.img} alt={partner.alt} />
                            </div>
                        ))}
                        {partners.map((partner, index) => (
                            <div key={`set3-${index}`} className="ec-partner-logo">
                                <img src={partner.img} alt={partner.alt} />
                            </div>
                        ))}
                        {partners.map((partner, index) => (
                            <div key={`set4-${index}`} className="ec-partner-logo">
                                <img src={partner.img} alt={partner.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustSection;
