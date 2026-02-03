import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroImage from "@/assets/images/EC-campaign/hero-bg-final.jpg";
import CustomNavBar from "./CustomNavBar";
import BtnCArrow from "@/assets/icons/btn-c-arrow.svg";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import "../../pages/EC-Campaign/style.css"; // Ensure styles are applied

interface HeroSectionProps {
    onCtaClick?: (email: string) => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
    const { language } = useChangeLanguageContext();
    const [email, setEmail] = useState("");

    const translations = {
        en: {
            headline: "Investing on facts, not predictions.",
            subtext: "At Edge Capital you invest based on data, market facts and proven strategies, not gut feeling, so we can navigate today's volatility with focus, capture opportunities others miss, and deliver transparent, well founded returns in any market direction.",
            placeholder: "Enter your company email",
            ctaButton: "Get our factsheet",
            disclaimer: "Enter your details here to receive the brochure and detailed analysis of achieved returns."
        },
        nl: {
            headline: "Beleggen op feiten, niet op voorspellingen.",
            subtext: "Bij Edge Capital belegt u op basis van data, marktfeiten en bewezen strategieën, niet op onderbuikgevoel. Zodat we met focus door de huidige volatiliteit kunnen navigeren, kansen kunnen benutten die anderen missen, en transparante, goed onderbouwde rendementen kunnen leveren in elke marktomstandigheid.",
            placeholder: "Voer uw zakelijke e-mailadres in",
            ctaButton: "Ontvang onze factsheet",
            disclaimer: "Vul hier uw gegevens in om de Brochure en uitgebreide analyse van behaalde rendementen te ontvangen"
        }
    };

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key];
    };

    const handleCtaClick = () => {
        if (email) {
            // Fire and forget partial submission
            submitToGoogleSheet({
                formSlug: 'EC-Campaign',
                payload: { email, type: 'Partial' }
            }).catch(err => {
                console.error("Partial submission failed", err);
                const rawMessage = (err as Error)?.message;
                // Optional: Toast here too if we want the user to know, 
                // but usually partial capture is silent. 
                // However, since we are debugging, it might be useful.
                // For now, let's keep it silent to not annoy user but logic is there if needed.
                // Actually, if the user clicks and nothing happens (tab missing), they might be confused.
                // Let's NOT toast on partial to avoid disrupting flow, simply rely on the Form section for feedback.
            });
        }

        if (onCtaClick) {
            onCtaClick(email);
        }
    };

    return (
        <div className="ec-hero-section" style={{ backgroundImage: `url(${HeroImage})` }}>
            <CustomNavBar />
            <div className="ec-hero-content-container">
                <motion.div
                    className="ec-hero-content"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                    >
                        {t("headline")}
                    </motion.h1>
                    <motion.p
                        className="ec-hero-subtext"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                    >
                        {t("subtext")}
                    </motion.p>
                    <motion.div
                        className="ec-cta-container"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                    >
                        <div className="ec-input-group">
                            <input
                                type="email"
                                placeholder={t("placeholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="ec-cta-btn" onClick={handleCtaClick}>
                                {t("ctaButton")} <img src={BtnCArrow} alt="" className="ec-btn-icon" />
                            </button>
                        </div>
                        <p className="ec-disclaimer">
                            {t("disclaimer")}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
