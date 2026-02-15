import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StressTestChart2022 } from "@/component/Institutional/charts/StressTestChart2022";
import { fetchNAVPerformance, type NAVDataPoint } from "@/Api/googleSheetsClient";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const translations = {
    en: {
        duringMarketCrises: "During market crises,",
        ourSystemDelivers: "our system delivers.",
        crisisAlpha: "Crisis Alpha",
        the2022: "The 2022",
        stressTest: "Stress Test.",
        paragraph: "In 2022, the 60/40 portfolio faced its worst year in decades as stocks and bonds fell together. In that same window, Edge Capital\u2019s volatility engines didn\u2019t just survive\u2014they",
        monetizedTheChaos: "monetized the chaos",
        delivering: "delivering",
        netReturns: "net returns",
        whileBenchmarkFell: "while the global benchmark fell",
        performanceSpread: "Performance Spread",
        correlationToBenchmark: "Correlation to Benchmark",
    },
    nl: {
        duringMarketCrises: "Tijdens marktcrises,",
        ourSystemDelivers: "levert ons systeem.",
        crisisAlpha: "Crisis Alpha",
        the2022: "De 2022",
        stressTest: "Stresstest.",
        paragraph: "In 2022 kende de 60/40-portefeuille het slechtste jaar in decennia doordat aandelen en obligaties gelijktijdig daalden. In diezelfde periode hebben de volatiliteitsmotoren van Edge Capital niet alleen overleefd\u2014ze hebben",
        monetizedTheChaos: "de chaos gemonetariseerd",
        delivering: "en leverden",
        netReturns: "nettorendement",
        whileBenchmarkFell: "terwijl de wereldwijde benchmark daalde met",
        performanceSpread: "Prestatiespreiding",
        correlationToBenchmark: "Correlatie met Benchmark",
    },
};

// Helper: Calculate 2022 returns from NAV data
function calculate2022Returns(navData: NAVDataPoint[]) {
    const data2022 = navData.filter(d => d.date.includes("2022"));
    if (data2022.length === 0) return null;

    const first = data2022[0];
    const last = data2022[data2022.length - 1];

    return {
        volPrem: ((last.volPremiumRisk - first.volPremiumRisk) / first.volPremiumRisk * 100).toFixed(1),
        corrArb: ((last.correlationArbitrage - first.correlationArbitrage) / first.correlationArbitrage * 100).toFixed(1),
        msci: ((last.msciWorld - first.msciWorld) / first.msciWorld * 100).toFixed(1),
    };
}

