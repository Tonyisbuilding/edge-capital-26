import React from 'react';
import { Users, TrendingUp, Home, Clock, LucideIcon } from 'lucide-react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

interface ClientCardProps {
  title: string;
  description: string;
  icon: LucideIcon; 
}

const ClientCard = ({ title, description, icon: Icon }: ClientCardProps) => (
  <div className="relative overflow-hidden bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#206A7C]/10 rounded-full transition-transform duration-300 group-hover:scale-150"></div>
    <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-[#206A7C]/5 rounded-full transition-transform duration-500 group-hover:scale-150 delay-100"></div>
    
    <div className="flex flex-col h-full relative z-10">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#206A7C]/10 text-[#206A7C] mb-4 transition-all duration-300 group-hover:bg-[#206A7C]/20">
          <Icon size={20} className="transition-all duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      </div>
      
      <p className="text-gray-600 flex-grow">{description}</p>
    </div>
  </div>
);

const ClientsSection = () => {
  const { language } = useChangeLanguageContext();

  // Define translations for English and Dutch
  const translations = {
    en: {
      // subheader: "Trusted Partners",
      header: "Our clients",
      description: "We serve a broad spectrum of institutional clients with tailored solutions.",
      clients: [
        {
          title: "Hedge funds and asset managers",
          description: "If you want to diversify within your strategy or completely outsource the strategy.",
          icon: TrendingUp,
        },
        {
          title: "Proprietary trading firms",
          description: "For prop traders looking to enhance or diversify their strategy.",
          icon: Users,
        },
        {
          title: "Family offices",
          description: "Market-neutral investing to reduce risk.",
          icon: Home,
        },
        {
          title: "Factoring companies",
          description: "Park your idle funds for a favorable return.",
          icon: Clock,
        },
      ],
    },
    nl: {
      // subheader: "Vertrouwde Partners",
      header: "Onze klanten",
      description: "We bedienen een breed scala aan institutionele klanten met oplossingen op maat.",
      clients: [
        {
          title: "Hedgefondsen en vermogensbeheerders",
          description: "Als u uw strategie wilt diversifiëren of de strategie volledig wilt uitbesteden.",
          icon: TrendingUp,
        },
        {
          title: "Propriëtaire handelsbedrijven",
          description: "Voor prop-handelaren die hun strategie willen verbeteren of diversifiëren.",
          icon: Users,
        },
        {
          title: "Familiekantoren",
          description: "Marktneutraal beleggen om risico's te verminderen.",
          icon: Home,
        },
        {
          title: "Factoringbedrijven",
          description: "Parkeer uw inactieve fondsen voor een gunstig rendement.",
          icon: Clock,
        },
      ],
    },
  };

  // Select the appropriate content based on language, with fallback to English
  const content = translations[language] || translations.en;
  const clients = content.clients;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-[#206A7C]/5">
      <div className="w-[98%] max-w-[1700px] mx-auto px-6">
        <div className="text-center mb-16">
          {/* <div className="inline-block px-3 py-1 rounded-full bg-[#206A7C]/10 text-[#206A7C] text-sm font-medium mb-4">
            {content.subheader}
          </div> */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.header}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <ClientCard 
              key={index} 
              title={client.title} 
              description={client.description} 
              icon={client.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;