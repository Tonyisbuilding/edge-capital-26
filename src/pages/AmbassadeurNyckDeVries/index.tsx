import React, { useRef } from "react";
import Navbar from "../../common/NavBar";
import Footer from "../../common/Footer";
import Contact from "@/component/landingPage/Contact";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import heroBg from "@/assets/images/amb/amb-hero-without-overlay.jpg";
import cardImg1 from "@/assets/images/amb/amb-card-img1.png";
import cardImg2 from "@/assets/images/amb/amb-card-img2.png";
import cardImg3 from "@/assets/images/amb/amb-card-img3.png";
import statementImg from "@/assets/images/amb/amb-statement-img.png";

const translations = {
    en: {
        // Hero
        heroLine1: "Endurance. Discipline.",
        heroLine2: "Long-term performance.",
        heroDescription:
            "As part of Edge Capital's further development, we have partnered with Nyck de Vries, active in Formula E and endurance racing, who as ambassador of our company represents our shared principles of sustainable technology, strategic discipline, and long-term performance.",
        keepScrolling: "Keep scrolling",

        // Principles section
        principlesTitle: "Built on the Same Principles",
        cards: [
            {
                num: "1/3",
                title: "Performance within clear limits",
                description:
                    "Formula E represents the next generation of motorsport: fully electric, technologically advanced, and driven by efficiency, principles that align seamlessly with Edge Capital's investment philosophy, where risk management and capital protection are every bit as essential as achieving returns.",
            },
            {
                num: "2/3",
                title: "Shared vision, shared principles",
                description:
                    "This partnership transcends mere visibility, grounded in a shared philosophy of performance, preparation, and risk management, recognizing that in both elite sport and asset management, true success lies not in peaks but in consistency, discipline, and controlled performance under varying conditions.",
            },
            {
                num: "3/3",
                title: "Endurance and long-term focus",
                description:
                    "Endurance racing demands precision, composure, and long-term focus — winning by the smallest margins requires consistent execution of the fundamentals that form the core of any great strategy, pushing boundaries and relentlessly fine-tuning every detail to stay ahead.",
            },
        ],

        // Statement section
        statementTitle: "Top-level sport and entrepreneurship meet",
        statementP1:
            "Besides technology and strategy, the human factor plays a decisive role. Leadership, responsibility, and the ability to continuously improve are not just qualities admired in elite sport, they are essential in professional asset management. In both arenas, it is the people behind the decisions who ultimately determine the outcome.",
        statementP2:
            "Success depends on individuals who remain composed under pressure, take ownership of their results, and commit to refining their approach with every challenge they face. It is this relentless pursuit of growth, paired with a deep sense of accountability, that separates sustained excellence from short-lived results.",
        statementP3:
            "Whether on the track or in the markets, performance is ultimately shaped by the character, judgment, and resilience of the people driving it forward. The ability to lead, adapt, and hold oneself to the highest standard is what connects these two worlds at their core.",
        speakWithTeam: "Speak with the team",
    },
    nl: {
        // Hero
        heroLine1: "Uithoudingsvermogen. Discipline.",
        heroLine2: "Langetermijnprestaties.",
        heroDescription:
            "Als onderdeel van de verdere ontwikkeling van Edge Capital zijn wij een samenwerking aangegaan met Nyck de Vries, actief in de Formule E en endurance racing, die als ambassadeur van onze onderneming onze gedeelde principes van duurzame technologie, strategische discipline en langetermijnprestaties vertegenwoordigt.",
        keepScrolling: "Blijf scrollen",

        // Principles section
        principlesTitle: "Gebouwd op dezelfde principes",
        cards: [
            {
                num: "1/3",
                title: "Presteren binnen duidelijke kaders",
                description:
                    "Formule E vertegenwoordigt de volgende generatie motorsport: volledig elektrisch, technologisch geavanceerd en gedreven door efficiëntie — principes die naadloos aansluiten bij de beleggingsfilosofie van Edge Capital, waar risicobeheer en kapitaalbescherming minstens zo essentieel zijn als het behalen van rendement.",
            },
            {
                num: "2/3",
                title: "Gedeelde visie, gedeelde principes",
                description:
                    "Dit partnerschap overstijgt louter zichtbaarheid, geworteld in een gedeelde filosofie van prestatie, voorbereiding en risicobeheer, in het besef dat in zowel topsport als vermogensbeheer echt succes niet in pieken ligt, maar in consistentie, discipline en beheerste prestaties onder wisselende omstandigheden.",
            },
            {
                num: "3/3",
                title: "Uithoudingsvermogen en langetermijnfocus",
                description:
                    "Endurance racing vereist precisie, kalmte en langetermijnfocus — winnen met de kleinste marges vraagt om consistente uitvoering van de fundamenten die de kern vormen van elke sterke strategie, grenzen verleggen en onophoudelijk elk detail verfijnen om voorop te blijven.",
            },
        ],

        // Statement section
        statementTitle: "Topsport en ondernemerschap ontmoeten elkaar",
        statementP1:
            "Naast technologie en strategie speelt de menselijke factor een beslissende rol. Leiderschap, verantwoordelijkheid en het vermogen om continu te verbeteren zijn niet alleen kwaliteiten die in topsport worden bewonderd — ze zijn essentieel in professioneel vermogensbeheer. In beide arena's zijn het de mensen achter de beslissingen die uiteindelijk het resultaat bepalen.",
        statementP2:
            "Succes hangt af van individuen die kalm blijven onder druk, eigenaarschap nemen over hun resultaten en zich committeren aan het verfijnen van hun aanpak bij elke uitdaging. Het is dit onophoudelijke streven naar groei, gecombineerd met een diep gevoel van verantwoordelijkheid, dat duurzame excellentie onderscheidt van kortdurende resultaten.",
        statementP3:
            "Of het nu op het circuit is of op de markten, prestaties worden uiteindelijk gevormd door het karakter, het oordeelsvermogen en de veerkracht van de mensen die het voortdrijven. Het vermogen om te leiden, zich aan te passen en zichzelf aan de hoogste standaard te houden is wat deze twee werelden in hun kern verbindt.",
        speakWithTeam: "Spreek met het team",
    },
};

