import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  ChevronDown,
} from "lucide-react";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestInfoForm = () => {
  const { language } = useChangeLanguageContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preference: "",
    message: "",
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Define translations for English and Dutch
  const translations = {
    en: {
      header: "Request more information!",
      description:
        "For more information, please leave your details via the form and we will contact you as soon as possible, in any case within 24 hours.",
      form: {
        firstNameLabel: "First Name",
        lastNameLabel: "Last Name",
        emailLabel: "Email",
        phoneLabel: "Your phone number",
        preferenceLabel: "What would you like to receive information about?",
        preferenceOptions: [
          { value: "", label: "- Select -" },
          { value: "investment", label: "Investment Options" },
          { value: "services", label: "Financial Services" },
          { value: "consultation", label: "Personal Consultation" },
          { value: "other", label: "Other" },
        ],
        messageLabel: "Message",
        firstNamePlaceholder: "First Name",
        lastNamePlaceholder: "Last Name",
        emailPlaceholder: "Email",
        phonePlaceholder: "0802 123 4567",
        newsletterLabel: "I would like to receive the Edge Capital newsletter.",
        submitButton: "Submit",
        submittingText: "Submitting...",
        successMessage: "Form submitted successfully!",
        errorMessage: (msg: string) => `Error: ${msg}`,
        defaultError: "An unexpected error occurred.",
      },
    },
    nl: {
      header: "Vraag meer informatie aan!",
      description:
        "Voor meer informatie kunt u uw gegevens via het formulier achterlaten, en we nemen zo snel mogelijk contact met u op, in ieder geval binnen 24 uur.",
      form: {
        firstNameLabel: "Voornaam",
        lastNameLabel: "Achternaam",
        emailLabel: "Email",
        phoneLabel: "Uw telefoonnummer",
        preferenceLabel: "Waar wilt u informatie over ontvangen?",
        preferenceOptions: [
          { value: "", label: "- Selecteer -" },
          { value: "investment", label: "Factsheet EdgeFund" },
          { value: "services", label: "Informatiememorandum EdgeFund" },
          { value: "consultation", label: "Inschrijfformulieren EdgeFund" },
          { value: "other", label: "1 op 1 presentatie" },
        ],
        messageLabel: "Bericht",
        firstNamePlaceholder: "Voornaam",
        lastNamePlaceholder: "Achternaam",
        emailPlaceholder: "Email",
        phonePlaceholder: "0802 123 4567",
        newsletterLabel: "Ik wil graag de Edge Capital nieuwsbrief ontvangen.",
        submitButton: "Verzenden",
        submittingText: "Bezig met verzenden...",
        successMessage: "Formulier succesvol verzonden!",
        errorMessage: (msg: string) => `Fout: ${msg}`,
        defaultError: "Er is een onverwachte fout opgetreden.",
      },
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage("");

    try {
      await submitToGoogleSheet({
        formSlug: "request-info",
        payload: formData,
      });

      setSubmitSuccess(true);
      toast.success(content.form.successMessage);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        preference: "",
        message: "",
        newsletter: false,
      });
    } catch (error: unknown) {
      console.log(error);
      setSubmitSuccess(false);
      const fallbackMessage =
        language === "nl"
          ? "Versturen is mislukt. Controleer uw verbinding en probeer opnieuw."
          : "Submission failed. Please check your connection and try again.";

      if (error instanceof Error) {
        const message = error.message || content.form.defaultError;
        setErrorMessage(message);
        toast.error(message);
      } else {
        setErrorMessage(fallbackMessage);
        toast.error(fallbackMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100
     p-6 flex items-center justify-center pt-[8rem]">
      <ToastContainer />
      <motion.div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left side - Header and description */}
        <div className="bg-gradient-to-br from-[#206D80] from-20% to-[#219EB2] to-50%  text-white p-8 md:p-12 md:w-2/5 flex flex-col justify-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {content.header}
          </motion.h1>
          <motion.p
            className="text-lg text-indigo-100 mb-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {content.description}
          </motion.p>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="absolute bottom-6 left-6 w-32 h-32 rounded-full bg-indigo-400 opacity-30"></div>
            <div className="absolute top-12 right-8 w-20 h-20 rounded-full bg-indigo-300 opacity-20"></div>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="p-8 md:p-12 md:w-3/5">
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {content.form.firstNameLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder={content.form.firstNamePlaceholder}
                    className="w-full pl-10 pr-3 py-2 border  border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all duration-200 text-black"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </motion.div>

              {/* Last Name */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {content.form.lastNameLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder={content.form.lastNamePlaceholder}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all duration-200 text-black"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {content.form.emailLabel}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={content.form.emailPlaceholder}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all duration-200 text-black"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {content.form.phoneLabel}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={content.form.phonePlaceholder}
                  className="w-full pl-10 pr-3 py-2  border border-gray-300 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all duration-200 text-black"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </motion.div>

            {/* Information Preference */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="preference"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {content.form.preferenceLabel}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative text-black">
                <select
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  required
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none 
                  focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all 
                  duration-200"
                >
                  {content.form.preferenceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
                  <ChevronDown size={18} />
                </span>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {content.form.messageLabel}
              </label>
              <div className="relative text-black">
                <span className="absolute top-3 left-3 text-gray-400">
                  <MessageSquare size={18} />
                </span>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg resize-none 
                  focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Newsletter Subscription */}
            <motion.div variants={itemVariants} className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="newsletter"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                {content.form.newsletterLabel}
              </label>
            </motion.div>

            {/* Submission Feedback */}
            {submitSuccess && (
              <div className="text-green-600 font-medium">
                {content.form.successMessage}
              </div>
            )}
            {submitSuccess === false && (
              <div className="text-red-600 font-medium">
                {content.form.errorMessage(errorMessage)}
              </div>
            )}

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 shadow-lg ${
                  isSubmitting
                    ? "bg-gradient-to-br from-[#206D80] from-20% to-[#219EB2] to-50%  cursor-not-allowed"
                    : "bg-gradient-to-br from-[#206D80] from-20% to-[#219EB2] to-50%  hover:bg-[#219EB2]"
                }`}
              >
                {isSubmitting ? (
                  content.form.submittingText
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    {content.form.submitButton}
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default RequestInfoForm;
