import React from 'react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

// Icons
import TransparencyIcon from "@/assets/icons/eye.svg"; // 100% Transparency
import GuidanceIcon from "@/assets/icons/headset.svg"; // Personal adviser
import RiskIcon from "@/assets/icons/broken-shield.svg"; // Controlled Risk
import ResultsIcon from "@/assets/icons/trending-up-box.svg"; // Strong track record
import DepositIcon from "@/assets/icons/money (1).svg"; // Flexible Deposit
import CheckCircleIcon from "@/assets/icons/check-circle.png";

// Background
// Note: We'll set the background via CSS or inline style using the imported image
import BenefitsBg from "@/assets/images/EC-campaign/Benefit-container.png";

const BenefitsSection = () => {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            badge: "The Edge Capital benefits",
            subtitle: "What sets us apart from traditional asset managers",
            benefits: [
                {
                    title: "100% Transparency",
                    desc: "No hidden costs or surprises. You always know exactly where your money goes.",
                    icon: TransparencyIcon
                },
                {
                    title: "Personal adviser",
                    desc: "A dedicated specialist who understands your situation and is directly accessible for all your questions.",
                    icon: GuidanceIcon
                },
                {
                    title: "Controlled Risk",
                    desc: "We carefully align return and risk with your goals and risk appetite.",
                    icon: RiskIcon
                },
                {
                    title: "Strong track record",
                    desc: "More than 30 years of combined experience and consistent results, with an average net return of 22.6% per year.",
                    icon: ResultsIcon
                }
   
            ]
        },
        nl: {
            badge: "De voordelen van Edge Capital",
            subtitle: "Bereik uw beleggingsdoelen in drie eenvoudige stappen",
            benefits: [
                {
                    title: "100% Transparantie",
                    desc: "Geen verborgen kosten of verrassingen. U weet altijd precies waar uw geld naartoe gaat.",
                    icon: TransparencyIcon
                },
                {
                    title: "Persoonlijke Adviseur",
                    desc: "Uw eigen adviseur die uw situatie kent en altijd beschikbaar is voor vragen.",
                    icon: GuidanceIcon
                },
                {
                    title: "Gericht Risicobeheer",
                    desc: "Wij stemmen rendement en risico zorgvuldig af op uw doelen en risicobereidheid.",
                    icon: RiskIcon
                },
                {
                    title: "Sterk Trackrecord",
                    desc: "Meer dan 30 jaar gecombineerde ervaring en consistente resultaten, met gemiddeld 22.6% nettorendement per jaar.",
                    icon: ResultsIcon
                }
            ]
        }
    };

    const t = translations[language];

    return (
        <div className="ec-benefits-section">
            <div className="ec-benefits-container" style={{ backgroundImage: `url('${BenefitsBg}')` }}>
                <div className="ec-benefits-header">
                    <span className="ec-benefits-badge">{t.badge}</span>
                    <h3>{t.subtitle}</h3>
                </div>

                <div className="ec-benefits-list">
                    {t.benefits.map((benefit, index) => (
                        <div key={index} className="ec-benefit-row">
                            <div className="ec-benefit-left">
                                <div className="ec-benefit-icon-wrapper">
                                    <img src={benefit.icon} alt="" className="ec-benefit-icon" />
                                </div>
                                <div className="ec-benefit-content">
                                    <h4>{benefit.title}</h4>
                                    <p>{benefit.desc}</p>
                                </div>
                            </div>
                            <div className="ec-benefit-right">
                                <img src={CheckCircleIcon} alt="Check" className="ec-benefit-check" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;
