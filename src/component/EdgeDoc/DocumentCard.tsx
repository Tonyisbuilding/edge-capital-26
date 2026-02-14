import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "@/constant/images";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

// Define types for document data
interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  category: CategoryType;
  pdf: string;
}

type CategoryType = "fund" | "bond" | "privacy";
type IconType =
  | "document"
  | "person"
  | "discount_email"
  | "form_submission"
  | "security";
type DocumentCategory = "all" | "fund" | "bond" | "privacy";

interface Documents {
  all: DocumentItem[];
  fund: DocumentItem[];
  bond: DocumentItem[];
  privacy: DocumentItem[];
}

// Icons component
const Icon = ({ type, imageAlt }: { type: IconType; imageAlt: string }) => {
  switch (type) {
    case "document":
      return (
        <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center">
          <img
            src={images.edgeDoc.document}
            alt={imageAlt}
            className="w-[70%] h-[70%] object-cover"
          />
        </div>
      );
    case "person":
      return (
        <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
          <img
            src={images.edgeDoc.person}
            alt={imageAlt}
            className="w-[60%] h-[60%] object-cover"
          />
        </div>
      );
    case "discount_email":
      return (
        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
          <img
            src={images.edgeDoc.discount_email}
            alt={imageAlt}
            className="w-[60%] h-[60%] object-cover"
          />
        </div>
      );
    case "form_submission":
      return (
        <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center">
          <img
            src={images.edgeDoc.form_submission}
            alt={imageAlt}
            className="w-[70%] h-[70%] object-cover"
          />
        </div>
      );
    case "security":
      return (
        <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center">
          <img
            src={images.edgeDoc.security}
            alt={imageAlt}
            className="w-[60%] h-[60%] object-cover"
          />
        </div>
      );
    default:
      return (
        <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
          <img
            src={images.edgeDoc.document}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      );
  }
};

