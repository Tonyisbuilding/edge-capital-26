import images from "@/constant/images";
import React from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeHorizonSection = () => {
  const { language } = useChangeLanguageContext();

  return (
    <section className="flex justify-center items-center py-12 px-8 bg-[#eef4f5cc]-50 w-full pt-[15rem] md:h-screen
     lg:max-h-[700px] md:mt-[5rem] md:pt-0">
      <div className="flex w-[98%] max-w-[1700px] gap-1 renderedData items-center flex-wrap  ">
        {/* Text Content */}
        <div className="flex-1 min-w-[300px] md:text-left text-center order-2 md:order-none">
          <h2 className={`text-3xl md:text-5xl font-semibold mb-6 text-gray-800 leading-tight`}>
            {language === "nl"
              ? `De Edge Horizon Foundation vertegenwoordigt de ultieme visie van ons Edge Impact-initiatief. Ons doel is een stichting op te richten die ervoor zorgt dat elke gedoneerde euro effectief wordt besteed.`
              : `The Edge Horizon Foundation represents the ultimate vision of our Edge Impact initiative. Our goal is to establish a foundation that ensures every donated euro is allocated effectively.`}
          </h2>
          <p className="text-base leading-relaxed text-gray-600 mb-6">
            {language === "nl"
              ? `Door een transparant en democratisch platform te creëren, willen we zowel ons bedrijf als Onze klanten in staat stellen
zinvolle projecten te ondersteunen en
samen echte verandering teweeg te brengen.`
              : `By creating a transparent and democratic platform, we aim to empower
            both our company and Our clients to support meaningful projects,
            driving real change together.`}
          </p>
          <p className="text-base font-semibold text-orange-500">
            { language === 'nl' ? `Verwachte lancering: 2026.` : `Expected launch: 2026.`}
          </p>
        </div>

        {/* Image Content */}
        <div className="flex-1 min-w-[300px] flex justify-center items-center order-1 md:order-none mb-8 md:mb-0">
          <img
            src={images.edgefund.edgehorizon}
            alt="Edge Horizon Foundation"
            className=" h-auto animate-subtle-bounce md:w-full"
          />
        </div>
      </div>

      {/* Animation Keyframes */}

      <style>{`
        @keyframes subtle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-subtle-bounce {
          animation: subtle-bounce 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default EdgeHorizonSection;
