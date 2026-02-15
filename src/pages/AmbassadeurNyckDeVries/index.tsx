import React, { useRef } from "react";
import Navbar from "../../common/NavBar";
import Footer from "../../common/Footer";
import heroBg from "@/assets/images/amb/amb-hero-without-overlay.jpg";
import cardImg1 from "@/assets/images/amb/amb-card-img1.png";
import cardImg2 from "@/assets/images/amb/amb-card-img2.png";
import cardImg3 from "@/assets/images/amb/amb-card-img3.png";
import statementImg from "@/assets/images/amb/amb-statement-img.png";

const CARDS = [
    {
        num: "1/3",
        title: "Performance within clear limits",
        description:
            "Formula E represents the next generation of motorsport: fully electric, technologically advanced, and driven by efficiency, principles that align seamlessly with Edge Capital's investment philosophy, where risk management and capital protection are every bit as essential as achieving returns.",
        image: cardImg1,
    },
    {
        num: "2/3",
        title: "Shared vision, shared principles",
        description:
            "This partnership transcends mere visibility, grounded in a shared philosophy of performance, preparation, and risk management, recognizing that in both elite sport and asset management, true success lies not in peaks but in consistency, discipline, and controlled performance under varying conditions.",
        image: cardImg2,
    },
    {
        num: "3/3",
        title: "Endurance and long-term focus",
        description:
            "Endurance racing demands precision, composure, and long-term focus — winning by the smallest margins requires consistent execution of the fundamentals that form the core of any great strategy, pushing boundaries and relentlessly fine-tuning every detail to stay ahead.",
        image: cardImg3,
    },
];

const AmbassadeurNyckDeVries: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const cardWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width ?? 400;
        const gap = parseFloat(getComputedStyle(scrollRef.current).gap) || 0;
        const scrollAmount = cardWidth + gap;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

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
                        Endurance. Discipline.
                        <br />
                        <span className="text-[#D48C3A]">Long-term performance.</span>
                    </h1>
                    <p
                        className="text-white/70 max-w-2xl leading-relaxed mt-2"
                        style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.125rem)" }}
                    >
                        As part of Edge Capital's further development, we have partnered with
                        Nyck de Vries, active in Formula E and endurance racing. This collaboration
                        is based on shared principles: sustainable technology, strategic discipline,
                        and long-term performance.
                    </p>
                </div>

                {/* Keep scrolling indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <span className="text-white/60 text-sm tracking-wide">Keep scrolling</span>
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
                            Built on the Same Principles
                        </h2>
                        <p
                            className="text-white/70 leading-relaxed max-w-lg md:pt-1"
                            style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.125rem)" }}
                        >
                            We partner with those who share our mindset: discipline,
                            consistency, and performing when it matters most.
                        </p>
                    </div>

                    {/* Arrow navigation */}
                    <div className="flex items-center gap-3 mt-6" style={{ marginTop: "clamp(1.25rem, 2.5vw, 2rem)" }}>
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:border-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:border-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable cards */}
                <div
                    ref={scrollRef}
                    className="flex gap-[clamp(1rem,1.5vw,1.5rem)] mt-8 overflow-x-auto snap-x snap-mandatory"
                    style={{
                        paddingLeft: "max((100% - 1700px) / 2 + 1rem, 1% + 1rem)",
                        paddingRight: "clamp(1rem, 3vw, 2rem)",
                        marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {CARDS.map((card, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 snap-start rounded-2xl overflow-hidden flex flex-col"
                            style={{
                                width: "clamp(340px, 42vw, 580px)",
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
                                    className="text-[#1A2B30] font-bold leading-snug whitespace-nowrap"
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
                                    src={card.image}
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
                            alt="Top-level sport and entrepreneurship meet"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                        <h2
                            className="text-[#1A2B30] font-bold leading-tight"
                            style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)" }}
                        >
                            Top-level sport and entrepreneurship meet
                        </h2>

                        <div className="flex flex-col">
                            <div
                                className="flex flex-col text-[#1A2B30]/70 leading-relaxed"
                                style={{
                                    fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)",
                                    gap: "clamp(1rem, 1.8vw, 1.5rem)",
                                }}
                            >
                                <p>
                                    Besides technology and strategy, the human factor plays a decisive
                                    role. Leadership, responsibility, and the ability to continuously
                                    improve are not just qualities admired in elite sport, they are essential
                                    in professional asset management. In both arenas, it is the people
                                    behind the decisions who ultimately determine the outcome.
                                </p>
                                <p>
                                    Success depends on individuals who remain composed under
                                    pressure, take ownership of their results, and commit to refining their
                                    approach with every challenge they face. It is this relentless pursuit of
                                    growth, paired with a deep sense of accountability, that separates
                                    sustained excellence from short-lived results.
                                </p>
                                <p>
                                    Whether on the track or in the markets, performance is ultimately
                                    shaped by the character, judgment, and resilience of the people
                                    driving it forward. The ability to lead, adapt, and hold oneself to the
                                    highest standard is what connects these two worlds at their core.
                                </p>
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
                                Speak with the team
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AmbassadeurNyckDeVries;
