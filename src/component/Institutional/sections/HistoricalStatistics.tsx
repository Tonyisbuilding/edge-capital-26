import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import BtnCArrow from "@/assets/icons/btn-c-arrow.svg";

/* ═══════════════════════════════════════════════════
   Data Room Modal URL
   ═══════════════════════════════════════════════════ */
const DATAROOM_URL =
    "https://www.dropbox.com/scl/fo/t7xrozcdazt0k90h3kpkl/AAl69zD2_ZSc1E6tGOZPulY?rlkey=8q6uaigamgsmegw22xp2skrb7&st=w0mwbbci&dl=0";

/* ═══════════════════════════════════════════════════
   Fund data
   ═══════════════════════════════════════════════════ */
interface FundData {
    name: string;
    tag: string;
    stats: { label: string; labelNl: string; value: string; suffix?: string }[];
}

const FUNDS: FundData[] = [
    {
        name: "Volatility Premium Risk Fund",
        tag: "Index Options",
        stats: [
            { label: "Net CAGR", labelNl: "Netto CAGR", value: "+23.83%", suffix: " p.a." },
            { label: "Max Drawdown", labelNl: "Max Drawdown", value: "−7.07%" },
            { label: "Realised Vol (ann.)", labelNl: "Gerealiseerde Vol (jr.)", value: "12.23%" },
            { label: "Beta vs MSCI World\nNR EUR", labelNl: "Bèta vs MSCI World\nNR EUR", value: "−0.15" },
        ],
    },
    {
        name: "FX Correlation Arbitrage Fund",
        tag: "G10 FX",
        stats: [
            { label: "Net CAGR", labelNl: "Netto CAGR", value: "+14.35%", suffix: " p.a." },
            { label: "Max Drawdown\n(post-upgrade, Nov 2022)", labelNl: "Max Drawdown\n(na upgrade, nov 2022)", value: "−1.72%" },
            { label: "Realised Vol\n(ann., post-upgrade)", labelNl: "Gerealiseerde Vol\n(jr., na upgrade)", value: "3.80%" },
            { label: "Beta vs MSCI World\nNR EUR", labelNl: "Bèta vs MSCI World\nNR EUR", value: "0.047" },
        ],
    },
];

const CYCLE_INTERVAL = 10000; // 10 seconds

/* ═══════════════════════════════════════════════════
   Counter Animation Hook
   Extracts the numeric part from a string like "+23.83%"
   and animates it counting up from 0.
   ═══════════════════════════════════════════════════ */
function useCounterAnimation(targetValue: string, duration = 1200) {
    const [display, setDisplay] = useState(targetValue);
    const frameRef = useRef<number | null>(null);
    const prevTarget = useRef(targetValue);

    const animate = useCallback(
        (to: string) => {
            // Extract prefix (e.g. "+" or "−"), number, and suffix (e.g. "%")
            const match = to.match(/^([+−\-]?)(\d+\.?\d*)(.*$)/);
            if (!match) {
                setDisplay(to);
                return;
            }
            const prefix = match[1];
            const targetNum = parseFloat(match[2]);
            const suffix = match[3];
            const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
            const t0 = performance.now();

            const tick = (now: number) => {
                const p = Math.min((now - t0) / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - p, 3);
                const current = eased * targetNum;
                setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
                if (p < 1) frameRef.current = requestAnimationFrame(tick);
                else setDisplay(to);
            };

            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(tick);
        },
        [duration]
    );

    useEffect(() => {
        if (targetValue !== prevTarget.current) {
            animate(targetValue);
            prevTarget.current = targetValue;
        }
    }, [targetValue, animate]);

    useEffect(
        () => () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        },
        []
    );

    return display;
}

/* ═══════════════════════════════════════════════════
   Counter value display component
   ═══════════════════════════════════════════════════ */
function CounterValue({ value, suffix }: { value: string; suffix?: string }) {
    const display = useCounterAnimation(value, 1000);
    return (
        <>
            {display}
            {suffix && <span style={{ WebkitTextFillColor: "#6C898F", fontSize: "clamp(14px, 1.5vw, 22px)", fontWeight: 400 }}>{suffix}</span>}
        </>
    );
}

/* ═══════════════════════════════════════════════════
   Translations
   ═══════════════════════════════════════════════════ */
