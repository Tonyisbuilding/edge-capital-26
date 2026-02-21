import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
    en: {
        home: "Home",
        aboutUs: "About us",
        about: "About",
        team: "Team",
        ourFunds: "Our funds",
        edgeFund: "EdgeFund",
        correlationArbitrageFund: "Correlation Arbitrage Fund",
        institutional: "Institutional",
        company: "Company",
        contact: "Contact",
        documents: "Documents",
        careers: "Careers",
        ambassadeur: "Ambassadeur Nyck de Vries",
        contactUs: "Contact us",
        english: "English",
        nederland: "Nederlands",
    },
    nl: {
        home: "Home",
        aboutUs: "Over ons",
        about: "Over ons",
        team: "Team",
        ourFunds: "Onze fondsen",
        edgeFund: "EdgeFund",
        correlationArbitrageFund: "Correlation Arbitrage Fund",
        institutional: "Institutioneel",
        company: "Bedrijf",
        contact: "Contact",
        documents: "Documenten",
        careers: "Carrières",
        ambassadeur: "Ambassadeur Nyck de Vries",
        contactUs: "Neem contact op",
        english: "English",
        nederland: "Nederlands",
    },
};

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const { language, setLanguage } = useChangeLanguageContext();

    const t = translations[language];

    const toggleSubmenu = (name: string) => {
        setOpenSubmenu(openSubmenu === name ? null : name);
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
            style={{ padding: '16px 0' }}
        >
            <nav
                className="flex justify-between items-center"
                style={{
                    width: '98%',
                    maxWidth: '1700px',
                    borderRadius: '10px',
                    backgroundColor: '#091114',
                    padding: '10px',
                }}
            >
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src="/Edge-capital-logo.png"
                        alt="Edge Capital"
                        className="w-[160px] lg:w-[180px] 2xl:w-[220px] h-auto"
                    />
                </Link>

                {/* Desktop: Outer container holding both nav containers */}
                <div className="hidden lg:flex items-center gap-[22px]">
                    {/* Nav Links Container */}
                    <div
                        className="bg-[#050A0C] flex items-center"
                        style={{
                            borderRadius: '10px',
                            padding: '10px 15px',
                            height: '60px',
                        }}
                    >
                        <ul className="flex items-center gap-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors font-mono"
                                >
                                    {t.home}
                                </Link>
                            </li>
                            <li className="relative group">
                                <button className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors flex items-center gap-1.5 font-mono">
                                    {t.aboutUs}
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                <ul className="absolute top-full left-0 mt-3 bg-white shadow-lg min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ borderRadius: '10px' }}>
                                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                                        <Link to="/about" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]" style={{ borderRadius: '10px 10px 0 0' }}>
                                            {t.about}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/team" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]" style={{ borderRadius: '0 0 10px 10px' }}>
                                            {t.team}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative group">
                                <button className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors flex items-center gap-1.5 font-mono">
                                    {t.ourFunds}
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                <ul className="absolute top-full left-0 mt-3 bg-white shadow-lg min-w-[280px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ borderRadius: '10px' }}>
                                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                                        <Link to="/edge-fund" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]" style={{ borderRadius: '10px 10px 0 0' }}>
                                            {t.edgeFund}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/correlation-arbitrage-fund" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]" style={{ borderRadius: '0 0 10px 10px' }}>
                                            {t.correlationArbitrageFund}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    to="/institutional"
                                    className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors font-mono"
                                >
                                    {t.institutional}
                                </Link>
                            </li>
                            <li className="relative group">
                                <button className="text-white font-medium text-base 2xl:text-lg px-3 py-1 hover:text-gray-200 transition-colors flex items-center gap-1.5 font-mono">
                                    {t.company}
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                <ul className="absolute top-full right-0 mt-3 bg-white shadow-lg min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ borderRadius: '10px' }}>
                                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                                        <Link to="/contact" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]" style={{ borderRadius: '10px 10px 0 0' }}>
                                            {t.contact}
                                        </Link>
                                    </li>
                                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                                        <Link to="/documents" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]">
                                            {t.documents}
                                        </Link>
                                    </li>
                                    <li style={{ borderBottom: '0.5px solid #C1CFD5' }}>
                                        <Link to="/careers" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]">
                                            {t.careers}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/ambassadeur-nyck-de-vries" className="block px-5 py-3.5 text-[#3D5861] font-medium transition-colors hover:bg-[#215467]/15 hover:text-[#002632]" style={{ borderRadius: '0 0 10px 10px' }}>
                                            {t.ambassadeur}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Language & Contact Container */}
                    <div
                        className="bg-[#050A0C] flex items-center gap-4"
                        style={{
                            borderRadius: '10px',
                            padding: '10px 15px',
                            height: '60px',
                        }}
                    >
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as 'en' | 'nl')}
                                className="bg-transparent text-white font-medium text-base 2xl:text-lg px-2 py-1 appearance-none cursor-pointer pr-7 outline-none font-mono"
                                style={{ minWidth: '100px' }}
                            >
                                <option value="en" className="text-black bg-white">{t.english}</option>
                                <option value="nl" className="text-black bg-white">{t.nederland}</option>
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
                            className="bg-[#EDF3F4] text-[#091114] font-medium text-base 2xl:text-lg px-4 py-1.5 hover:bg-[#dce5e7] transition-colors flex items-center gap-1.5 font-mono"
                            style={{ borderRadius: '8px' }}
                        >
                            {t.contactUs}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-2xl cursor-pointer text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="w-7 h-7" />
                    ) : (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Panel */}
            <div
                className={`lg:hidden fixed inset-0 top-[88px] z-40 transition-all duration-300 ${mobileMenuOpen
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                <div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={`relative bg-[#091114] w-full max-h-[calc(100vh-88px)] overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
                        }`}
                    style={{ borderRadius: '0 0 10px 10px' }}
                >
                    <nav className="flex flex-col py-4 px-5">
                        <Link
                            to="/"
                            className="text-white font-mono font-medium text-lg py-3 border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t.home}
                        </Link>

                        <div className="border-b border-white/10">
                            <button
                                className="text-white font-mono font-medium text-lg py-3 w-full flex items-center justify-between"
                                onClick={() => toggleSubmenu('about')}
                            >
                                {t.aboutUs}
                                <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === 'about' ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-200 ${openSubmenu === 'about' ? 'max-h-40' : 'max-h-0'}`}>
                                <Link to="/about" className="block text-white/70 font-mono text-base py-2.5 pl-4" onClick={() => setMobileMenuOpen(false)}>
                                    {t.about}
                                </Link>
                                <Link to="/team" className="block text-white/70 font-mono text-base py-2.5 pl-4 mb-2" onClick={() => setMobileMenuOpen(false)}>
                                    {t.team}
                                </Link>
                            </div>
                        </div>

                        <div className="border-b border-white/10">
                            <button
                                className="text-white font-mono font-medium text-lg py-3 w-full flex items-center justify-between"
                                onClick={() => toggleSubmenu('funds')}
                            >
                                {t.ourFunds}
                                <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === 'funds' ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-200 ${openSubmenu === 'funds' ? 'max-h-40' : 'max-h-0'}`}>
                                <Link to="/edge-fund" className="block text-white/70 font-mono text-base py-2.5 pl-4" onClick={() => setMobileMenuOpen(false)}>
                                    {t.edgeFund}
                                </Link>
                                <Link to="/correlation-arbitrage-fund" className="block text-white/70 font-mono text-base py-2.5 pl-4 mb-2" onClick={() => setMobileMenuOpen(false)}>
                                    {t.correlationArbitrageFund}
                                </Link>
                            </div>
                        </div>

                        <Link
                            to="/institutional"
                            className="text-white font-mono font-medium text-lg py-3 border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t.institutional}
                        </Link>

                        <div className="border-b border-white/10">
                            <button
                                className="text-white font-mono font-medium text-lg py-3 w-full flex items-center justify-between"
                                onClick={() => toggleSubmenu('company')}
                            >
                                {t.company}
                                <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === 'company' ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-200 ${openSubmenu === 'company' ? 'max-h-60' : 'max-h-0'}`}>
                                <Link to="/contact" className="block text-white/70 font-mono text-base py-2.5 pl-4" onClick={() => setMobileMenuOpen(false)}>
                                    {t.contact}
                                </Link>
                                <Link to="/documents" className="block text-white/70 font-mono text-base py-2.5 pl-4" onClick={() => setMobileMenuOpen(false)}>
                                    {t.documents}
                                </Link>
                                <Link to="/careers" className="block text-white/70 font-mono text-base py-2.5 pl-4" onClick={() => setMobileMenuOpen(false)}>
                                    {t.careers}
                                </Link>
                                <Link to="/ambassadeur-nyck-de-vries" className="block text-white/70 font-mono text-base py-2.5 pl-4 mb-2" onClick={() => setMobileMenuOpen(false)}>
                                    {t.ambassadeur}
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-2">
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as 'en' | 'nl')}
                                    className="bg-transparent text-white font-medium text-base px-2 py-1 appearance-none cursor-pointer pr-7 outline-none font-mono"
                                >
                                    <option value="en" className="text-black bg-white">{t.english}</option>
                                    <option value="nl" className="text-black bg-white">{t.nederland}</option>
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
                                className="bg-[#EDF3F4] text-[#091114] font-medium text-base px-5 py-2 hover:bg-[#dce5e7] transition-colors flex items-center gap-1.5 font-mono"
                                style={{ borderRadius: '8px' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t.contactUs}
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