const CARD_IMAGES = [cardImg1, cardImg2, cardImg3];

const AmbassadeurNyckDeVries: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    return (
        <>
            <Navbar />
            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden">
                {/* Background image */}
                <img
                    src={heroBg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top right, rgba(10, 15, 18, 0.95) 0%, rgba(10, 15, 18, 0.85) 30%, rgba(10, 15, 18, 0.5) 55%, rgba(10, 15, 18, 0.15) 75%, transparent 100%)",
                    }}
                />

                {/* Hero content */}
                <div className="relative z-10 flex flex-col justify-end h-full w-[98%] max-w-[1700px] mx-auto px-4 pb-24 md:pb-32">
                    <h1
                        className="font-bold text-white leading-tight mb-4"
                        style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
                    >
                        {t.heroLine1}
                        <br />
                        <span className="text-[#D48C3A]">{t.heroLine2}</span>
                    </h1>
                    <p
                        className="text-white/70 max-w-2xl leading-relaxed mt-2"
                        style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.125rem)" }}
                    >
                        {t.heroDescription}
                    </p>
                </div>

                {/* Keep scrolling indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <span className="text-white/60 text-sm tracking-wide">{t.keepScrolling}</span>
                    <svg
                        className="w-5 h-5 text-white/60 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
                    </svg>
                </div>
            </section>

            {/* Principles Cards Section */}
            <section className="bg-[#111] overflow-hidden" style={{ padding: "clamp(3rem, 6vw, 7rem) 0" }}>
                <div className="w-[98%] max-w-[1700px] mx-auto px-4">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
                        <h2
                            className="text-white font-bold leading-tight max-w-2xl"
                            style={{ fontSize: "clamp(1.75rem, 3.2vw, 3.25rem)" }}
                        >
                            {t.principlesTitle}
                        </h2>
                    </div>

                </div>

                {/* Cards Grid */}
                <div
                    ref={scrollRef}
                    className="w-[98%] max-w-[1700px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,1.5vw,1.5rem)] mt-8"
                    style={{
                        marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
                    }}
                >
                    {t.cards.map((card, i) => (
                        <div
                            key={i}
                            className="rounded-2xl overflow-hidden flex flex-col w-full"
                            style={{
                                height: "clamp(420px, 48vw, 700px)",
                                backgroundColor: "#C7EBF3",
                            }}
                        >
                            {/* Text area */}
                            <div
                                className="flex flex-col"
                                style={{ padding: "clamp(1rem, 2vw, 1.75rem)" }}
                            >
                                <span
                                    className="text-[#1A2B30]/50 font-medium"
                                    style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.875rem)" }}
                                >
                                    {card.num}
                                </span>
                                <h3
                                    className="text-[#1A2B30] font-bold leading-snug"
                                    style={{
                                        fontSize: "clamp(0.95rem, 1.8vw, 1.75rem)",
                                        marginTop: "clamp(0.5rem, 1vw, 0.75rem)",
                                    }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="text-[#1A2B30]/70 leading-relaxed"
                                    style={{
                                        fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
                                        marginTop: "clamp(0.5rem, 1vw, 0.75rem)",
                                    }}
                                >
                                    {card.description}
                                </p>
                            </div>

                            {/* Image area */}
                            <div className="flex-1 min-h-0 overflow-hidden relative">
                                <div
                                    className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
                                    style={{
                                        height: "clamp(4rem, 8vw, 7rem)",
                                        background: "linear-gradient(to bottom, #C7EBF3 0%, #C7EBF3 15%, rgba(199, 235, 243, 0.6) 50%, rgba(199, 235, 243, 0) 100%)",
                                    }}
                                />
                                <img
                                    src={CARD_IMAGES[i]}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Statement Section */}
            <section className="bg-white h-auto md:h-[90vh]" style={{ padding: "clamp(3rem, 6vw, 7rem) 0" }}>
                <div className="w-[98%] max-w-[1700px] mx-auto px-[10px] md:px-4 h-full flex flex-col md:flex-row gap-[clamp(2rem,4vw,4rem)]">
                    {/* Image — 50% width */}
                    <div className="w-full md:w-1/2 flex-shrink-0">
                        <img
                            src={statementImg}
                            alt={t.statementTitle}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                        <h2
                            className="text-[#1A2B30] font-bold leading-tight"
                            style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)" }}
                        >
                            {t.statementTitle}
                        </h2>

                        <div className="flex flex-col">
                            <div
                                className="flex flex-col text-[#1A2B30]/70 leading-relaxed"
                                style={{
                                    fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)",
                                    gap: "clamp(1rem, 1.8vw, 1.5rem)",
                                }}
                            >
                                <p>{t.statementP1}</p>
                                <p>{t.statementP2}</p>
                                <p>{t.statementP3}</p>
                            </div>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-[#005569] text-white font-medium rounded-full hover:bg-[#004556] transition-colors self-start"
                                style={{
                                    fontSize: "clamp(0.85rem, 1vw, 1rem)",
                                    padding: "clamp(0.7rem, 1.2vw, 1rem) clamp(1.25rem, 2vw, 1.75rem)",
                                    marginTop: "clamp(1rem, 1.5vw, 1.25rem)",
                                }}
                            >
                                {t.speakWithTeam}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <Contact />

            <Footer />
        </>
    );
};

export default AmbassadeurNyckDeVries;
