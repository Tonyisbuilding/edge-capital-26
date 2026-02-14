import { whyEdgeCapitalData, whyEdgeCapitalDataDutch } from "@/constant/data";
import "./component.css";
import "./whyUs.css";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";


const WhyEdgeCapital = () => {
  const { language } = useChangeLanguageContext();

  const renderData = language === 'en' ? whyEdgeCapitalData : whyEdgeCapitalDataDutch;
  return (
    <>
      <div className="bg-[#02080A] py-[1.5rem] rounded-t-[1rem] rounded-b-none px-[1rem] relative max-w-[1700px] mx-auto w-[98%]">
        <div className="p-[.1rem] text-center flex flex-col items-center">
          <h1 className="text-[#FFFFFF] font-bold text-3xl md:text-5xl montserrat md:px-[.1rem]">
            {language === 'nl' ? 'Waarom Edge Capital?' : 'Why Edge Capital?'}
          </h1>
          <p
            className="md:text-[17.45px] text-[12px] font-normal text-[#FFFFFF] my-1 
          lg:w-[50rem] montserrat md:px-[1rem] leading-6 py-[.5rem] text-center"
          >
            {language === 'nl'
              ? 'Gebouwd op het vertrouwen van onze obligatiehouders en gedreven door een streven naar topprestaties. Ons succes wordt uitsluitend gemeten aan de hand van het uwe. Hieronder volgen de kernprincipes die het voordeel van Edge Capital definiëren.'
              : 'Built on the trust of our bondholders and driven by a commitment to elite performance. Our success is measured solely by yours. Below are the core principles that define the Edge Capital advantage.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[1.5rem]">

          {
            renderData.map((feature, index) => (
              <div className="card" key={index}>
                <div className="icon w-[4rem] h-[4rem]">
                  <img src={feature.icon} alt={`${feature.title} icon`} className='' />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default WhyEdgeCapital;