export function StressTest2022() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    // State for dynamic 2022 returns
    const [returns, setReturns] = useState({
        volPrem: "+24.6",
        corrArb: "+18.6",
        msci: "-18.7",
    });

    useEffect(() => {
        let cancelled = false;

        async function loadReturns() {
            const navData = await fetchNAVPerformance();
            if (!cancelled && navData && navData.length > 0) {
                const calculated = calculate2022Returns(navData);
                if (calculated) {
                    setReturns({
                        volPrem: Number(calculated.volPrem) >= 0 ? `+${calculated.volPrem}` : calculated.volPrem,
                        corrArb: Number(calculated.corrArb) >= 0 ? `+${calculated.corrArb}` : calculated.corrArb,
                        msci: Number(calculated.msci) >= 0 ? `+${calculated.msci}` : calculated.msci,
                    });
                }
            }
        }

        loadReturns();
        return () => { cancelled = true; };
    }, []);

    // Calculate spread (Vol Prem - MSCI)
    const spread = (parseFloat(returns.volPrem) - parseFloat(returns.msci)).toFixed(1);
    const spreadFormatted = parseFloat(spread) >= 0 ? `+${spread}` : spread;

    // Track scroll progress within the tall scroll-spacer (0 → 1)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // ═══════════════════════════════════════════════════════════
    // Phase 1 (0 → 0.35): Text slides left + fades out
    // ═══════════════════════════════════════════════════════════
    const textX = useTransform(scrollYProgress, [0, 0.35], ["0%", "-150%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

    // ═══════════════════════════════════════════════════════════
    // Phase 1+2: Chart container position & size animate
    // ═══════════════════════════════════════════════════════════
    const chartLeft = useTransform(
        scrollYProgress,
        [0, 0.05, 0.4, 0.7],
        ["42%", "42%", "21%", "0%"]
    );
    const chartWidth = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7],
        ["56%", "56%", "100%"]
    );
    const chartHeight = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7],
        ["50vh", "50vh", "60vh"]
    );
    const chartFontSize = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7],
        [11, 11, 14]
    );

    return (
        <>
            {/* ═══════════════════════════════════════════════════════
                MOBILE LAYOUT — vertical, no scroll animation
            ═══════════════════════════════════════════════════════ */}
            <div
                className="md:hidden relative overflow-hidden border-y border-white/[0.04]"
                style={{ backgroundColor: "#050A0C" }}
            >
                {/* Faint isometric grid pattern overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(30deg, #ffffff 1px, transparent 1px),
                            linear-gradient(150deg, #ffffff 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 34px",
                    }}
                />

                <div className="relative z-10 w-[98%] mx-auto px-[10px] py-10 flex flex-col gap-10">
                    {/* Section header */}
                    <div className="pointer-events-none select-none">
                        <h2
                            className="font-mono font-bold uppercase leading-[0.95] tracking-[-0.02em]"
                            style={{ fontSize: "clamp(1.8rem, 4vw, 4.5rem)" }}
                        >
                            <span className="block text-white">
                                {t.duringMarketCrises}
                            </span>
                            <span className="block text-white/30">
                                {t.ourSystemDelivers}
                            </span>
                        </h2>
                    </div>

                    {/* Text content */}
                    <div className="max-w-xl">
                        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#5EEAD4]/50 mb-5">
                            {t.crisisAlpha}
                        </p>
                        <h3 className="text-2xl font-mono font-light text-white leading-[1.15] mb-6">
                            {t.the2022}{" "}
                            <span
                                className="font-normal"
                                style={{
                                    background: "linear-gradient(135deg, #5EEAD4, #268197)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {t.stressTest}
                            </span>
                        </h3>
                        <p className="text-[14px] text-white/45 leading-[1.85] font-mono font-light">
                            {t.paragraph}{" "}
                            <span className="text-white/70 font-normal">{t.monetizedTheChaos}</span>,
                            {" "}{t.delivering}{" "}
                            <span className="font-medium" style={{ color: "#5EEAD4" }}>
                                {returns.volPrem}% {t.netReturns}
                            </span>{" "}
                            {t.whileBenchmarkFell}{" "}
                            <span className="font-medium text-white/60">{returns.msci}%</span>.
                        </p>

                        {/* Key stat callout */}
                        <div className="mt-10 flex items-center gap-6 border-t border-white/[0.06] pt-6">
                            <div>
                                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-1">
                                    {t.performanceSpread}
                                </p>
                                <p
                                    className="text-2xl font-mono font-light tabular-nums"
                                    style={{
                                        background: "linear-gradient(135deg, #5EEAD4, #268197)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {spreadFormatted}%
                                </p>
                            </div>
                            <div className="w-[1px] h-10 bg-white/[0.06]" />
                            <div>
                                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-1">
                                    {t.correlationToBenchmark}
                                </p>
                                <p className="text-2xl font-mono font-light tabular-nums text-white/70">
                                    −0.82
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Chart — full width */}
                    <div className="w-auto -mx-[10px]" style={{ height: "55vh" }}>
                        <StressTestChart2022 />
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                DESKTOP LAYOUT — scroll-driven animation
            ═══════════════════════════════════════════════════════ */}
            <div ref={containerRef} className="hidden md:block" style={{ height: "300vh" }}>
                {/* Sticky viewport — pins for the duration */}
                <div
                    className="sticky top-0 h-screen overflow-hidden border-y border-white/[0.04] flex items-center py-[45px]"
                    style={{ backgroundColor: "#050A0C" }}
                >
                    {/* Faint isometric grid pattern overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: `
                                linear-gradient(30deg, #ffffff 1px, transparent 1px),
                                linear-gradient(150deg, #ffffff 1px, transparent 1px)
                            `,
                            backgroundSize: "60px 34px",
                        }}
                    />

                    <div className="relative z-10 w-[98%] max-w-[1700px] mx-auto px-4 md:px-8 h-full flex flex-col">
                        {/* Section header — stays pinned at top */}
                        <div className="pt-8 md:pt-12 pb-4 pointer-events-none select-none">
                            <h2
                                className="font-mono font-bold uppercase leading-[0.95] tracking-[-0.02em]"
                                style={{ fontSize: "clamp(1.8rem, 4vw, 4.5rem)" }}
                            >
                                <span className="block text-white">
                                    {t.duringMarketCrises}
                                </span>
                                <span className="block text-white/30">
                                    {t.ourSystemDelivers}
                                </span>
                            </h2>
                        </div>

                        {/* Relative container for absolute positioning */}
                        <div className="relative flex-1">
                            {/* Left: Copy — slides out to the left */}
                            <motion.div
                                className="absolute left-0 top-1/2 max-w-xl"
                                style={{
                                    x: textX,
                                    opacity: textOpacity,
                                    width: "38%",
                                    y: "-50%",
                                }}
                            >
                                {/* Eyebrow */}
                                <p className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-[#5EEAD4]/50 mb-5">
                                    {t.crisisAlpha}
                                </p>

                                {/* Headline */}
                                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-mono font-light text-white leading-[1.15] mb-8">
                                    {t.the2022}{" "}
                                    <span
                                        className="font-normal"
                                        style={{
                                            background: "linear-gradient(135deg, #5EEAD4, #268197)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {t.stressTest}
                                    </span>
                                </h2>

                                {/* Body */}
                                <p className="text-[15px] md:text-base text-white/45 leading-[1.85] font-mono font-light">
                                    {t.paragraph}{" "}
                                    <span className="text-white/70 font-normal">{t.monetizedTheChaos}</span>,
                                    {" "}{t.delivering}{" "}
                                    <span
                                        className="font-medium"
                                        style={{ color: "#5EEAD4" }}
                                    >
                                        {returns.volPrem}% {t.netReturns}
                                    </span>{" "}
                                    {t.whileBenchmarkFell}{" "}
                                    <span className="font-medium text-white/60">
                                        {returns.msci}%
                                    </span>.
                                </p>

                                {/* Key stat callout */}
                                <div className="mt-16 md:mt-20 flex items-center gap-6 border-t border-white/[0.06] pt-8">
                                    <div>
                                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-1">
                                            {t.performanceSpread}
                                        </p>
                                        <p
                                            className="text-3xl md:text-4xl font-mono font-light tabular-nums"
                                            style={{
                                                background: "linear-gradient(135deg, #5EEAD4, #268197)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                            {spreadFormatted}%
                                        </p>
                                    </div>
                                    <div className="w-[1px] h-12 bg-white/[0.06]" />
                                    <div>
                                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-1">
                                            {t.correlationToBenchmark}
                                        </p>
                                        <p className="text-3xl md:text-4xl font-mono font-light tabular-nums text-white/70">
                                            −0.82
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right: Chart — container resizes, ResponsiveContainer redraws */}
                            <motion.div
                                className="absolute top-1/2"
                                style={{
                                    left: chartLeft,
                                    width: chartWidth,
                                    height: chartHeight,
                                    fontSize: chartFontSize,
                                    y: "-50%",
                                    willChange: "left, width, height",
                                }}
                            >
                                <StressTestChart2022 />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
