import React, { useState, useEffect } from 'react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LeadFormSectionProps {
    initialEmail?: string;
    sectionRef?: React.RefObject<HTMLDivElement>;
}

const LeadFormSection = ({ initialEmail, sectionRef }: LeadFormSectionProps) => {
    const { language } = useChangeLanguageContext();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        amount: '',
        objective: '',
        experience: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialEmail) {
            setFormData(prev => ({ ...prev, email: initialEmail }));
        }
    }, [initialEmail]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitToGoogleSheet({
                formSlug: 'EC-Campaign',
                payload: { ...formData, type: 'Full' }
            });
            toast.success(language === 'en' ? "Thank you! We will contact you shortly." : "Bedankt! We nemen spoedig contact met u op.");
            setFormData({
                name: '',
                phone: '',
                email: '',
                amount: '',
                objective: '',
                experience: ''
            });
        } catch (error) {
            console.error(error);
            const rawMessage = (error as Error)?.message;
            // Fallback messages
            const fallback = language === 'en' ? "Something went wrong. Please try again." : "Er is iets misgegaan. Probeer het opnieuw.";

            // Show explicit error if it's about the slug/tab, otherwise fallback
            // Note: The backend script ideally returns a clear message if the tab is missing.
            // We display rawMessage if available to help debugging.
            toast.error(rawMessage || fallback);
        } finally {
            setIsSubmitting(false);
        }
    };

    const translations = {
        en: {
            badge: "Start investing smarter today",
            subtitle: "Please fill out the form below and we will contact you within 24 hours.",
            labels: {
                name: "Name",
                phone: "Phone number",
                email: "Email address",
                amount: "Investment amount",
                objective: "Investment objective",
                experience: "Do you have experience with investing?"
            },
            placeholders: {
                name: "Your full name",
                phone: "Your phone number",
                email: "yourname@gmail.com",
                amount: "Select amount",
                objective: "Select objective"
            },
            options: {
                amount: {
                    lt100k: "< € 100,000.",
                    btwn100k250k: "€ 100,000,- - € 250,000.",
                    gt250k: "> € 250,000."
                },
                objective: {
                    passive: "Passive income",
                    pension: "Strengthen pension",
                    diversification: "Portfolio diversification",
                    protection: "Protection against volatility"
                },
                experience: {
                    yes: "Yes, I have experience",
                    no: "No, I am a beginner"
                }
            },
            submit: "Contact us",
            submitting: "Sending..."
        },
        nl: {
            badge: "Start vandaag met slimmer beleggen",
            subtitle: "Vul onderstaand formulier in en wij nemen binnen 24 uur contact met u op.",
            labels: {
                name: "Naam",
                phone: "Telefoonnummer",
                email: "E-mailadres",
                amount: "Inlegbedrag",
                objective: "Beleggingsdoel",
                experience: "Heeft u ervaring met beleggen?"
            },
            placeholders: {
                name: "Uw volledige naam",
                phone: "Uw telefoonnummer",
                email: "uw-naam@gmail.com",
                amount: "Selecteer bedrag",
                objective: "Selecteer doel"
            },
            options: {
                amount: {
                    lt100k: "< € 100.000,-",
                    btwn100k250k: "€ 100.000,- - € 250.000,-",
                    gt250k: "> € 250.000,-"
                },
                objective: {
                    passive: "Passief inkomen",
                    pension: "Pensioen verstevigen",
                    diversification: "Portfolio spreiding",
                    protection: "Bescherming tegen volatiliteit"
                },
                experience: {
                    yes: "Ja, ik heb ervaring",
                    no: "Nee, ik ben een beginner"
                }
            },
            submit: "Neem contact op",
            submitting: "Verzenden..."
        }
    };

    const t = translations[language];

    return (
        <section className="ec-lead-form-section" ref={sectionRef}>
            <div className="ec-form-container">
                <div className="ec-form-header">
                    <span className="ec-form-badge">{t.badge}</span>
                    <p className="ec-form-subtitle">{t.subtitle}</p>
                </div>

                <form className="ec-lead-form" onSubmit={handleSubmit}>
                    <div className="ec-form-row col-2">
                        <div className="ec-form-group">
                            <label htmlFor="name">{t.labels.name} <span className="required">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder={t.placeholders.name}
                                value={formData.name}
                                onChange={handleChange}
                                className="ec-form-input"
                                required
                            />
                        </div>
                        <div className="ec-form-group">
                            <label htmlFor="phone">{t.labels.phone} <span className="required">*</span></label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder={t.placeholders.phone}
                                value={formData.phone}
                                onChange={handleChange}
                                className="ec-form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="ec-form-row">
                        <div className="ec-form-group">
                            <label htmlFor="email">{t.labels.email} <span className="required">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={t.placeholders.email}
                                value={formData.email}
                                onChange={handleChange}
                                className="ec-form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="ec-form-row">
                        <div className="ec-form-group">
                            <label htmlFor="amount">{t.labels.amount}</label>
                            <select
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="ec-form-select"
                            >
                                <option value="" disabled>{t.placeholders.amount}</option>
                                <option value="lt100k">{t.options.amount.lt100k}</option>
                                <option value="100k-250k">{t.options.amount.btwn100k250k}</option>
                                <option value="gt250k">{t.options.amount.gt250k}</option>
                            </select>
                        </div>
                    </div>

                    <div className="ec-form-row">
                        <div className="ec-form-group">
                            <label htmlFor="objective">{t.labels.objective}</label>
                            <select
                                id="objective"
                                name="objective"
                                value={formData.objective}
                                onChange={handleChange}
                                className="ec-form-select"
                            >
                                <option value="" disabled>{t.placeholders.objective}</option>
                                <option value="passive">{t.options.objective.passive}</option>
                                <option value="pension">{t.options.objective.pension}</option>
                                <option value="diversification">{t.options.objective.diversification}</option>
                                <option value="protection">{t.options.objective.protection}</option>
                            </select>
                        </div>
                    </div>

                    <div className="ec-form-row">
                        <div className="ec-form-group">
                            <label className="radio-group-label">{t.labels.experience}</label>
                            <div className="ec-radio-group">
                                <label className="ec-radio-option">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="yes"
                                        checked={formData.experience === 'yes'}
                                        onChange={handleChange}
                                    />
                                    <span className="ec-radio-text">{t.options.experience.yes}</span>
                                </label>
                                <label className="ec-radio-option">
                                    <input
                                        type="radio"
                                        name="experience"
                                        value="no"
                                        checked={formData.experience === 'no'}
                                        onChange={handleChange}
                                    />
                                    <span className="ec-radio-text">{t.options.experience.no}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ec-form-actions">
                        <button type="submit" className="ec-submit-button" disabled={isSubmitting}>
                            {isSubmitting ? t.submitting : t.submit}
                        </button>
                    </div>
                </form>
                <ToastContainer autoClose={5000} />
            </div>
        </section>
    );
};

export default LeadFormSection;