// Document Card component
const DocumentCard = ({
  document,
  downloadLabel,
  imageAlt,
}: {
  document: DocumentItem;
  downloadLabel: string;
  imageAlt: string;
}) => {

  const { language } = useChangeLanguageContext();

  return (
    <motion.div
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-4 
      relative ${language === 'nl' ? 'lg:h-[20rem] ' : 'lg:h-[19rem] '}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0">
        <Icon type={document.icon} imageAlt={imageAlt} />
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {document.title}
        </h3>
        <p className="text-sm text-gray-600 leading-snug whitespace-normal break-words">
          {document.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4 lg:absolute lg:bottom-6 lg:left-6 lg:right-6">
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
          PDF
        </span>
        <a
          href={document.pdf}
          target="_blank"
          className="flex items-center text-sm text-gray-700 hover:text-blue-600"
          aria-label={`${downloadLabel} ${document.title}`}
        >
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src={images.form.download}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>{" "}
          {downloadLabel}
        </a>
      </div>
    </motion.div>
  );
};

// Main component
const DocumentCardSections = () => {
  const { language } = useChangeLanguageContext();
  const [activeTab, setActiveTab] = useState<DocumentCategory>("all");

  // Final document definitions
  const docs: Record<"en" | "nl", any> = {
    en: {
      heading: "Edge Documents",
      tabs: [
        { id: "all", label: "All Documents" },
        { id: "fund", label: "Fund Documents" },
        // { id: "bond", label: "Bond Documents" },
        { id: "privacy", label: "Privacy & Legal" },
      ],
      downloadLabel: "Download",
      imageAlt: "Document icon",
      all: [
        // 1. Information Memorandum / Edge Capital EdgeFund IM
        {
          id: "info-memorandum",
          title: language === "nl"
            ? "Edge Capital EdgeFund IM"
            : "Edge Capital EdgeFund IM",
          description: language === "nl"
            ? "Belangrijk informatiedocument met alle essentiële details over het Edge Capital EdgeFund."
            : "Key investor information document with all the essential details about the Edge Capital EdgeFund.",
          icon: "document" as IconType,
          category: "fund" as CategoryType,
          pdf: "https://acrobat.adobe.com/id/urn:aaid:sc:EU:79e94b1c-d287-4ccf-a570-1cba2df64772"
        },
        // 2. Natural-person subscription
        {
          id: "subscription-natural",
          title: language === "nl"
            ? "Inschrijfformulier (Natuurlijke Personen)"
            : "Subscription Form (Natural Persons)",
          description: language === "nl"
            ? "Volledig inschrijfformulier voor individuele beleggers die willen deelnemen aan het Edge Capital EdgeFund."
            : "Complete subscription form for individual investors looking to participate in the Edge Capital EdgeFund.",
          icon: "person" as IconType,
          category: "fund" as CategoryType,
          pdf: "https://acrobat.adobe.com/id/urn:aaid:sc:EU:82d5b476-7300-466f-9de5-0dedc982c138"
        },
        // 3. Rechts-persoon subscription (unchanged)
        {
          id: "subscription-bvs",
          title: language === "nl"
            ? "Inschrijfformulier (BVs)"
            : "Subscription Form (BVs)",
          description: language === "nl"
            ? "Inschrijfformulier voor besloten vennootschappen (BVs) die geïnteresseerd zijn in het Edge Capital EdgeFund."
            : "Subscription form for private limited companies (BVs) interested in the Edge Capital EdgeFund.",
          icon: "discount_email" as IconType,
          category: "fund" as CategoryType,
          pdf: "https://acrobat.adobe.com/id/urn:aaid:sc:EU:7b9818b2-7eeb-406d-9478-c9ab5b840970"
        },
        {
          id: "mutatieformulier",
          title: "Mutatieformulier",
          description:
            "Use this form to update your Edge Capital EdgeFund account details, investment preferences or personal information.",
          icon: "form_submission",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:41531af5-839b-4656-aefe-0cad0b0d8489",
        },
        {
          id: "fondsvoorwaarden",
          title: "Fondsvoorwaarden",
          description:
            "The official fund terms & conditions for the Edge Capital EdgeFund.",
          icon: "document",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:1e674d90-ad9a-4126-a40f-0e64ba04f460",
        },
        {
          id: "strategie-omschrijving",
          title: "Strategie omschrijving",
          description:
            "Detailed description of the fund’s quantitative strategy and investment approach.",
          icon: "document",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:50755999-e21e-46da-9831-3dafd0d14248",
        },
        {
          id: "edge-capital-kid",
          title: "Essential Information Document",
          description:
            "Key investor information document outlining all essential details about Edge Capital EdgeFund",
          icon: "document",
          category: "bond",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:3613264c-d100-443e-b9dd-4cc38cf6ba97",
        },
        // {
        //   id: "bond-subscription-natural",
        //   title: "Bond Subscription (Natural Persons)",
        //   description:
        //     "Complete subscription forms for individual investors interested in Edge Capital Bond opportunities.",
        //   icon: "person",
        //   category: "bond",
        //   pdf:
        //     "https://edge-capital.nl/media/2023/05/006_EDGECAPITAL_Obligatie_III_Rechtspersoon.pdf",
        // },
        {
          id: "privacy-cookies",
          title: "Privacy and Cookies Policy",
          description:
            "Comprehensive overview of how Edge Capital handles your personal data and information privacy.",
          icon: "security",
          category: "privacy",
          pdf:
            "https://edge-capital.nl/media/2023/05/008_EDGECAPITAL_Cookies.pdf",
        },
        {
          id: "data-rights",
          title: "Data and Rights",
          description:
            "Information about your rights regarding your personal data and how to exercise those rights with Edge Capital.",
          icon: "discount_email",
          category: "privacy",
          pdf:
            "https://edge-capital.nl/media/2023/05/009_EDGECAPITAL_Persoonsgegevens_en_uw_rechten.pdf",
        },
      ],
    },
    nl: {
      heading: "Edge Documenten",
      tabs: [
        { id: "all", label: "Alle Documenten" },
        { id: "fund", label: "Fondsdocumenten" },
        // { id: "bond", label: "Obligatiedocumenten" },
        { id: "privacy", label: "Privacy & Juridisch" },
      ],
      downloadLabel: "Downloaden",
      imageAlt: "Document pictogram",
      all: [
        {
          id: "essentiële-informatie",
          title: "Edge Capital EdgeFund IM",
          description:
            "Belangrijk informatiedocument voor beleggers met alle essentiële details over Edge Capital EdgeFund-investeringsmogelijkheden en risicofactoren.",
          icon: "document",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:79e94b1c-d287-4ccf-a570-1cba2df64772",
        },
        {
          id: "inschrijf-natuurlijk",
          title:
            "Inschrijfformulier natuurlijk persoon Edge Capital EdgeFund",
          description:
            "Volledig inschrijfformulier voor individuele beleggers die willen deelnemen aan het Edge Capital EdgeFund.",
          icon: "person",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:82d5b476-7300-466f-9de5-0dedc982c138",
        },
        {
          id: "inschrijf-rechtspersoon",
          title:
            "Inschrijfformulier rechtspersoon Edge Capital EdgeFund",
          description:
            "Inschrijfformulier voor bedrijfsbeleggers (BVs) die geïnteresseerd zijn in het Edge Capital EdgeFund.",
          icon: "discount_email",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:7b9818b2-7eeb-406d-9478-c9ab5b840970",
        },
        {
          id: "mutatieformulier",
          title: "Mutatieformulier",
          description:
            "Gebruik dit formulier om uw Edge Capital EdgeFund-accountgegevens, investeringsvoorkeuren of persoonlijke informatie bij te werken.",
          icon: "form_submission",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:41531af5-839b-4656-aefe-0cad0b0d8489",
        },
        {
          id: "fondsvoorwaarden",
          title: "Fondsvoorwaarden",
          description:
            "De officiële fondsvoorwaarden voor het Edge Capital EdgeFund.",
          icon: "document",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:1e674d90-ad9a-4126-a40f-0e64ba04f460",
        },
        {
          id: "strategie-omschrijving",
          title: "Strategie omschrijving",
          description:
            "Gedetailleerde beschrijving van de kwantitatieve strategie en beleggingsaanpak van het fonds.",
          icon: "document",
          category: "fund",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:50755999-e21e-46da-9831-3dafd0d14248",
        },
        {
          id: "edge-capital-kid",
          title: "Essentiële informatie document",
          description:
            "Belangrijk informatiedocument voor beleggers met alle essentiële details over Edge Capital EdgeFund.",
          icon: "document",
          category: "bond",
          pdf:
            "https://acrobat.adobe.com/id/urn:aaid:sc:EU:3613264c-d100-443e-b9dd-4cc38cf6ba97",
        },
        // {
        //   id: "bond-subscription-natural",
        //   title: "Obligatie-inschrijving (Natuurlijke Personen)",
        //   description:
        //     "Volledige inschrijfformulieren voor individuele beleggers die geïnteresseerd zijn in Edge Capital-obligatiemogelijkheden.",
        //   icon: "person",
        //   category: "bond",
        //   pdf:
        //     "https://edge-capital.nl/media/2023/05/006_EDGECAPITAL_Obligatie_III_Rechtspersoon.pdf",
        // },
        {
          id: "privacy-cookies",
          title: "Privacy- en Cookiesbeleid",
          description:
            "Uitgebreid overzicht van hoe Edge Capital omgaat met uw persoonlijke gegevens en informatieprivacy.",
          icon: "security",
          category: "privacy",
          pdf:
            "https://edge-capital.nl/media/2023/05/008_EDGECAPITAL_Cookies.pdf",
        },
        {
          id: "data-rights",
          title: "Gegevens en Rechten",
          description:
            "Informatie over uw rechten met betrekking tot uw persoonlijke gegevens en hoe u deze rechten kunt uitoefenen bij Edge Capital.",
          icon: "discount_email",
          category: "privacy",
          pdf:
            "https://edge-capital.nl/media/2023/05/009_EDGECAPITAL_Persoonsgegevens_en_uw_rechten.pdf",
        },
      ],
    },
  };

  const locale = docs[language] || docs.en;
  const documents = {
    all: locale.all,
    fund: locale.all.filter((d: DocumentItem) => d.category === "fund"),
    bond: locale.all.filter((d: DocumentItem) => d.category === "bond"),
    privacy: locale.all.filter((d: DocumentItem) => d.category === "privacy"),
  };

  return (
    <section
      className="py-8 w-[98%] max-w-[1700px] mx-auto px-4 md:px-8 bg-[#F8F9FA]"
      aria-labelledby="documents-heading"
    >
      <h2 id="documents-heading" className="sr-only">
        {locale.heading}
      </h2>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <div className="inline-flex bg-[#F1F5F9] p-1 rounded-lg min-w-full">
          {locale.tabs.map((tab: { id: DocumentCategory; label: string }) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex-1 whitespace-nowrap ${activeTab === tab.id
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-500 hover:text-gray-900"
                }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {documents[activeTab].map((doc: DocumentItem) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              downloadLabel={locale.downloadLabel}
              imageAlt={locale.imageAlt}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DocumentCardSections;