import { useState } from "react";
import { Button } from "@/component/Institutional/ui/Button";
import { InteractiveGrid } from "@/component/Institutional/ui/InteractiveGrid";
import { Landmark, ChevronRight, X } from "lucide-react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { toast } from "react-toastify";
import BtnCArrow from "@/assets/icons/btn-c-arrow.svg";

const DATAROOM_URL =
    "https://www.dropbox.com/scl/fo/t7xrozcdazt0k90h3kpkl/AAl69zD2_ZSc1E6tGOZPulY?rlkey=8q6uaigamgsmegw22xp2skrb7&st=w0mwbbci&dl=0";

const translations = {
    en: {
        the: "The",
        stressRegime: "Stress-Regime",
        alphaPlatform: "Alpha Platform",
        subtitle: "What we do",
        description:
            "We monetize the measurable mechanisms of market stress—volatility repricing, dispersion, and correlation stress—across highly liquid G10 FX and exchange-traded equity index derivatives (SPX/ES options & futures), built for unstable and unpredictable regimes and designed to deliver a liquid return stream that is less dependent on equity/interest rate beta than traditional portfolios.",
        requestCall: "Request Call",
        enterDataRoom: "Enter Data Room",
        // Modal
        modalTitle: "Download information",
        modalSubtitle:
            "Fill in your details and we'll send you a link to all brochures.",
        namePlaceholder: "First and last name",
        emailPlaceholder: "E-mail address",
        phonePlaceholder: "Phone number",
        checkboxLabel:
            "I would like a free customized quote for favorable prices and more.",
        submit: "Submit",
        submitting: "Submitting...",
    },
    nl: {
        the: "Het",
        stressRegime: "Stress-Regime",
        alphaPlatform: "Alpha Platform",
        subtitle: "Wat wij doen",
        description:
            "Wij monetariseren de meetbare mechanismen van marktstress—volatiliteitsherprijzing, dispersie en correlatiestress—via zeer liquide G10 FX- en beursgenoteerde aandelenindexderivaten (SPX/ES-opties & futures), gebouwd voor instabiele en onvoorspelbare regimes en ontworpen om een liquide rendementsstroom te leveren die minder afhankelijk is van aandelen-/rentebèta dan traditionele portefeuilles.",
        requestCall: "Gesprek aanvragen",
        enterDataRoom: "Data Room openen",
        // Modal
        modalTitle: "Download informatie",
        modalSubtitle:
            "Vul uw gegevens in en we sturen u een link naar alle brochures.",
        namePlaceholder: "Voor en achternaam",
        emailPlaceholder: "E-mailadres",
        phonePlaceholder: "Telefoonnummer",
        checkboxLabel:
            "Ik wil gratis een op maat gemaakte offerte voor gunstige prijzen en meer.",
        submit: "Verzenden",
        submitting: "Bezig met verzenden...",
    },
};

