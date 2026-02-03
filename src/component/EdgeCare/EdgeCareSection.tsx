import images from "@/constant/images";
import React from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeCareSection = () => {
  const { language } = useChangeLanguageContext();

  return (
    <section className="flex justify-center items-center py-12 px-8 bg-[#eef4f5cc] w-full mt-[5rem] h-screen lg:max-h-[700px]">
      <div className="flex max-w-6xl w-full gap-12 items-center flex-wrap">
        {/* Text Content */}
        <div className="flex-1 min-w-[300px] md:text-left text-center order-2 md:order-none">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 leading-tight">
            {language === "nl"
              ? "Teruggeven met een doel"
              : "Giving Back with Purpose"}
          </h2>
          <p className="text-base leading-relaxed text-gray-600 mb-6">
            {language === "nl"
              ? `Wij geloven in het creëren van een echte impact. Naarmate ons bedrijf groeit, groeit ook ons vermogen om financieel bij te dragen aan zinvolle doelen. Via Edge Cares selecteren we zorgvuldig zowel nationale als internationale goede doelen om te steunen, zodat onze bijdragen blijvende verandering teweegbrengen.`
              : "We believe in making a real impact. As our company grows, so does our ability to contribute financially to meaningful causes. Through Edge Cares, we are carefully selecting both domestic and international charities to support, ensuring that our contributions create lasting change."}
          </p>
          <p className="text-base font-semibold text-orange-500">
            {language === 'nl' ? `Verwachte lancering: tweede of derde kwartaal van 2025.` : `Expected launch: The second or third quarter of 2025.`} 
          </p>
        </div>

        {/* Image Content */}
        <div className="flex-1 min-w-[300px] flex justify-center items-center order-1 md:order-none mb-8 md:mb-0">
          <img
            src={images.edgefund.edgecare}
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

export default EdgeCareSection;
