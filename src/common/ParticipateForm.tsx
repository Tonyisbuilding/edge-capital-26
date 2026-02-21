import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Flag,
  Globe,
  User,
  FileText,
  Calendar,
  Euro,
  DollarSign,
} from "lucide-react";
import { submitToGoogleSheet } from "@/Api/googleSheetsClient";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interfaces for our data structures
// interface Country {
//   code: string;
//   name: string;
// }

// interface PhonePrefix {
//   code: string;
//   country: string;
// }

interface FormData {
  name: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
  nationality: string;
  phone: string;
  mail: string;
  iban: string; // New field
  onBehalfOf: string; // New field
  tin: string; // New field
  idType: string; // New field
  idNumber: string; // New field
  dateOfBirth: string; // New field
  initialDeposit: string; // New field

}

// Type guard function to validate the form data
function isValidFormData(
  data: FormData,
  content: {
    form: {
      errors: {
        nameRequired: string;
        phoneRequired: string;
        emailRequired: string;
        emailInvalid: string;
        ibanRequired: string;
        dateOfBirthRequired: string;
        initialDepositRequired: string;
      };
    };
  }
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push(content.form.errors.nameRequired);
  }

  if (!data.phone.trim()) {
    errors.push(content.form.errors.phoneRequired);
  }

  if (!data.mail.trim()) {
    errors.push(content.form.errors.emailRequired);
  } else if (!isValidEmail(data.mail)) {
    errors.push(content.form.errors.emailInvalid);
  }

  if (!data.iban.trim()) {
    errors.push(content.form.errors.ibanRequired);
  }

  if (!data.dateOfBirth) {
    errors.push(content.form.errors.dateOfBirthRequired);
  }

  if (!data.initialDeposit || Number(data.initialDeposit) <= 0) {
    errors.push(content.form.errors.initialDepositRequired);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

interface ParticipantFormProps {
  formSlug?: string;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ formSlug = 'participate' }) => {
  const { language } = useChangeLanguageContext();
  // const [phonePrefix, setPhonePrefix] = useState<string>("+1");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    street: "",
    zipcode: "",
    city: "",
    country: "",
    nationality: "",
    phone: "",
    mail: "",
    iban: "",
    onBehalfOf: "",
    tin: "",
    idType: "",
    idNumber: "",
    dateOfBirth: "",
    initialDeposit: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Define translations for English and Dutch
  const translations = {
    en: {
      header: "Participant Form",
      description: "Please fill in your details to participate",
      form: {
        nameLabel: "Name",
        streetLabel: "Street Name and House Number",
        zipcodeLabel: "Zip Code",
        cityLabel: "City",
        countryLabel: "Country",
        nationalityLabel: "Nationality",
        phoneLabel: "Phone Number",
        emailLabel: "E-mail",
        ibanLabel: "IBAN", // New field
        onBehalfOfLabel: "On behalf of", // New field
        tinLabel: "Tax Identification Number (TIN)", // New field
        idTypeLabel: "Type of Identification Document", // New field
        idNumberLabel: "Document Number", // New field
        dateOfBirthLabel: "Date of Birth", // New field
        initialDepositLabel: "Initial Deposit", // New field
        namePlaceholder: "Name",
        streetPlaceholder: "Streetname and housenumber",
        zipcodePlaceholder: "Zipcode",
        cityPlaceholder: "City",
        countryPlaceholder: "Select Country",
        nationalityPlaceholder: "Select Nationality",
        phonePlaceholder: "Phone Number",
        emailPlaceholder: "E-mail",
        ibanPlaceholder: "Enter your IBAN", // New field
        onBehalfOfPlaceholder: "Enter name of person/organization", // New field
        tinPlaceholder: "Enter your TIN", // New field
        idTypePlaceholder: "Select Document Type", // New field
        idNumberPlaceholder: "Enter document number", // New field
        dateOfBirthPlaceholder: "Select date of birth", // New field
        initialDepositPlaceholder: "Enter amount", // New field
        countries: [
          { code: "AF", name: "Afghanistan" },
          { code: "AL", name: "Albania" },
          { code: "DZ", name: "Algeria" },
          { code: "AD", name: "Andorra" },
          { code: "AO", name: "Angola" },
          { code: "AG", name: "Antigua and Barbuda" },
          { code: "AR", name: "Argentina" },
          { code: "AM", name: "Armenia" },
          { code: "AU", name: "Australia" },
          { code: "AT", name: "Austria" },
          { code: "AZ", name: "Azerbaijan" },
          { code: "BS", name: "Bahamas" },
          { code: "BH", name: "Bahrain" },
          { code: "BD", name: "Bangladesh" },
          { code: "BB", name: "Barbados" },
          { code: "BY", name: "Belarus" },
          { code: "BE", name: "Belgium" },
          { code: "BZ", name: "Belize" },
          { code: "BJ", name: "Benin" },
          { code: "BT", name: "Bhutan" },
          { code: "BO", name: "Bolivia" },
          { code: "BA", name: "Bosnia and Herzegovina" },
          { code: "BW", name: "Botswana" },
          { code: "BR", name: "Brazil" },
          { code: "BN", name: "Brunei" },
          { code: "BG", name: "Bulgaria" },
          { code: "BF", name: "Burkina Faso" },
          { code: "BI", name: "Burundi" },
          { code: "KH", name: "Cambodia" },
          { code: "CM", name: "Cameroon" },
          { code: "CA", name: "Canada" },
          { code: "CV", name: "Cape Verde" },
          { code: "CF", name: "Central African Republic" },
          { code: "TD", name: "Chad" },
          { code: "CL", name: "Chile" },
          { code: "CN", name: "China" },
          { code: "CO", name: "Colombia" },
          { code: "KM", name: "Comoros" },
          { code: "CD", name: "Congo (DRC)" },
          { code: "CG", name: "Congo (Republic)" },
          { code: "CR", name: "Costa Rica" },
          { code: "CI", name: "Côte d'Ivoire" },
          { code: "HR", name: "Croatia" },
          { code: "CU", name: "Cuba" },
          { code: "CY", name: "Cyprus" },
          { code: "CZ", name: "Czech Republic" },
          { code: "DK", name: "Denmark" },
          { code: "DJ", name: "Djibouti" },
          { code: "DM", name: "Dominica" },
          { code: "DO", name: "Dominican Republic" },
          { code: "EC", name: "Ecuador" },
          { code: "EG", name: "Egypt" },
          { code: "SV", name: "El Salvador" },
          { code: "GQ", name: "Equatorial Guinea" },
          { code: "ER", name: "Eritrea" },
          { code: "EE", name: "Estonia" },
          { code: "ET", name: "Ethiopia" },
          { code: "FJ", name: "Fiji" },
          { code: "FI", name: "Finland" },
          { code: "FR", name: "France" },
          { code: "GA", name: "Gabon" },
          { code: "GM", name: "Gambia" },
          { code: "GE", name: "Georgia" },
          { code: "DE", name: "Germany" },
          { code: "GH", name: "Ghana" },
          { code: "GR", name: "Greece" },
          { code: "GD", name: "Grenada" },
          { code: "GT", name: "Guatemala" },
          { code: "GN", name: "Guinea" },
          { code: "GW", name: "Guinea-Bissau" },
          { code: "GY", name: "Guyana" },
          { code: "HT", name: "Haiti" },
          { code: "HN", name: "Honduras" },
          { code: "HU", name: "Hungary" },
          { code: "IS", name: "Iceland" },
          { code: "IN", name: "India" },
          { code: "ID", name: "Indonesia" },
          { code: "IR", name: "Iran" },
          { code: "IQ", name: "Iraq" },
          { code: "IE", name: "Ireland" },
          { code: "IL", name: "Israel" },
          { code: "IT", name: "Italy" },
          { code: "JM", name: "Jamaica" },
          { code: "JP", name: "Japan" },
          { code: "JO", name: "Jordan" },
          { code: "KZ", name: "Kazakhstan" },
          { code: "KE", name: "Kenya" },
          { code: "KI", name: "Kiribati" },
          { code: "KW", name: "Kuwait" },
          { code: "KG", name: "Kyrgyzstan" },
          { code: "LA", name: "Laos" },
          { code: "LV", name: "Latvia" },
          { code: "LB", name: "Lebanon" },
          { code: "LS", name: "Lesotho" },
          { code: "LR", name: "Liberia" },
          { code: "LY", name: "Libya" },
          { code: "LI", name: "Liechtenstein" },
          { code: "LT", name: "Lithuania" },
          { code: "LU", name: "Luxembourg" },
          { code: "MG", name: "Madagascar" },
          { code: "MW", name: "Malawi" },
          { code: "MY", name: "Malaysia" },
          { code: "MV", name: "Maldives" },
          { code: "ML", name: "Mali" },
          { code: "MT", name: "Malta" },
          { code: "MH", name: "Marshall Islands" },
          { code: "MR", name: "Mauritania" },
          { code: "MU", name: "Mauritius" },
          { code: "MX", name: "Mexico" },
          { code: "FM", name: "Micronesia" },
          { code: "MD", name: "Moldova" },
          { code: "MC", name: "Monaco" },
          { code: "MN", name: "Mongolia" },
          { code: "ME", name: "Montenegro" },
          { code: "MA", name: "Morocco" },
          { code: "MZ", name: "Mozambique" },
          { code: "MM", name: "Myanmar" },
          { code: "NA", name: "Namibia" },
          { code: "NR", name: "Nauru" },
          { code: "NP", name: "Nepal" },
          { code: "NL", name: "Netherlands" },
          { code: "NZ", name: "New Zealand" },
          { code: "NI", name: "Nicaragua" },
          { code: "NE", name: "Niger" },
          { code: "NG", name: "Nigeria" },
          { code: "KP", name: "North Korea" },
          { code: "MK", name: "North Macedonia" },
          { code: "NO", name: "Norway" },
          { code: "OM", name: "Oman" },
          { code: "PK", name: "Pakistan" },
          { code: "PW", name: "Palau" },
          { code: "PS", name: "Palestine" },
          { code: "PA", name: "Panama" },
          { code: "PG", name: "Papua New Guinea" },
          { code: "PY", name: "Paraguay" },
          { code: "PE", name: "Peru" },
          { code: "PH", name: "Philippines" },
          { code: "PL", name: "Poland" },
          { code: "PT", name: "Portugal" },
          { code: "QA", name: "Qatar" },
          { code: "RO", name: "Romania" },
          { code: "RU", name: "Russia" },
          { code: "RW", name: "Rwanda" },
          { code: "KN", name: "Saint Kitts and Nevis" },
          { code: "LC", name: "Saint Lucia" },
          { code: "VC", name: "Saint Vincent and the Grenadines" },
          { code: "WS", name: "Samoa" },
          { code: "SM", name: "San Marino" },
          { code: "ST", name: "Sao Tome and Principe" },
          { code: "SA", name: "Saudi Arabia" },
          { code: "SN", name: "Senegal" },
          { code: "RS", name: "Serbia" },
          { code: "SC", name: "Seychelles" },
          { code: "SL", name: "Sierra Leone" },
          { code: "SG", name: "Singapore" },
          { code: "SK", name: "Slovakia" },
          { code: "SI", name: "Slovenia" },
          { code: "SB", name: "Solomon Islands" },
          { code: "SO", name: "Somalia" },
          { code: "ZA", name: "South Africa" },
          { code: "KR", name: "South Korea" },
          { code: "SS", name: "South Sudan" },
          { code: "ES", name: "Spain" },
          { code: "LK", name: "Sri Lanka" },
          { code: "SD", name: "Sudan" },
          { code: "SR", name: "Suriname" },
          { code: "SE", name: "Sweden" },
          { code: "CH", name: "Switzerland" },
          { code: "SY", name: "Syria" },
          { code: "TW", name: "Taiwan" },
          { code: "TJ", name: "Tajikistan" },
          { code: "TZ", name: "Tanzania" },
          { code: "TH", name: "Thailand" },
          { code: "TL", name: "Timor-Leste" },
          { code: "TG", name: "Togo" },
          { code: "TO", name: "Tonga" },
          { code: "TT", name: "Trinidad and Tobago" },
          { code: "TN", name: "Tunisia" },
          { code: "TR", name: "Turkey" },
          { code: "TM", name: "Turkmenistan" },
          { code: "TV", name: "Tuvalu" },
          { code: "UG", name: "Uganda" },
          { code: "UA", name: "Ukraine" },
          { code: "AE", name: "United Arab Emirates" },
          { code: "GB", name: "United Kingdom" },
          { code: "US", name: "United States" },
          { code: "UY", name: "Uruguay" },
          { code: "UZ", name: "Uzbekistan" },
          { code: "VU", name: "Vanuatu" },
          { code: "VA", name: "Vatican City" },
          { code: "VE", name: "Venezuela" },
          { code: "VN", name: "Vietnam" },
          { code: "YE", name: "Yemen" },
          { code: "ZM", name: "Zambia" },
          { code: "ZW", name: "Zimbabwe" }
        ],



        phonePrefixes: [
          { code: "+31", country: "NL" },
          { code: "+1", country: "US/CA" },
          { code: "+44", country: "UK" },
          { code: "+61", country: "AU" },
          { code: "+49", country: "DE" },
          { code: "+33", country: "FR" },
          { code: "+81", country: "JP" }
        ],

        idTypes: [
          { value: "", label: "Select Document Type" },
          { value: "passport", label: "Passport" },
          { value: "id_card", label: "ID Card" },
          { value: "drivers_license", label: "Driver's License" },
        ],
        submitButton: "Participate",
        submittingText: "Submitting...",
        successMessage: "Form submitted successfully!",
        errors: {
          nameRequired: "Name is required",
          phoneRequired: "Phone number is required",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email format",
          ibanRequired: "IBAN is required", // New field
          dateOfBirthRequired: "Date of birth is required", // New field
          initialDepositRequired: "Initial deposit must be greater than 0", // New field
          defaultError: "Failed to submit form. Please try again later.",
        },
      },
    },
    nl: {
      header: "Deelnemersformulier",
      description: "Vul uw gegevens in om deel te nemen",
      form: {
        nameLabel: "Naam",
        streetLabel: "Straatnaam en Huisnummer",
        zipcodeLabel: "Postcode",
        cityLabel: "Stad",
        countryLabel: "Land",
        nationalityLabel: "Nationaliteit",
        phoneLabel: "Telefoonnummer",
        emailLabel: "E-mail",
        ibanLabel: "IBAN", // New field
        onBehalfOfLabel: "Namens", // New field
        tinLabel: "Burgerservicenummer", // New field
        idTypeLabel: "Type Identificatiedocument", // New field
        idNumberLabel: "Documentnummer", // New field
        dateOfBirthLabel: "Geboortedatum", // New field
        initialDepositLabel: "Initiële Storting", // New field
        namePlaceholder: "Naam",
        streetPlaceholder: "Straatnaam en huisnummer",
        zipcodePlaceholder: "Postcode",
        cityPlaceholder: "Stad",
        countryPlaceholder: "Selecteer Land",
        nationalityPlaceholder: "Selecteer Nationaliteit",
        phonePlaceholder: "Telefoonnummer",
        emailPlaceholder: "E-mail",
        ibanPlaceholder: "Voer uw IBAN in", // New field
        onBehalfOfPlaceholder: "Voer naam van persoon/organisatie in", // New field
        tinPlaceholder: "Voer uw BSN in", // New field
        idTypePlaceholder: "Selecteer Documenttype", // New field
        idNumberPlaceholder: "Voer documentnummer in", // New field
        dateOfBirthPlaceholder: "Selecteer geboortedatum", // New field
        initialDepositPlaceholder: "Voer bedrag in", // New field
        countries: [
          { code: "AF", name: "Afghanistan" },
          { code: "AL", name: "Albanië" },
          { code: "DZ", name: "Algerije" },
          { code: "AD", name: "Andorra" },
          { code: "AO", name: "Angola" },
          { code: "AG", name: "Antigua en Barbuda" },
          { code: "AR", name: "Argentinië" },
          { code: "AM", name: "Armenië" },
          { code: "AU", name: "Australië" },
          { code: "AT", name: "Oostenrijk" },
          { code: "AZ", name: "Azerbeidzjan" },
          { code: "BS", name: "Bahama’s" },
          { code: "BH", name: "Bahrein" },
          { code: "BD", name: "Bangladesh" },
          { code: "BB", name: "Barbados" },
          { code: "BY", name: "Belarus (Wit-Rusland)" },
          { code: "BE", name: "België" },
          { code: "BZ", name: "Belize" },
          { code: "BJ", name: "Benin" },
          { code: "BT", name: "Bhutan" },
          { code: "BO", name: "Bolivia" },
          { code: "BA", name: "Bosnië en Herzegovina" },
          { code: "BW", name: "Botswana" },
          { code: "BR", name: "Brazilië" },
          { code: "BN", name: "Brunei" },
          { code: "BG", name: "Bulgarije" },
          { code: "BF", name: "Burkina Faso" },
          { code: "BI", name: "Burundi" },
          { code: "KH", name: "Cambodja" },
          { code: "CM", name: "Kameroen" },
          { code: "CA", name: "Canada" },
          { code: "CV", name: "Kaapverdië" },
          { code: "CF", name: "Centraal-Afrikaanse Republiek" },
          { code: "TD", name: "Tsjaad" },
          { code: "CL", name: "Chili" },
          { code: "CN", name: "China" },
          { code: "CO", name: "Colombia" },
          { code: "KM", name: "Comoren" },
          { code: "CD", name: "Congo (DRC)" },
          { code: "CG", name: "Congo (Republiek)" },
          { code: "CR", name: "Costa Rica" },
          { code: "CI", name: "Ivoorkust" },
          { code: "HR", name: "Kroatië" },
          { code: "CU", name: "Cuba" },
          { code: "CY", name: "Cyprus" },
          { code: "CZ", name: "Tsjechië" },
          { code: "DK", name: "Denemarken" },
          { code: "DJ", name: "Djibouti" },
          { code: "DM", name: "Dominica" },
          { code: "DO", name: "Dominicaanse Republiek" },
          { code: "EC", name: "Ecuador" },
          { code: "EG", name: "Egypte" },
          { code: "SV", name: "El Salvador" },
          { code: "GQ", name: "Equatoriaal-Guinea" },
          { code: "ER", name: "Eritrea" },
          { code: "EE", name: "Estland" },
          { code: "ET", name: "Ethiopië" },
          { code: "FJ", name: "Fiji" },
          { code: "FI", name: "Finland" },
          { code: "FR", name: "Frankrijk" },
          { code: "GA", name: "Gabon" },
          { code: "GM", name: "Gambia" },
          { code: "GE", name: "Georgië" },
          { code: "DE", name: "Duitsland" },
          { code: "GH", name: "Ghana" },
          { code: "GR", name: "Griekenland" },
          { code: "GD", name: "Grenada" },
          { code: "GT", name: "Guatemala" },
          { code: "GN", name: "Guinee" },
          { code: "GW", name: "Guinee-Bissau" },
          { code: "GY", name: "Guyana" },
          { code: "HT", name: "Haïti" },
          { code: "HN", name: "Honduras" },
          { code: "HU", name: "Hongarije" },
          { code: "IS", name: "IJsland" },
          { code: "IN", name: "India" },
          { code: "ID", name: "Indonesië" },
          { code: "IR", name: "Iran" },
          { code: "IQ", name: "Irak" },
          { code: "IE", name: "Ierland" },
          { code: "IL", name: "Israël" },
          { code: "IT", name: "Italië" },
          { code: "JM", name: "Jamaica" },
          { code: "JP", name: "Japan" },
          { code: "JO", name: "Jordanië" },
          { code: "KZ", name: "Kazachstan" },
          { code: "KE", name: "Kenia" },
          { code: "KI", name: "Kiribati" },
          { code: "KW", name: "Koeweit" },
          { code: "KG", name: "Kirgizië" },
          { code: "LA", name: "Laos" },
          { code: "LV", name: "Letland" },
          { code: "LB", name: "Libanon" },
          { code: "LS", name: "Lesotho" },
          { code: "LR", name: "Liberia" },
          { code: "LY", name: "Libië" },
          { code: "LI", name: "Liechtenstein" },
          { code: "LT", name: "Litouwen" },
          { code: "LU", name: "Luxemburg" },
          { code: "MG", name: "Madagaskar" },
          { code: "MW", name: "Malawi" },
          { code: "MY", name: "Maleisië" },
          { code: "MV", name: "Maldiven" },
          { code: "ML", name: "Mali" },
          { code: "MT", name: "Malta" },
          { code: "MH", name: "Marshalleilanden" },
          { code: "MR", name: "Mauritanië" },
          { code: "MU", name: "Mauritius" },
          { code: "MX", name: "Mexico" },
          { code: "FM", name: "Micronesië" },
          { code: "MD", name: "Moldavië" },
          { code: "MC", name: "Monaco" },
          { code: "MN", name: "Mongolië" },
          { code: "ME", name: "Montenegro" },
          { code: "MA", name: "Marokko" },
          { code: "MZ", name: "Mozambique" },
          { code: "MM", name: "Myanmar" },
          { code: "NA", name: "Namibië" },
          { code: "NR", name: "Nauru" },
          { code: "NP", name: "Nepal" },
          { code: "NL", name: "Nederland" },
          { code: "NZ", name: "Nieuw-Zeeland" },
          { code: "NI", name: "Nicaragua" },
          { code: "NE", name: "Niger" },
          { code: "NG", name: "Nigeria" },
          { code: "KP", name: "Noord-Korea" },
          { code: "MK", name: "Noord-Macedonië" },
          { code: "NO", name: "Noorwegen" },
          { code: "OM", name: "Oman" },
          { code: "PK", name: "Pakistan" },
          { code: "PW", name: "Palau" },
          { code: "PS", name: "Palestina" },
          { code: "PA", name: "Panama" },
          { code: "PG", name: "Papoea-Nieuw-Guinea" },
          { code: "PY", name: "Paraguay" },
          { code: "PE", name: "Peru" },
          { code: "PH", name: "Filipijnen" },
          { code: "PL", name: "Polen" },
          { code: "PT", name: "Portugal" },
          { code: "QA", name: "Qatar" },
          { code: "RO", name: "Roemenië" },
          { code: "RU", name: "Rusland" },
          { code: "RW", name: "Rwanda" },
          { code: "KN", name: "Saint Kitts en Nevis" },
          { code: "LC", name: "Saint Lucia" },
          { code: "VC", name: "Saint Vincent en de Grenadines" },
          { code: "WS", name: "Samoa" },
          { code: "SM", name: "San Marino" },
          { code: "ST", name: "Sao Tomé en Principe" },
          { code: "SA", name: "Saoedi-Arabië" },
          { code: "SN", name: "Senegal" },
          { code: "RS", name: "Servië" },
          { code: "SC", name: "Seychellen" },
          { code: "SL", name: "Sierra Leone" },
          { code: "SG", name: "Singapore" },
          { code: "SK", name: "Slowakije" },
          { code: "SI", name: "Slovenië" },
          { code: "SB", name: "Salomonseilanden" },
          { code: "SO", name: "Somalië" },
          { code: "ZA", name: "Zuid-Afrika" },
          { code: "KR", name: "Zuid-Korea" },
          { code: "SS", name: "Zuid-Soedan" },
          { code: "ES", name: "Spanje" },
          { code: "LK", name: "Sri Lanka" },
          { code: "SD", name: "Soedan" },
          { code: "SR", name: "Suriname" },
          { code: "SE", name: "Zweden" },
          { code: "CH", name: "Zwitserland" },
          { code: "SY", name: "Syrië" },
          { code: "TW", name: "Taiwan" },
          { code: "TJ", name: "Tadzjikistan" },
          { code: "TZ", name: "Tanzania" },
          { code: "TH", name: "Thailand" },
          { code: "TL", name: "Oost-Timor" },
          { code: "TG", name: "Togo" },
          { code: "TO", name: "Tonga" },
          { code: "TT", name: "Trinidad en Tobago" },
          { code: "TN", name: "Tunesië" },
          { code: "TR", name: "Turkije" },
          { code: "TM", name: "Turkmenistan" },
          { code: "TV", name: "Tuvalu" },
          { code: "UG", name: "Oeganda" },
          { code: "UA", name: "Oekraïne" },
          { code: "AE", name: "Verenigde Arabische Emiraten" },
          { code: "GB", name: "Verenigd Koninkrijk" },
          { code: "US", name: "Verenigde Staten" },
          { code: "UY", name: "Uruguay" },
          { code: "UZ", name: "Oezbekistan" },
          { code: "VU", name: "Vanuatu" },
          { code: "VA", name: "Vaticaanstad" },
          { code: "VE", name: "Venezuela" },
          { code: "VN", name: "Vietnam" },
          { code: "YE", name: "Jemen" },
          { code: "ZM", name: "Zambia" },
          { code: "ZW", name: "Zimbabwe" }
        ],


        phonePrefixes: [
          { code: "+31", country: "NL" },
          { code: "+1", country: "VS/CA" },
          { code: "+44", country: "VK" },
          { code: "+61", country: "AU" },
          { code: "+49", country: "DE" },
          { code: "+33", country: "FR" },
          { code: "+81", country: "JP" }
        ],

        idTypes: [
          { value: "", label: "Selecteer Documenttype" },
          { value: "passport", label: "Paspoort" },
          { value: "id_card", label: "ID-kaart" },
          { value: "drivers_license", label: "Rijbewijs" },
        ],
        submitButton: "Deelnemen",
        submittingText: "Bezig met verzenden...",
        successMessage: "Formulier succesvol verzonden!",
        errors: {
          nameRequired: "Naam is verplicht",
          phoneRequired: "Telefoonnummer is verplicht",
          emailRequired: "E-mail is verplicht",
          emailInvalid: "Ongeldig e-mailformaat",
          ibanRequired: "IBAN is verplicht", // New field
          dateOfBirthRequired: "Geboortedatum is verplicht", // New field
          initialDepositRequired: "Initiële storting moet groter zijn dan 0", // New field
          defaultError:
            "Kan het formulier niet verzenden. Probeer het later opnieuw.",
        },
      },
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;
  const countries = content.form.countries;
  // const phonePrefixes = content.form.phonePrefixes;
  const idTypes = content.form.idTypes;

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: "#219EB2" },
    tap: { scale: 0.95 },
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // const handlePrefixChange = (e: ChangeEvent<HTMLSelectElement>): void => {
  //   setPhonePrefix(e.target.value);
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    // Validate form data using type guard
    const validation = isValidFormData(formData, content);
    if (!validation.valid) {
      setFormError(validation.errors.join(". "));
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      // phone: phonePrefix + formData.phone,
      phone: formData.phone,
    };

    try {
      await submitToGoogleSheet({
        formSlug,
        payload,
      });

      toast.success(content.form.successMessage);
      setFormData({
        name: "",
        street: "",
        zipcode: "",
        city: "",
        country: "",
        nationality: "",
        phone: "",
        mail: "",
        iban: "",
        onBehalfOf: "",
        tin: "",
        idType: "",
        idNumber: "",
        dateOfBirth: "",
        initialDeposit: "",
      });
    } catch (error) {
      const fallbackMessage =
        language === "nl"
          ? "Versturen is mislukt. Controleer uw verbinding en probeer opnieuw."
          : "Submission failed. Please check your connection and try again.";

      const message =
        error instanceof Error
          ? error.message || content.form.errors.defaultError
          : fallbackMessage;

      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50
     to-indigo-50 pt-16 mt-[5rem]"
    >
      <ToastContainer />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header with decorative elements */}
        <div className="relative bg-gradient-to-br from-[#206D80] from-20% to-[#219EB2] to-50% text-white py-8 px-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#206D80] rounded-full -mr-16 -mt-16 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#206D80] rounded-full -ml-10 -mb-10 opacity-20"></div>
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold relative z-10"
          >
            {content.header}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-indigo-100 mt-2 relative z-10"
          >
            {content.description}
          </motion.p>
        </div>

        {/* Form content */}
        <div className="p-6 md:p-8">
          {formError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  {content.form.nameLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    placeholder={content.form.namePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Street Name and House Number */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="street"
                >
                  {content.form.streetLabel}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="street"
                    type="text"
                    placeholder={content.form.streetPlaceholder}
                    value={formData.street}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:[#219EB2] focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {/* Zip Code */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="zipcode"
                >
                  {content.form.zipcodeLabel}
                </label>
                <input
                  id="zipcode"
                  type="text"
                  placeholder={content.form.zipcodePlaceholder}
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                />
              </motion.div>

              {/* City */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="city"
                >
                  {content.form.cityLabel}
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder={content.form.cityPlaceholder}
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                />
              </motion.div>

              {/* Country */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="country"
                >
                  {content.form.countryLabel}
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      {content.form.countryPlaceholder}
                    </option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </motion.div>

              {/* Nationality */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="nationality"
                >
                  {content.form.nationalityLabel}
                </label>
                <div className="relative">
                  <Flag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    id="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      {content.form.nationalityPlaceholder}
                    </option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </motion.div>

              {/* Date of Birth */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="dateOfBirth"
                >
                  {content.form.dateOfBirthLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* IBAN */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="iban"
                >
                  {content.form.ibanLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="iban"
                    type="text"
                    placeholder={content.form.ibanPlaceholder}
                    value={formData.iban}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* On behalf of */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="onBehalfOf"
                >
                  {content.form.onBehalfOfLabel}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="onBehalfOf"
                    type="text"
                    placeholder={content.form.onBehalfOfPlaceholder}
                    value={formData.onBehalfOf}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {/* Tax Identification Number (TIN) */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="tin"
                >
                  {content.form.tinLabel}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="tin"
                    type="text"
                    placeholder={content.form.tinPlaceholder}
                    value={formData.tin}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {/* Type of Identification Document */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="idType"
                >
                  {content.form.idTypeLabel}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    id="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                  >
                    {idTypes.map((type) => (
                      <option
                        key={type.value}
                        value={type.value}
                        disabled={type.value === ""}
                      >
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </motion.div>

              {/* Document Number */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="idNumber"
                >
                  {content.form.idNumberLabel}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="idNumber"
                    type="text"
                    placeholder={content.form.idNumberPlaceholder}
                    value={formData.idNumber}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {/* Initial Deposit */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="initialDeposit"
                >
                  {content.form.initialDepositLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="initialDeposit"
                    type="number"
                    placeholder={content.form.initialDepositPlaceholder}
                    value={formData.initialDeposit}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Phone Number with country code */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="phone"
                >
                  {content.form.phoneLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder={content.form.phonePlaceholder}
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all text-black"
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="mail"
                >
                  {content.form.emailLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="mail"
                    type="email"
                    placeholder={content.form.emailPlaceholder}
                    value={formData.mail}
                    onChange={handleChange}
                    className="pl-10 w-full py-2 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#219EB2] focus:border-transparent transition-all text-black"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-end"
            >
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-br from-[#206D80] from-20% to-[#219EB2] to-50% text-white font-medium rounded-4xl shadow-lg transition-all flex items-center justify-center disabled:bg-[#219EB2] disabled:cursor-not-allowed"
              >
                <span>
                  {isSubmitting
                    ? content.form.submittingText
                    : content.form.submitButton}
                </span>
                {!isSubmitting && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-2"
                  >
                    →
                  </motion.div>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ParticipantForm;
