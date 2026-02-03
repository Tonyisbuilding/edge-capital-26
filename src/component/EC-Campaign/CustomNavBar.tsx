import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import images from "@/constant/images";
import BtnCArrow from "@/assets/icons/btn-c-arrow.svg";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

interface DropdownState {
    [key: number]: boolean;
}

const CustomNavBar = () => {
    const [isNavActive, setIsNavActive] = useState(false);
    const [activeDropdowns, setActiveDropdowns] = useState<DropdownState>({});
    const { language, setLanguage } = useChangeLanguageContext();

    const translations = {
        en: {
            home: "Home",
            aboutUs: "About Us",
            about: "About",
            team: "Team",
            edgeFund: "EdgeFund",
            edgeCapitalCSR: "Edge Capital CSR",
            institutional: "Institutional",
            company: "Company",
            contact: "Contact",
            media: "Media",
            documents: "Documents",
            careers: "Careers",
            contactUs: "Contact Us",
            english: "English",
            dutch: "Nederlands",
        },
        nl: {
            home: "Home",
            aboutUs: "Over Ons",
            about: "Over",
            team: "Team",
            edgeFund: "EdgeFund",
            edgeCapitalCSR: "Edge Capital MVO",
            institutional: "Institutioneel",
            company: "Bedrijf",
            contact: "Contact",
            media: "Media",
            documents: "Documenten",
            careers: "Vacatures",
            contactUs: "Neem Contact op",
            english: "Engels",
            dutch: "Nederlands",
        }
    };

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key];
    };

    const toggleNav = () => setIsNavActive(!isNavActive);

    const toggleDropdown = (
        index: number,
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            setActiveDropdowns({
                ...activeDropdowns,
                [index]: !activeDropdowns[index],
            });
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as "en" | "nl");
    };

    return (
        <>
            {/* AFM Warning Banner */}
            <div className="fixed top-0 left-0 w-full bg-[#256D7B] text-white text-center px-4 py-2 z-[9999] flex justify-center items-center gap-2">
                <p className="text-[10px] sm:text-sm leading-snug max-w-[90%] text-white">
                    {language === "nl"
                        ? "Let op! U belegt buiten toezicht van de AFM (Autoriteit Financiële Markten). Voor deze activiteit geldt geen vergunnings- of prospectusplicht."
                        : "Attention! You are investing outside the supervision of the AFM (Authority for the Financial Markets). There is no requirement for licensing or prospectus for this activity."}
                </p>

                <img
                    src={images.landingPage.Afm_disclaimer}
                    alt="AFM Notice Icon"
                    className="h-4 sm:h-5"
                />
            </div>

            <nav className="ec-custom-nav">
                <div className="ec-nav-logo">
                    <Link to="/">
                        <img src={images.landingPage.EdgeCapitalLogoSVG} alt="Edge Capital" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                {/* Desktop & Mobile Menu Container */}
                <div className={`ec-nav-menu-container ${isNavActive ? "active" : ""}`}>
                    <div className="ec-nav-links">
                        <Link to="/">{t("home")}</Link>

                        <div className="ec-nav-dropdown-container">
                            <a href="#" className="ec-nav-dropdown-trigger">
                                {t("aboutUs")} <FontAwesomeIcon icon={faChevronDown} className="ec-dropdown-icon" />
                            </a>
                            <div className="ec-nav-dropdown-menu">
                                <Link to="/about">{t("about")}</Link>
                                <Link to="/team">{t("team")}</Link>
                            </div>
                        </div>

                        <Link to="/edge-fund">{t("edgeFund")}</Link>
                        <Link to="/institutional">{t("institutional")}</Link>

                        <div className="ec-nav-dropdown-container">
                            <a href="#" className="ec-nav-dropdown-trigger">
                                {t("company")} <FontAwesomeIcon icon={faChevronDown} className="ec-dropdown-icon" />
                            </a>
                            <div className="ec-nav-dropdown-menu">
                                <Link to="/contact">{t("contact")}</Link>
                                <Link to="/documents">{t("documents")}</Link>
                                <Link to="/edge-capitla-csr">{t("edgeCapitalCSR")}</Link>
                                <Link to="/careers">{t("careers")}</Link>
                            </div>
                        </div>
                    </div>

                    <div className="ec-nav-actions">
                        <div className="ec-lang-selector-container">
                            <select
                                onChange={handleSelectChange}
                                value={language}
                                className="ec-lang-selector"
                            >
                                <option value="en">{translations.en.english}</option>
                                <option value="nl">{translations.nl.dutch}</option>
                            </select>
                            <div className="ec-lang-arrow">
                                {/* Reusing existing logic or icon if possible, or simple arrow */}
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div>

                        <Link to="/contact" className="ec-contact-btn">
                            {t("contactUs")}
                            <img src={BtnCArrow} alt="" className="ec-btn-icon" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle (Simplified for now, can expand if needed) */}
                <div className="lg:hidden ec-mobile-toggle" onClick={toggleNav}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </nav>
        </>
    );
};

export default CustomNavBar;
