import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const GetStartedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useChangeLanguageContext();
  const [slideDirection, setSlideDirection] = useState(0);
  
  // Translations object
  const translations = {
    en: {
      title: "How to Get Started",
      subtitle: "Refer, earn and impact in three simple steps",
      steps: [
        {
          number: "1",
          title: "Refer New Clients",
          content: "Share your unique referral link or connect with your relationship manager to introduce new clients."
        },
        {
          number: "2",
          title: "Earn Your Rewards",
          content: "Once yOur clients remain active, you'll receive a reward to redeem."
        },
        {
          number: "3",
          title: "Make an Impact",
          content: "Help businesses grow while earning rewards for your valuable referrals."
        }
      ],
      prevButtonLabel: "Previous step",
      nextButtonLabel: "Next step",
      goToStepLabel: "Go to step"
    },
    nl: {
      title: "Hoe te beginnen",
      subtitle: "Verwijs, verdien en maak impact in drie eenvoudige stappen",
      steps: [
        {
          number: "1",
          title: "Verwijs nieuwe klanten",
          content: "DeelU unieke verwijzingslink of Neem Contact op metU relatiemanager om nieuwe klanten te introduceren."
        },
        {
          number: "2",
          title: "VerdienU beloningen",
          content: "ZodraU klanten actief blijven, ontvangU een beloning om in te wisselen."
        },
        {
          number: "3",
          title: "Maak impact",
          content: "Help bedrijven groeien terwijlU beloningen verdient voorU waardevolle verwijzingen."
        }
      ],
      prevButtonLabel: "Vorige stap",
      nextButtonLabel: "Volgende stap",
      goToStepLabel: "Ga naar stap"
    }
  };
  
  // Get the appropriate language translations
  const t = translations[language as keyof typeof translations] || translations.en;
  
  // Use the translated steps
  const steps = t.steps;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + steps.length) % steps.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const handleNext = () => {
    setSlideDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    prevSlide();
  };

  return (
    <div className="bg-gray-100 p-6 md:p-12 w-full">
      <div className="w-[98%] max-w-[1700px] mx-auto">
        {/* Desktop View - Two column layout */}
        <div className="hidden md:flex">
          {/* Left column - Title and navigation */}
          <div className="w-1/2 pr-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800">{t.title}</h2>
              <p className="text-xl text-gray-600 mt-2">{t.subtitle}</p>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={handlePrev}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center 
                shadow-md mr-4 focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                aria-label={t.prevButtonLabel}
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button 
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center 
                shadow-md focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                aria-label={t.nextButtonLabel}
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Right column - Cards */}
          <div className="w-1/2">
            <div className="relative h-[30rem] max-w-[37rem] w-[30rem] right-[-20%]">
              <AnimatePresence custom={slideDirection} initial={false}>
                <motion.div
                  key={currentIndex}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  whileInView="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute w-full bg-white p-8 rounded-xl shadow-lg h-full border-2 border-[#E5E7EB]"
                >
                  <div className="text-[78px] font-bold mb-4 text-black">{steps[currentIndex].number}</div>
                  <h3 className="text-[35px] font-bold mb-4 text-black">{steps[currentIndex].title}</h3>
                  <p className="text-gray-600 text-[25px]">{steps[currentIndex].content}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Mobile View - Stacked layout */}
        <div className="md:hidden">
          {/* Top section - Title and navigation */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-[#001B20]">{t.title}</h2>
            <p className="text-lg text-gray-600 mt-1">{t.subtitle}</p>
            
            <div className="flex items-center mt-4">
              <button 
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center
                 shadow-md mr-4 focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                aria-label={t.prevButtonLabel}
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button 
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center 
                shadow-md focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                aria-label={t.nextButtonLabel}
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Bottom section - Cards */}
          <div className="relative h-64">
            <AnimatePresence custom={slideDirection} initial={false}>
              <motion.div
                key={currentIndex}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                whileInView="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full bg-white p-6 rounded-xl shadow-lg h-full"
              >
                <div className="text-3xl font-bold mb-2 text-black">{steps[currentIndex].number}</div>
                <h3 className="text-xl font-bold mb-3 text-black">{steps[currentIndex].title}</h3>
                <p className="text-gray-600">{steps[currentIndex].content}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Mobile pagination indicators */}
          <div className="flex justify-center mt-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlideDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 w-2 mx-1 rounded-full ${
                  currentIndex === index ? 'bg-green-500' : 'bg-gray-300'
                }`}
                aria-label={`${t.goToStepLabel} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;