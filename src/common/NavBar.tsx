import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faChevronDown,
  faChevronUp,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import images from "@/constant/images";
import "../common/GoogleTranslate.css";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

interface DropdownState {
  [key: number]: boolean;
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (options: object, containerId: string) => void;
      };
    };
  }
}

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState<DropdownState>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useChangeLanguageContext();

  // Translation dictionary
  const translations = {
    en: {
      home: "Home",
      aboutUs: "About us",
      about: "About",
      team: "Team",
      ourFunds: "Our funds",
      edgeFund: "EdgeFund",
      correlationArbitrageFund: "Correlation Arbitrage Fund",
      edgeCapitalCSR: "Edge Capital CSR",
      institutional: "Institutional",
      company: "Company",
      contact: "Contact",
      media: "Media",
      documents: "Documents",
      careers: "Careers",
      ambassadeur: "Ambassadeur Nyck de Vries",
      contactUs: "Contact us",
      english: "English",
      dutch: "Nederland",
    },
    nl: {
      home: "Home",
      aboutUs: "Over ons",
      about: "Over",
      team: "Team",
      ourFunds: "Onze fondsen",
      edgeFund: "EdgeFund",
      correlationArbitrageFund: "Correlation Arbitrage Fund",
      edgeCapitalCSR: "Edge Capital MVO",
      institutional: "Institutioneel",
      company: "Bedrijf",
      contact: "Contact",
      media: "Media",
      documents: "Documenten",
      careers: "Vacatures",
      ambassadeur: "Ambassadeur Nyck de Vries",
      contactUs: "Neem contact op",
      english: "English",
      dutch: "Nederland",
    }
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => setIsNavActive(!isNavActive);

  const toggleDropdown = (
    index: number,
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      setActiveDropdowns({
        ...activeDropdowns,
        [index]: !activeDropdowns[index],
      });
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "nl" : "en");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "nl");
  };

  return (
    <>
      {/* AFM Warning Banner */}
      <div className="fixed top-0 left-0 w-full bg-[#005569] text-white text-center px-4 py-2 z-[9999] flex justify-center items-center gap-2">
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

      <nav
        className="fixed top-[60px] sm:top-[45px] left-1/2 -translate-x-1/2 z-50"
        style={{
          width: '98%',
          maxWidth: '1700px',
          borderRadius: '10px',
          backgroundColor: 'rgba(238, 244, 245, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="px-[10px] flex justify-between items-center py-3 2xl:py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={images.landingPage.EdgeCapitalLogoSVG}
              alt="Edge Capital"
              className="w-[160px] lg:w-[180px] 2xl:w-[220px] h-auto"
            />
          </Link>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 ${isNavActive ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex-shrink-0">
                <Link to="/" onClick={toggleNav}>
                  <img
                    src={images.landingPage.EdgeCapitalLogoSVG}
                    alt="Edge Capital"
                    className="w-[180px] h-auto"
                  />
                </Link>
              </div>
              <button className="text-2xl text-black" onClick={toggleNav}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-70px)]">
              <ul className="px-4">
                <li className="py-4 border-b border-gray-100">
                  <Link to="/" className="text-[#192227] font-semibold block" onClick={toggleNav}>
                    {t("home")}
                  </Link>
                </li>
                <li className="py-4 border-b border-gray-100">
                  <a
                    href="#"
                    className="text-[#192227] font-semibold flex justify-between items-center w-full"
                    onClick={(e) => toggleDropdown(1, e)}
                  >
                    {t("aboutUs")}
                    <FontAwesomeIcon icon={activeDropdowns[1] ? faChevronUp : faChevronDown} className="text-xs" />
                  </a>
                  {activeDropdowns[1] && (
                    <ul className="ml-4 mt-2">
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/about" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("about")}</Link>
                      </li>
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/team" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("team")}</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="py-4 border-b border-gray-100">
                  <a
                    href="#"
                    className="text-[#192227] font-semibold flex justify-between items-center w-full"
                    onClick={(e) => toggleDropdown(2, e)}
                  >
                    {t("ourFunds")}
                    <FontAwesomeIcon icon={activeDropdowns[2] ? faChevronUp : faChevronDown} className="text-xs" />
                  </a>
                  {activeDropdowns[2] && (
                    <ul className="ml-4 mt-2">
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/edge-fund" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("edgeFund")}</Link>
                      </li>
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/correlation-arbitrage-fund" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("correlationArbitrageFund")}</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="py-4 border-b border-gray-100">
                  <Link to="/institutional" className="text-[#192227] font-semibold block" onClick={toggleNav}>
                    {t("institutional")}
                  </Link>
                </li>
                <li className="py-4 border-b border-gray-100">
                  <a
                    href="#"
                    className="text-[#192227] font-semibold flex justify-between items-center w-full"
                    onClick={(e) => toggleDropdown(3, e)}
                  >
                    {t("company")}
                    <FontAwesomeIcon icon={activeDropdowns[3] ? faChevronUp : faChevronDown} className="text-xs" />
                  </a>
                  {activeDropdowns[3] && (
                    <ul className="ml-4 mt-2">
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/contact" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("contact")}</Link>
                      </li>
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/documents" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("documents")}</Link>
                      </li>
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/careers" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("careers")}</Link>
                      </li>
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/edge-capitla-csr" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("edgeCapitalCSR")}</Link>
                      </li>
                      <li className="py-2 border-t border-gray-100">
                        <Link to="/ambassadeur-nyck-de-vries" className="block text-[#192227] px-2 py-1.5 rounded active:bg-[#215467]/15 hover:bg-[#215467]/15 transition-colors" onClick={toggleNav}>{t("ambassadeur")}</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>

              <div className="px-4 py-6 border-t border-gray-100 mt-4">
                <div className="relative w-full mb-3">
                  <select
                    value={language}
                    onChange={handleSelectChange}
                    className="bg-[#005569] text-white px-4 py-2.5 font-medium w-full appearance-none cursor-pointer outline-none"
                    style={{ borderRadius: '10px' }}
                  >
                    <option value="en" className="text-black bg-white">{t("english")}</option>
                    <option value="nl" className="text-black bg-white">{t("dutch")}</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xs pointer-events-none"
                  />
                </div>
                <Link
                  to="/contact"
                  className="bg-[#005569] text-white px-4 py-2.5 font-medium w-full flex items-center justify-center gap-2"
                  style={{ borderRadius: '10px' }}
                  onClick={toggleNav}
                >
                  {t("contactUs")}
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop: Outer container holding both nav containers */}
          <div className="hidden lg:flex items-center gap-[22px]">
            {/* Nav Links Container */}
            <div
              className="bg-[#005569] flex items-center"
              style={{
                borderRadius: '10px',
                padding: '10px 15px',
                height: '60px'
              }}
            >
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    to="/"
                    className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors"
                  >
                    {t("home")}
                  </Link>
                </li>
                <li className="relative group">
                  <button className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors flex items-center gap-1.5">
                    {t("aboutUs")}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <ul className="absolute top-full left-0 mt-3 bg-white shadow-lg min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ borderRadius: '10px' }}>
                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                      <Link to="/about" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ borderRadius: '10px 10px 0 0', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("about")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/team" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ borderRadius: '0 0 10px 10px', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("team")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="relative group">
                  <button className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors flex items-center gap-1.5">
                    {t("ourFunds")}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <ul className="absolute top-full left-0 mt-3 bg-white shadow-lg min-w-[280px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ borderRadius: '10px' }}>
                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                      <Link to="/edge-fund" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ borderRadius: '10px 10px 0 0', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("edgeFund")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/correlation-arbitrage-fund" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ borderRadius: '0 0 10px 10px', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("correlationArbitrageFund")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    to="/institutional"
                    className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors"
                  >
                    {t("institutional")}
                  </Link>
                </li>
                <li className="relative group">
                  <button className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors flex items-center gap-1.5">
                    {t("company")}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <ul className="absolute top-full right-0 mt-3 bg-white shadow-lg min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ borderRadius: '10px' }}>
                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                      <Link to="/contact" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ borderRadius: '10px 10px 0 0', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("contact")}
                      </Link>
                    </li>
                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                      <Link to="/documents" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("documents")}
                      </Link>
                    </li>
                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                      <Link to="/careers" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("careers")}
                      </Link>
                    </li>
                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                      <Link to="/edge-capitla-csr" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("edgeCapitalCSR")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ambassadeur-nyck-de-vries" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:text-[#002632]" style={{ borderRadius: '0 0 10px 10px', backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(33, 84, 103, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {t("ambassadeur")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Language & Contact Container */}
            <div
              className="bg-[#005569] flex items-center gap-4"
              style={{
                borderRadius: '10px',
                padding: '10px 15px',
                height: '60px'
              }}
            >
              <div className="relative">
                <select
                  onChange={handleSelectChange}
                  value={language}
                  className="bg-transparent text-white font-medium text-base 2xl:text-lg px-2 py-1 appearance-none cursor-pointer pr-7 outline-none"
                  style={{ minWidth: '100px' }}
                >
                  <option value="en" className="text-black bg-white">English</option>
                  <option value="nl" className="text-black bg-white">Nederland</option>
                </select>
                <svg
                  className="w-3 h-3 text-white absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <Link
                to="/contact"
                className="bg-[#EDF3F4] text-[#005569] font-medium text-base 2xl:text-lg px-4 py-1.5 hover:bg-[#dce5e7] transition-colors flex items-center gap-1.5"
                style={{ borderRadius: '8px' }}
              >
                {t("contactUs")}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className="lg:hidden text-2xl cursor-pointer text-black"
            onClick={toggleNav}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
