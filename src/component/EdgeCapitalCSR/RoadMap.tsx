import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RoadmapCard from "./RoadmapCard";
import images from "@/constant/images";

import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const RoadmapSection = () => {
  const { language } = useChangeLanguageContext();

  const translations = {
    en: {
      title: "Our roadmap",
      roadmapData: [
        {
          id: 1,
          title: "Edge impact label",
          content: "Our Edge impact label identifies and supports projects with significant social and environmental benefits. We carefully select initiatives that align with Our core values and can make a meaningful difference.",
          year: "Present",
          subtitle: "Making an impact today"
        },
        {
          id: 2,
          title: "Edge Cares",
          content: "Our Edge Cares initiative will focus on community engagement and charitable partnerships. This program will empower our team to actively participate in making a difference in the communities where we operate.",
          year: "Mid-2025",
          subtitle: "Community Engagement"
        },
        {
          id: 3,
          title: "Edge Horizon Foundation",
          content: "The Edge Horizon Foundation will serve as our primary vehicle for implementing large-scale sustainability and Social impact projects, creating lasting positive change on a global scale.",
          year: "2026",
          subtitle: "Global Sustainability"
        }
      ]
    },
    nl: {
      title: "Onze roadmap",
      roadmapData: [
        {
          id: 1,
          title: "Edge impact label",
          content: "Ons Edge impact label identificeert en ondersteunt projecten met aanzienlijke sociale en milieugerelateerde voordelen. We selecteren zorgvuldig initiatieven die aansluiten bij Onze kernwaarden en daadwerkelijk een verschil kunnen maken.",
          year: "Heden",
          subtitle: "Impact maken vandaag"
        },
        {
          id: 2,
          title: "Edge Cares",
          content: "Ons Edge Cares-initiatief richt zich op maatschappelijke betrokkenheid en liefdadigheidspartnerschappen. Dit programma stelt ons team in staat om actief bij te dragen aan positieve verandering in de gemeenschappen waarin we actief zijn.",
          year: "Midden 2025",
          subtitle: "Betrokkenheid bij de gemeenschap"
        },
        {
          id: 3,
          title: "Edge Horizon Foundation",
          content: "De Edge Horizon Foundation zal fungeren als ons belangrijkste middel voor het uitvoeren van grootschalige duurzaamheids- en maatschappelijke impactprojecten, met als doel blijvende positieve verandering op wereldniveau.",
          year: "2026",
          subtitle: "Duurzaamheid op wereldschaal"
        }
      ]
    }
  };

  // Use the appropriate content based on language
  const content = translations[language] || translations.en;
  const roadmapData = content.roadmapData;

  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewportHeight, setViewportHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update viewport height on resize
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Scale the timeline based on scroll position
  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={containerRef}
      id="roadmap"
      className="relative py-20 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-start bg-white overflow-hidden"
      aria-labelledby="roadmap-title"
    >
      <div className="w-[98%] max-w-[1700px] mx-auto">
       <h2
  id="roadmap-title"
  className="text-3xl md:text-5xl font-bold text-center mb-16 text-black"
>
  <span
    className="inline-block relative"
    style={{
      backgroundImage: `url(${images.landingPage.Brush})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 100%",
      backgroundSize: "100% 6px",
      paddingBottom: "0.5rem",
    }}
  >
    {content.title}
  </span>
</h2>


        {/* Timeline container */}
        <div className="relative flex flex-col items-center w-full ">
          {/* Animated timeline */}
          <div className="absolute left-[30rem]  top-0 h-full w-px bg-gray-200 transform -translate-x-1/2">
            <motion.div
              className="w-full bg-black rounded-full"
              style={{ height: lineHeight, originY: 0 }}
              aria-hidden="true"
            />
          </div>

          <div className="absolute left-[30rem]  top-0 h-[1rem] w-[1rem] rounded-full bg-black 
          transform -translate-x-1/2"  />

          <div className="absolute left-[30rem]  bottom-0 h-[1rem] w-[1rem] rounded-full bg-black 
          transform -translate-x-1/2"  />

          <div className="absolute left-[30rem]  top-[50%] h-[1rem] w-[1rem] rounded-full bg-black 
          transform -translate-x-1/2"  />

          {roadmapData.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex flex-col md:flex-row items-center mb-24 last:mb-0 "
            >
              {/* Year indicator and milestone - Always on the left */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mb-8 md:mb-0 md:pr-8">
                <div className="flex flex-col items-center md:items-end mb-3 ">
                  <span className="text-xl font-bold block text-black">{item.year}</span>
                  <span className="text-gray-600 text-sm">{item.subtitle}</span>
                </div>
                {/* <div className="h-4 w-4 rounded-full bg-black border-4 border-white relative z-10" aria-hidden="true">
                  <div className="absolute h-px w-8 bg-gray-400 top-1/2 right-full"></div>
                </div> */}
              </div>

              {/* Connecting line only for mobile */}
              <div className="block md:hidden h-12 w-px bg-gray-400 my-2" aria-hidden="true"></div>

              {/* Card - Always on the right */}
              <div className="w-full md:w-1/2 md:pl-8">
                <RoadmapCard
                  number={item.id}
                  title={item.title}
                  content={item.content}
                  index={index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;