export function Hero() {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
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

            // Redirect to Dropbox data room
            window.open(DATAROOM_URL, "_blank");
        } catch (error) {
            const fallbackMessage =
                language === "nl"
                    ? "Versturen is mislukt. Probeer opnieuw."
                    : "Submission failed. Please try again.";
            const message = (error as Error)?.message || fallbackMessage;
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="relative min-h-screen w-full bg-[#05090A] overflow-hidden flex flex-col justify-center">
                {/* Background Grid */}
                <InteractiveGrid className="opacity-40" />

                <div className="relative z-10 w-full max-w-[1700px] mx-auto pt-32 pb-16 md:pt-40 md:pb-24 px-[clamp(10px,3vw,48px)]">
                    {/* Headline Area */}
                    <div className="flex flex-col justify-center">
                        <h1 className="font-mono text-white leading-[1.1] tracking-tight font-bold">
                            {/* Line 1: "The" + "Stress-Regime" */}
                            <div
                                className="flex flex-col md:flex-row items-start md:items-center"
                                style={{ gap: "0.4rem" }}
                            >
                                <span
                                    className="text-[clamp(2.5rem,7vw,7rem)] px-[clamp(8px,1.5vw,16px)] py-2 inline-block"
                                    style={{ backgroundColor: "#091114" }}
                                >
                                    {t.the}
                                </span>
                                <span
                                    className="text-[clamp(2.5rem,7vw,7rem)] px-[clamp(8px,1.5vw,16px)] py-2 inline-block"
                                    style={{ backgroundColor: "#091114" }}
                                >
                                    {t.stressRegime}
                                </span>
                            </div>
                            {/* Line 2: "Alpha Platform" */}
                            <div
                                className="flex"
                                style={{ gap: "0.4rem", marginTop: "0.4rem" }}
                            >
                                <span
                                    className="text-[clamp(2.5rem,7vw,7rem)] px-[clamp(8px,1.5vw,16px)] py-2 inline-block"
                                    style={{ backgroundColor: "#091114" }}
                                >
                                    {t.alphaPlatform}
                                </span>
                            </div>
                        </h1>
                    </div>

                    {/* Sub-header + Button group — flush right on mobile, offset right on desktop */}
                    <div
                        className="flex flex-col items-stretch md:ml-[50%] md:max-w-[700px] md:min-w-[600px]"
                        style={{
                            gap: "0.4rem",
                            marginTop: "0.5rem",
                            marginRight: "calc(-1 * clamp(10px, 3vw, 48px))",
                        }}
                    >
                        {/* Sub-header container */}
                        <div
                            className="p-[clamp(16px,3vw,24px)]"
                            style={{ backgroundColor: "#091114" }}
                        >
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <Landmark className="w-5 h-5 text-institutional-slate" />
                                <span className="text-institutional-slate font-mono text-sm tracking-wide">
                                    {t.subtitle}
                                </span>
                            </div>

                            {/* Card Content */}
                            <p className="text-institutional-slate/80 leading-relaxed font-mono text-[clamp(0.875rem,2vw,1.5rem)]">
                                {t.description}
                            </p>
                        </div>

                        {/* Button container — two buttons side by side */}
                        <div
                            className="px-[clamp(16px,3vw,24px)] py-4 flex flex-nowrap items-center gap-3"
                            style={{ backgroundColor: "#091114" }}
                        >
                            <Button
                                className="bg-white text-black hover:bg-white/90 font-mono text-xs md:text-sm h-10 md:h-12 px-4 md:px-6 flex items-center gap-2 whitespace-nowrap"
                                onClick={() =>
                                    window.open("https://calendar.notion.so/meet/aronbroeken/mrsnj4pep", "_blank")
                                }
                            >
                                {t.requestCall}
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                            <Button
                                className="bg-white text-black hover:bg-white/90 font-mono text-xs md:text-sm h-10 md:h-12 px-4 md:px-6 flex items-center gap-2 whitespace-nowrap"
                                onClick={() => setShowModal(true)}
                            >
                                {t.enterDataRoom}
                                <img
                                    src={BtnCArrow}
                                    alt=""
                                    className="w-4 h-4"
                                    style={{ filter: 'brightness(0)' }}
                                />
                            </Button>
                        </div>
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
                        <p className="text-[#02080A]/60 text-sm mb-6">
                            {t.modalSubtitle}
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name — full width */}
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

                            {/* Email + Phone — side by side */}
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

                            {/* Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="agreeQuote"
                                    checked={agreeQuote}
                                    onChange={(e) =>
                                        setAgreeQuote(e.target.checked)
                                    }
                                    className="w-5 h-5 mt-0.5 border-2 border-[#D3E8EC] rounded accent-[#005569] flex-shrink-0"
                                />
                                <label
                                    htmlFor="agreeQuote"
                                    className="text-sm text-[#02080A]/70 leading-snug"
                                >
                                    {t.checkboxLabel}
                                </label>
                            </div>

                            {/* Submit */}
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
