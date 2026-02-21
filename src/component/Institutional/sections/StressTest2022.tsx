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
        paragraph: "In 2022, the traditional 60/40 framework suffered as inflation and rate repricing forced stocks and bonds to fall together. In that same window, Edge Capital\u2019s institutional engines didn\u2019t just survive, they monetized the chaos and delivered a",
        volReturn: "+28.35% net return",
        whileBenchmark: "while the global benchmark fell \u221219.27% (MSCI World).",
        enginesLabel: "ENGINES (2022, net)",
        volEngine: "Volatility Engine",
        corrArbEngine: "FX Corr Arb Engine",
        globalBenchmark: "Global benchmark (URTH)",
        performanceSpread: "PERFORMANCE SPREAD (vs benchmark)",
        correlationToBenchmark: "CORRELATION TO BENCHMARK (equity-curve, 2022)",
    },
    nl: {
        duringMarketCrises: "Tijdens marktcrises,",
        ourSystemDelivers: "levert ons systeem.",
        crisisAlpha: "Crisis Alpha",
        the2022: "De 2022",
        stressTest: "Stresstest.",
        paragraph: "In 2022 leed het traditionele 60/40-raamwerk doordat inflatie en renteherprijzing aandelen en obligaties gelijktijdig deden dalen. In diezelfde periode hebben de institutionele engines van Edge Capital niet alleen overleefd, ze monetariseerden de chaos en leverden een",
        volReturn: "+28,35% nettorendement",
        whileBenchmark: "terwijl de wereldwijde benchmark \u221219,27% daalde (MSCI World).",
        enginesLabel: "ENGINES (2022, netto)",
        volEngine: "Volatility Engine",
        corrArbEngine: "FX Corr Arb Engine",
        globalBenchmark: "Wereldwijde benchmark (URTH)",
        performanceSpread: "PRESTATIESPREIDING (vs benchmark)",
        correlationToBenchmark: "CORRELATIE MET BENCHMARK (equity-curve, 2022)",
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

    // Hardcoded performance values
    const volPrem = "+28.35";
    const corrArb = "+18.60";
    const msci = "−19.27";

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

                    <div className="max-w-xl">
                        <h3 className="text-2xl font-mono font-light text-white leading-[1.15] mb-3">
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
                        <p className="text-[14px] text-white/65 leading-[1.85] font-mono font-light">
                            {t.paragraph}{" "}
                            <span className="font-medium" style={{ color: "#5EEAD4" }}>
                                {t.volReturn}
                            </span>{" "}
                            {t.whileBenchmark}
                        </p>

                        {/* Key stat callout — 2 blocks */}
                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6">
                            {/* Performance Spread */}
                            <div>
                                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-3 max-w-[180px]">
                                    {t.performanceSpread}
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[11px] font-mono text-white/50 mb-1">{t.volEngine}</p>
                                        <p className="text-xl font-mono font-medium" style={{ color: "#5EEAD4" }}>+47.62%</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-mono text-white/50 mb-1">{t.corrArbEngine}</p>
                                        <p className="text-xl font-mono font-medium" style={{ color: "#5EEAD4" }}>+37.87%</p>
                                    </div>
                                </div>
                            </div>
                            {/* Correlation */}
                            <div>
                                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-3 max-w-[180px]">
                                    {t.correlationToBenchmark}
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[11px] font-mono text-white/50 mb-1">{t.volEngine}</p>
                                        <p className="text-xl font-mono font-medium text-white/90">−0.80</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-mono text-white/50 mb-1">{t.corrArbEngine}</p>
                                        <p className="text-xl font-mono font-medium text-white/90">−0.59</p>
                                    </div>
                                </div>
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
                                {/* Headline */}
                                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-mono font-light text-white leading-[1.15] mb-4">
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
                                <p className="text-[15px] md:text-base text-white/65 leading-[1.85] font-mono font-light">
                                    {t.paragraph}{" "}
                                    <span className="font-medium" style={{ color: "#5EEAD4" }}>
                                        {t.volReturn}
                                    </span>{" "}
                                    {t.whileBenchmark}
                                </p>

                                {/* Key stat callout — 2 blocks */}
                                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-8">
                                    {/* Performance Spread */}
                                    <div>
                                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-3 max-w-[180px]">
                                            {t.performanceSpread}
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[11px] font-mono text-white/50 mb-1">{t.volEngine}</p>
                                                <p className="text-2xl font-mono font-medium" style={{ color: "#5EEAD4" }}>+47.62%</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-mono text-white/50 mb-1">{t.corrArbEngine}</p>
                                                <p className="text-2xl font-mono font-medium" style={{ color: "#5EEAD4" }}>+37.87%</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Correlation */}
                                    <div>
                                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/50 mb-3 max-w-[180px]">
                                            {t.correlationToBenchmark}
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[11px] font-mono text-white/50 mb-1">{t.volEngine}</p>
                                                <p className="text-2xl font-mono font-medium text-white/90">−0.80</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-mono text-white/50 mb-1">{t.corrArbEngine}</p>
                                                <p className="text-2xl font-mono font-medium text-white/90">−0.59</p>
                                            </div>
                                        </div>
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
