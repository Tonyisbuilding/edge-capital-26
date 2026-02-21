import { useState } from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { toast } from "react-toastify";
import BtnCArrow from "@/assets/icons/btn-c-arrow.svg";
import NewsletterImg from "@/assets/images/landingPage/newsletter-img.png";

const translations = {
    en: {
        heading: "Subscribe to our newsletter",
        description:
            "Subscribe to receive periodic performance updates, detailed portfolio insights, and commentary on market developments, including how our strategies respond to changing conditions.",
        placeholder: "Enter your email address",
        subscribe: "Subscribe",
        submitting: "Sending...",
        success: "You've been subscribed!",
        error: "Something went wrong. Please try again.",
    },
    nl: {
        heading: "Schrijf u in voor onze nieuwsbrief",
        description:
            "Schrijf u in om periodieke prestatie-updates te ontvangen, gedetailleerde portfolio-inzichten en commentaar op marktontwikkelingen, inclusief hoe onze strategieën reageren op veranderende omstandigheden.",
        placeholder: "Vul uw e-mailadres in",
        subscribe: "Inschrijven",
        submitting: "Verzenden...",
        success: "U bent ingeschreven!",
        error: "Er is iets misgegaan. Probeer het opnieuw.",
    },
};

export function Newsletter() {
    const { language } = useChangeLanguageContext();
    const t = translations[language] || translations.en;
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await submitToGoogleSheet({
                formSlug: "newsletter",
                payload: { email },
            });
            toast.success(t.success);
            setEmail("");
        } catch {
            toast.error(t.error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-[#F6FEFF] py-16 md:py-20 px-[10px] md:px-8">
            <div className="w-[98%] max-w-[1700px] mx-auto">
                {/* Outer teal card with padding on all sides */}
                <div
                    className="rounded-2xl overflow-hidden p-6 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-6"
                    style={{ backgroundColor: "#1A6B7A" }}
                >
                    {/* Left — text at top, input at bottom, gap fills between */}
                    <div className="flex flex-col justify-between">
                        {/* Text content — top */}
                        <div>
                            <h2
                                className="font-serif font-bold text-white leading-tight mb-4"
                                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                            >
                                {t.heading}
                            </h2>
                            <p className="text-white/70 text-sm md:text-[15px] leading-relaxed max-w-lg">
                                {t.description}
                            </p>
                        </div>

                        {/* Email form — bottom */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-10 flex items-center max-w-lg rounded-lg p-[3px]"
                            style={{ backgroundColor: "#EAF7FA" }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.placeholder}
                                required
                                className="flex-1 h-11 px-4 bg-transparent text-[#02080A] text-sm font-mono placeholder:text-[#02080A]/40 outline-none border-0"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-11 px-5 bg-[#0A3A44] hover:bg-[#0D4D5A] text-white font-mono text-sm tracking-wide flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-70 whitespace-nowrap"
                                style={{ borderRadius: "8px" }}
                            >
                                {isSubmitting ? t.submitting : t.subscribe}
                                <img src={BtnCArrow} alt="" className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Right — image with relative height */}
                    <div className="hidden md:block rounded-xl overflow-hidden"
                        style={{ width: "clamp(300px, 30vw, 480px)" }}
                    >
                        <img
                            src={NewsletterImg}
                            alt="Newsletter"
                            className="w-full object-cover rounded-xl"
                            style={{ height: "clamp(300px, 30vw, 480px)" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
