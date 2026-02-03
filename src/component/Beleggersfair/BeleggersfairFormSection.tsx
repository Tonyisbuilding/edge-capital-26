import React, { useState } from "react";
import "./BeleggersfairFormSection.css";
import images from "@/constant/images";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const FORM_COPY = {
  nl: {
    title: "Blijf op de hoogte van onze strategieën",
    nameLabel: "Naam",
    namePlaceholder: "Uw volledige naam",
    phoneLabel: "Telefoonnummer",
    phonePlaceholder: "+31 6 12 34 56 78",
    emailLabel: "E-mailadres",
    emailPlaceholder: "naam@bedrijf.com",
    submit: "Verstuur aanvraag",
    submitting: "Bezig met verzenden…",
    helper:
      "We nemen binnen twee werkdagen contact met u op om de afspraak te bevestigen.",
    toastSuccess:
      "Bedankt! We nemen binnen twee werkdagen contact met u op.",
    feedbackSuccess:
      "Bedankt! We nemen binnen twee werkdagen contact met u op om de afspraak te bevestigen.",
    errorFallback:
      "Versturen is helaas mislukt. Controleer uw verbinding en probeer het opnieuw.",
    slugError:
      "Google Sheets accepteert het formulier nog niet. Controleer of het tabblad '{slug}' bestaat in het Apps Script, of stel VITE_BELEGGERSFAIR_FORM_SLUG in op de juiste waarde (hoofdlettergevoelig).",
  },
  en: {
    title: "Stay informed about our strategies",
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    phoneLabel: "Phone number",
    phonePlaceholder: "+31 6 12 34 56 78",
    emailLabel: "Email address",
    emailPlaceholder: "name@company.com",
    submit: "Submit request",
    submitting: "Submitting…",
    helper:
      "We will contact you within two business days to confirm the appointment.",
    toastSuccess:
      "Thank you! We will contact you within two business days.",
    feedbackSuccess:
      "Thank you! We will contact you within two business days to confirm your appointment.",
    errorFallback:
      "Submission failed. Please check your connection and try again.",
    slugError:
      "Google Sheets has not yet accepted this form. Make sure the tab '{slug}' exists in Apps Script or set VITE_BELEGGERSFAIR_FORM_SLUG to the correct value (case sensitive).",
  },
} as const;

const BELEGGERSFAIR_FORM_SLUG =
  import.meta.env.VITE_BELEGGERSFAIR_FORM_SLUG?.trim() || "Beleggersfair";

const BeleggersfairFormSection = () => {
  const { language } = useChangeLanguageContext();
  const copy = FORM_COPY[language] ?? FORM_COPY.en;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await submitToGoogleSheet({
        formSlug: BELEGGERSFAIR_FORM_SLUG,
        payload: formData,
      });

      toast.success(copy.toastSuccess);
      setFeedback({
        type: "success",
        message: copy.feedbackSuccess,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      const fallbackMessage = copy.errorFallback;
      const rawMessage = (error as Error)?.message;
      const message =
        rawMessage && rawMessage.includes("formSlug")
          ? copy.slugError.replace("{slug}", BELEGGERSFAIR_FORM_SLUG)
          : rawMessage || fallbackMessage;
      toast.error(message);
      setFeedback({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="BeleggersfairFormSection"
      style={
        {
          "--form-bg": `url(${images.beleggersfair.formBackground})`,
          "--form-bg-mobile": `url(${images.beleggersfair.formBackgroundMobile})`,
        } as React.CSSProperties
      }
    >
      <div className="BeleggersfairFormSection__Container">
        <div className="BeleggersfairFormSection__Content">
          <h2
            className="BeleggersfairFormSection__Title"
            style={
              {
                "--title-brush": `url(${images.beleggersfair.titleBrush})`,
              } as React.CSSProperties
            }
          >
            {copy.title}
          </h2>
          <form
            className="BeleggersfairFormSection__Form"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="BeleggersfairFormSection__Field">
              <span className="BeleggersfairFormSection__Label">{copy.nameLabel}</span>
              <input
                type="text"
                name="name"
                placeholder={copy.namePlaceholder}
                className="BeleggersfairFormSection__Input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="BeleggersfairFormSection__Field">
              <span className="BeleggersfairFormSection__Label">{copy.phoneLabel}</span>
              <input
                type="tel"
                name="phone"
                placeholder={copy.phonePlaceholder}
                className="BeleggersfairFormSection__Input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label className="BeleggersfairFormSection__Field">
              <span className="BeleggersfairFormSection__Label">{copy.emailLabel}</span>
              <input
                type="email"
                name="email"
                placeholder={copy.emailPlaceholder}
                className="BeleggersfairFormSection__Input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className="BeleggersfairFormSection__Submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? copy.submitting : copy.submit}
            </button>

            {feedback ? (
              <p
                className={`BeleggersfairFormSection__Feedback ${
                  feedback.type === "success"
                    ? "BeleggersfairFormSection__Feedback--success"
                    : "BeleggersfairFormSection__Feedback--error"
                }`}
              >
                {feedback.message}
              </p>
            ) : (
              <p className="BeleggersfairFormSection__Helper">{copy.helper}</p>
            )}
          </form>
          <ToastContainer autoClose={5000} />
        </div>

        <div className="BeleggersfairFormSection__ImageWrapper">
          <img
            src={images.beleggersfair.formImage}
            alt="Beleggersfair attendee speaking with advisor"
            className="BeleggersfairFormSection__Image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default BeleggersfairFormSection;
