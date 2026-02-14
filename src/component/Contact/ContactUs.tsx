import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";

// Define form data interface
interface FormDataType {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  message: string;
}

// Define errors type based on FormDataType keys
type FormErrors = Partial<Record<keyof FormDataType, string>>;

const ContactInformation = () => {
  const { language } = useChangeLanguageContext();
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  // Define translations for English and Dutch
  const translations = {
    en: {
      contactInfo: {
        title: "Contact information",
        description:
          "Looking to collaborate or have questions about our services? We'd love to connect and explore how Edge Capital can help you achieve your financial goals.",
        callUs: "Call Us",
        emailUs: "Email Us",
        visit: "Visit",
        workingHours: "Working Hours",
        phone: "+31 252 781 777",
        email: "info@edge-capital.nl",
        address: "Walserij 15-I2211 SJ, Noordwijkerhout",
        hours: "Mon - Fri: 9AM - 6PM",
      },
      form: {
        title: "Send us a message",
        description:
          "Fill out the form below and we'll get back to you as soon as possible.",
        firstNameLabel: "First name",
        lastNameLabel: "Last name",
        phoneLabel: "Phone/Mobile",
        emailLabel: "Email",
        messageLabel: "Message",
        firstNamePlaceholder: "Enter your name",
        lastNamePlaceholder: "Enter your name",
        phonePlaceholder: "Enter your phone number",
        emailPlaceholder: "Enter your work email address",
        messagePlaceholder: "Enter your message",
        sendButton: "Send Message",
        errors: {
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required",
          emailRequired: "Email is required",
          emailInvalid: "Email is invalid",
        },
        successMessage: "Message sent successfully!",
      },
      imageAlt: "Research team analyzing market data",
    },
    nl: {
      contactInfo: {
        title: "Contactgegevens",
        description:
          "Wilt u samenwerken of heeft u vragen over onze diensten? We maken graag contact om te ontdekken hoe Edge Capital u kan helpen uw financiële doelen te bereiken.",
        callUs: "Bel Ons",
        emailUs: "Mail ons",
        visit: "Bezoekadres",
        workingHours: "Openingstijden",
        phone: "+31 252 781 777",
        email: "info@edge-capital.nl",
        address: "Walserij 15-I2211 SJ, Noordwijkerhout",
        hours: "Ma - Vr: 9:00 - 18:00",
      },
      form: {
        title: "Stuur ons een bericht",
        description:
          "Vul het onderstaande formulier in en we nemen zo snel mogelijk contact met u op.",
        firstNameLabel: "Voornaam",
        lastNameLabel: "Achternaam",
        phoneLabel: "Telefoon/Mobiel",
        emailLabel: "E-mail",
        messageLabel: "Bericht",
        firstNamePlaceholder: "Voer uw naam in",
        lastNamePlaceholder: "Voer uw naam in",
        phonePlaceholder: "Voer uw telefoonnummer in",
        emailPlaceholder: "Voer uw email-adres in",
        messagePlaceholder: "Voer uw bericht in",
        sendButton: "Verzend bericht",
        errors: {
          firstNameRequired: "Voornaam is verplicht",
          lastNameRequired: "Achternaam is verplicht",
          emailRequired: "Email is verplicht",
          emailInvalid: "Email is ongeldig",
        },
        successMessage: "Formulier succesvol verzonden!",
      },
      imageAlt: "Onderzoeksteam dat marktgegevens analyseert",
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(
      (prev) =>
      ({
        ...prev,
        [name]: value,
      } as FormDataType)
    );

    // Clear error when user types
    if (errors[name as keyof FormDataType]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = content.form.errors.firstNameRequired;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = content.form.errors.lastNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = content.form.errors.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = content.form.errors.emailInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);


    if (validateForm()) {
      try {
        await submitToGoogleSheet({
          formSlug: "contact-page",
          payload: formData,
        });

        toast.success(
          language === "nl"
            ? "Formulier succesvol verzonden!"
            : "Message sent successfully!"
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          number: "",
        });
      } catch (error: unknown) {
        console.log(error);
        const fallbackMessage =
          language === "nl"
            ? "Versturen is mislukt. Controleer uw verbinding en probeer opnieuw."
            : "Submission failed. Please check your connection and try again.";

        if (error instanceof Error) {
          const message = error.message || fallbackMessage;
          toast.error(message);
        } else {
          toast.error(fallbackMessage);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-[98%] max-w-[1700px] mx-auto my-12 px-[5px] md:px-0 relative">
      <ToastContainer />
      <div className="flex flex-col md:flex-row rounded-[25px] overflow-hidden shadow-lg relative top-[-5rem]">
        {/* Contact information Panel */}
        <motion.div
          className="bg-gradient-to-br from-[#206D80] from-20% to-[#219EB2] to-50% text-white p-6 md:w-1/2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl font-bold mb-4"
            variants={itemVariants}
          >
            {content.contactInfo.title}
          </motion.h2>

          <motion.p className="mb-8 text-teal-50" variants={itemVariants}>
            {content.contactInfo.description}
          </motion.p>

          <div className="space-y-6">
            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="w-12 h-12 bg-[#4191A1] rounded-[8.76px] flex items-center justify-center mr-4">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-teal-100">
                  {content.contactInfo.callUs}
                </p>
                <p className="font-bold">{content.contactInfo.phone}</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="w-12 h-12 bg-[#4191A1] rounded-[8.76px] flex items-center justify-center mr-4">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-teal-100">
                  {content.contactInfo.emailUs}
                </p>
                <p className="font-bold">{content.contactInfo.email}</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="w-12 h-12 bg-[#4191A1] rounded-[8.76px] flex items-center justify-center mr-4">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-teal-100">
                  {content.contactInfo.visit}
                </p>
                <p className="font-bold">{content.contactInfo.address}</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="w-12 h-12 bg-[#4191A1] rounded-[8.76px] flex items-center justify-center mr-4">
                <FaClock className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-teal-100">
                  {content.contactInfo.workingHours}
                </p>
                <p className="font-bold">{content.contactInfo.hours}</p>
              </div>
            </motion.div>
          </div>

          <motion.div className="flex space-x-4 mt-12" variants={itemVariants}>
            <a
              href="https://www.facebook.com/tradealot/?locale=nl_NL"
              className="w-10 h-10 bg-[#42ABBC] rounded-full flex items-center justify-center hover:bg-teal-400 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/company/edgecapital1/"
              className="w-10 h-10 bg-[#42ABBC] rounded-full flex items-center justify-center hover:bg-teal-400 transition-colors"
            >
              <FaLinkedinIn />
            </a>


          </motion.div>
        </motion.div>

        {/* Contact Form Panel */}
        <motion.div
          className="bg-white p-5 md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            {content.form.title}
          </h2>
          <p className="mb-6 text-gray-600">{content.form.description}</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2">
                <label htmlFor="firstName" className="block text-gray-700 mb-1">
                  {content.form.firstNameLabel}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={content.form.firstNamePlaceholder}
                  className={`w-full p-3 border rounded-md ${errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  aria-required="true"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="md:w-1/2">
                <label htmlFor="lastName" className="block text-gray-700 mb-1">
                  {content.form.lastNameLabel}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={content.form.lastNamePlaceholder}
                  className={`w-full p-3 border rounded-md ${errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  aria-required="true"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="number" className="block text-gray-700 mb-1">
                {content.form.phoneLabel}
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder={content.form.phonePlaceholder}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                {content.form.emailLabel}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={content.form.emailPlaceholder}
                className={`w-full p-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                aria-required="true"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-1">
                {content.form.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={content.form.messagePlaceholder}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex items-center gap-3 rounded-md bg-[#217083] px-6 py-3 text-white transition-colors hover:bg-[#216f83af]"
              >
                <span className="flex-shrink-0">
                  <img
                    src={images.form.send_mail}
                    alt={content.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span>
                  {isSubmitting
                    ? language === "nl"
                      ? "Bezig met verzenden..."
                      : "Submitting..."
                    : content.form.sendButton}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInformation;