const translations = {
    en: {
        modalTitle: "Download information",
        modalSubtitle: "Fill in your details and we'll send you a link to all brochures.",
        namePlaceholder: "First and last name",
        emailPlaceholder: "E-mail address",
        phonePlaceholder: "Phone number",
        checkboxLabel: "I would like to subscribe to the Edge Capital newsletter.",
        submit: "Submit",
        submitting: "Submitting...",
    },
    nl: {
        modalTitle: "Download informatie",
        modalSubtitle: "Vul uw gegevens in en we sturen u een link naar alle brochures.",
        namePlaceholder: "Voor en achternaam",
        emailPlaceholder: "E-mailadres",
        phonePlaceholder: "Telefoonnummer",
        checkboxLabel: "Ik wil me graag inschrijven voor de Edge Capital nieuwsbrief.",
        submit: "Verzenden",
        submitting: "Bezig met verzenden...",
    },
};

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
export function HistoricalStatistics() {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;

    /* Fund cycling with progress */
    const [activeFund, setActiveFund] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef<number | null>(null);
    const startTimeRef = useRef(performance.now());

    useEffect(() => {
        startTimeRef.current = performance.now();

        const tick = () => {
            const elapsed = performance.now() - startTimeRef.current;
            const p = Math.min(elapsed / CYCLE_INTERVAL, 1);
            setProgress(p);

            if (p >= 1) {
                setActiveFund((prev) => (prev + 1) % FUNDS.length);
                startTimeRef.current = performance.now();
                setProgress(0);
            }
            progressRef.current = requestAnimationFrame(tick);
        };

        progressRef.current = requestAnimationFrame(tick);
        return () => {
            if (progressRef.current) cancelAnimationFrame(progressRef.current);
        };
    }, [activeFund]);

    const fund = FUNDS[activeFund];

    /* Data room modal */
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [agreeQuote, setAgreeQuote] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitToGoogleSheet({
                formSlug: "dataroom",
                payload: { ...formData, agreeQuote },
            });
            toast.success(
                language === "nl"
                    ? "Formulier succesvol verzonden!"
                    : "Form submitted successfully!"
            );
            setFormData({ name: "", email: "", phone: "" });
            setAgreeQuote(false);
            setShowModal(false);
            window.open(DATAROOM_URL, "_blank");
        } catch (error) {
            const fallbackMessage =
                language === "nl"
                    ? "Versturen is mislukt. Probeer opnieuw."
                    : "Submission failed. Please try again.";
            toast.error((error as Error)?.message || fallbackMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="relative z-10 bg-[#050A0C] py-20 px-[10px] md:px-8 border-b border-institutional-charcoal/30">
                <div className="w-[98%] max-w-[1700px] mx-auto">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                        <div>
                            <span
                                className="block font-mono tracking-[0.2em] uppercase text-[#5A8A8F] mb-2"
                                style={{ fontSize: "clamp(11px, 1.2vw, 14px)" }}
                            >
                                Performance
                            </span>
                            <h2
                                className="font-mono font-bold text-white leading-tight"
                                style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)" }}
                            >
                                Historical Statistics
                            </h2>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-[#1A3A42] hover:bg-[#24505B] text-white font-mono text-sm tracking-wide px-6 py-3 rounded-full transition-colors cursor-pointer self-start md:self-auto"
                        >
                            Performance
                            <img src={BtnCArrow} alt="" className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Fund indicator — full-width tabs with progress */}
                    <div className="grid grid-cols-2 mb-8">
                        {FUNDS.map((f, i) => {
                            const isActive = i === activeFund;
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setActiveFund(i);
                                        startTimeRef.current = performance.now();
                                        setProgress(0);
                                    }}
                                    className={`relative overflow-hidden font-mono text-xs md:text-sm tracking-wide py-3 md:py-4 text-left pl-4 md:pl-5 transition-colors duration-400 cursor-pointer ${isActive
                                        ? "text-white"
                                        : "text-white/35 hover:text-white/55"
                                        }`}
                                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    {/* Progress fill */}
                                    <span
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            backgroundColor: "rgba(73,172,199,0.12)",
                                            width: isActive ? `${progress * 100}%` : "0%",
                                        }}
                                    />
                                    <span className="relative z-10">{f.name}</span>
                                    {/* Active/completed bottom line */}
                                    <span
                                        className="absolute bottom-0 left-0 h-[2px] bg-[#49ACC7] transition-all duration-300"
                                        style={{
                                            width: isActive ? `${progress * 100}%` : "0%",
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
                        {fund.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col justify-between pl-6 lg:pl-10 relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Gradient Border/Divider */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-[1px]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, transparent 0%, #FCFFFF 29%, #49ACC7 48%, #FCFFFF 67%, transparent 100%)",
                                    }}
                                />

                                <h4 className="text-white text-[11px] md:text-[14px] font-medium leading-tight mb-8 md:mb-12 opacity-80 max-w-[220px] whitespace-pre-line">
                                    {language === "nl" ? stat.labelNl : stat.label}
                                </h4>
                                <span
                                    className="text-[28px] md:text-[42px] lg:text-[38px] font-semibold leading-none tracking-tight bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #F4FFFF 0%, #6C898F 100%)",
                                        display: "inline-block",
                                    }}
                                >
                                    <CounterValue value={stat.value} suffix={stat.suffix} />
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Room Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    onClick={() => setShowModal(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal Card */}
                    <div
                        className="relative z-10 w-[95%] max-w-2xl bg-[#E1EFF2] rounded-2xl shadow-xl p-8 md:p-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#02080A]/20 text-[#02080A]/60 hover:text-[#02080A] hover:border-[#02080A]/40 transition-colors cursor-pointer"
                            onClick={() => setShowModal(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Modal Header */}
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#02080A] mb-2">
                            {t.modalTitle}
                        </h2>
                        <p className="text-[#02080A]/60 text-sm mb-6">{t.modalSubtitle}</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t.namePlaceholder}
                                    className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition border-b border-[#02080A]/15"
                                    style={{ backgroundColor: "#F6FEFF" }}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t.emailPlaceholder}
                                    className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition border-b border-[#02080A]/15"
                                    style={{ backgroundColor: "#F6FEFF" }}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t.phonePlaceholder}
                                    className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition border-b border-[#02080A]/15"
                                    style={{ backgroundColor: "#F6FEFF" }}
                                />
                            </div>
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="agreeQuoteStats"
                                    checked={agreeQuote}
                                    onChange={(e) => setAgreeQuote(e.target.checked)}
                                    className="w-5 h-5 mt-0.5 border-2 border-[#D3E8EC] rounded accent-[#005569] flex-shrink-0"
                                />
                                <label htmlFor="agreeQuoteStats" className="text-sm text-[#02080A]/70 leading-snug">
                                    {t.checkboxLabel}
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#005569] text-white py-3 px-8 rounded-full font-medium hover:bg-[#006d7a] transition-colors duration-300 disabled:opacity-70 cursor-pointer"
                            >
                                {isSubmitting ? t.submitting : t.submit}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
