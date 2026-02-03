import React, { useState } from "react";
import { motion } from "framer-motion";
import { teamMemberCardstDataType } from "@/constant/data";
import images from "@/constant/images";
import "../component/landingPage/component.css";
import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import titleUnderline from "../component/landingPage/Vector 13.svg";



const TeamCard = ({
  name,
  position,
  bio,
  linkedin,
  image,
}: teamMemberCardstDataType) => {
  const [isFlipped, setIsFlipped] = useState(false);


  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const { pathname } = useLocation();

  return (
    <div
      className="relative flex-shrink-0 w-[320px] md:w-[480px] h-[22rem] md:h-[32rem] cursor-pointer"
      onClick={handleFlip}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="absolute w-full h-full rounded-tr-[1rem] rounded-bl-[1rem] overflow-hidden"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="w-full h-full bg-black relative">
          <img
            src={image || "/api/placeholder/400/500"}
            alt={name}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay - half height from bottom */}
          <div
            className={`absolute bottom-0 left-0 w-full h-1/2 flex items-end
              ${pathname.slice(1) === "team" ? "hidden" : "block"}`}
            style={{
              background: 'linear-gradient(to top, rgba(8, 6, 7, 1) 0%, rgba(8, 6, 7, 0.2) 50%, rgba(8, 6, 7, 0) 100%)'
            }}
          >
            <div className="w-full p-4 text-white text-xl font-medium text-center rounded-bl-[1rem]">
              {name}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={` bg-white w-full absolute bottom-[0rem] md:bottom-[0rem] rounded-bl-[1rem] p-5
       shadow-lg shadow-[#9e9d9d54] text-[#192227] flex items-center justify-between
        ${pathname.slice(1) !== "team" ? "hidden" : "block"}`}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div>
          <h1 className="inter text-[13.14px] md:text-[22.58px] font-medium">
            {name}
          </h1>
          <h1 className="inter text-[8.15px] md:text-[14px] font-medium">
            {position}
          </h1>
        </div>
        <button
          className="flex items-center hover:cursor-pointer"
          onClick={() => window.open(`${linkedin}`, '_blank')}
        >
          <h1 className="inter text-[14px] md:text-[14px] font-medium text-[#206A7C]">
            About
          </h1>
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-left text-[#206A7C]" />
        </button>
      </motion.div>

      <motion.div
        className="absolute w-full h-full rounded-lg overflow-hidden bg-gray-800 text-white p-6"
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-gray-300 mb-4">{position}</p>
            <p className="text-sm">{bio}</p>
          </div>
          {linkedin && (
            <div>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

type TeamMemberCardsProps = {
  teamMembers: teamMemberCardstDataType[];
  department?: string;
};

const TeamMemberCards = ({ teamMembers, department }: TeamMemberCardsProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language } = useChangeLanguageContext();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const isTeamPage = pathname.slice(1) === "team";

  // Auto-scroll animation
  React.useEffect(() => {
    if (isTeamPage) return; // Don't auto-scroll on team page

    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.25; // pixels per frame

    const animate = () => {
      if (!isPaused && container) {
        scrollPosition += scrollSpeed;

        // Reset to start when reaching the end
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
          scrollPosition = 0;
        }

        container.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isTeamPage]);

  return (
    <>
      <div
        className={`bg-[#F6FEFF] py-[2rem] relative overflow-hidden
        `}
      >
        <div>
          <div>
            <img
              src={images.landingPage.dots_updated}
              alt=""
              className="absolute left-0 top-[2rem] pointer-events-none select-none"
            />
          </div>
          <div>
            <img
              src={images.landingPage.dots_updated}
              alt=""
              className="absolute left-0 top-[19rem] lg:block hidden pointer-events-none select-none"
            />
          </div>
          <div>
            <img
              src={images.landingPage.dots_updated}
              alt=""
              className="absolute right-0 top-[2rem] lg:block hidden pointer-events-none select-none"
            />
          </div>
        </div>
        {/* ........ */}
        <div
          className={`w-[98%] max-w-[1700px] mx-auto px-0 md:px-4 ${pathname.slice(1) === "team" ? "py-0 md:py-5" : "py-12"
            }`}
        >
          <div
            className={`text-[27.1px] md:[60.23px] inter font-semibold text-left mb-3 text-black
          ${pathname.slice(1) !== "team" ? "hidden" : "block"} inter`}
          >
            <div className="relative inline-block">
              <h1 className="font-semibold md:text-[60.23px] text-[35.05px]">
                {department}
              </h1>
              <img
                src={images.landingPage.Brush}
                alt="Underline brush"
                className="absolute left-0 bottom-0 w-auto h-[8px] pointer-events-none"
              />
            </div>

            {/* <div className=" bg-[#F9A600] h-[2px] w-[5rem]"></div> */}
          </div>
          <div className={`text-center mb-12 ${pathname.slice(1) === "team" ? "hidden" : "block"}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-[#02080A] mb-1">
              {language === 'nl' ? 'Ontmoet het Edge Capital Team' : 'Meet the Edge Capital Team'}
            </h2>
            <img src={titleUnderline} alt="" className="mx-auto w-[clamp(200px,30vw,350px)] h-auto mb-3" />
            <p className="text-base md:text-lg text-[#02080A] opacity-80">
              {language === 'nl'
                ? 'Ontmoet de mensen die alles stabiel en in beweging houden.'
                : 'Meet the minds who keep things steady and moving forward.'}
            </p>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {teamMembers.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>

          <div
            className={`flex justify-center mt-10 ${pathname.slice(1) === "team" ? "hidden" : "block"
              }`}
          >
            <button
              type="button"
              onClick={() => navigate("/team")}
              className="relative z-10 bg-[#206A7C] text-white font-medium py-[10px] px-[20px] rounded-full 
  shadow-[0_4px_10px_rgba(32,106,124,0.3)] hover:shadow-[0_8px_20px_rgba(32,106,124,0.45)] 
  hover:-translate-y-[2px] transition-all duration-200"
            >
              {language === 'nl' ? 'Leer ons gehele team kennen' : 'Meet our entire team'}
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberCards;
