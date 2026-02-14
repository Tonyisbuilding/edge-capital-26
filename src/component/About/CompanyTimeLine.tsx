import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { timelineData, timelineDataDutch } from "@/constant/data";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const CompanyTimeline = () => {
  const { language } = useChangeLanguageContext();
  const [mounted, setMounted] = useState(false);
  const renderedData = language === 'nl' ? timelineDataDutch : timelineData;
  const [activeYear, setActiveYear] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll active year into view
  const scrollToActiveYear = useCallback((index: number) => {
    const el = yearRefs.current[index];
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft + (elRect.left - containerRect.left) - (containerRect.width / 2) + (elRect.width / 2);
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToActiveYear(activeYear);
  }, [activeYear, scrollToActiveYear]);

  const handlePrevYear = () => {
    setActiveYear((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  };

  const handleNextYear = () => {
    setActiveYear((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));
  };

  const handleYearClick = (index: number) => {
    setActiveYear(index);
  };

  return (
    <section className="py-16 px-[10px] md:px-4  ">
      <div className="w-[98%] max-w-[1700px] mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {language === 'nl' ? 'Al meer dan 8 jaar' : 'For over 8 years'}
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 mb-8 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {language === 'nl'
            ? 'We bieden een platform dat beleggers een voorsprong biedt. Door ons te richten op innovatie en groei, transformeren we het financiële landschap.'
            : "We're building a platform that gives investors an edge. By focusing on innovation and growth, we're transforming the financial landscape."}
        </motion.p>
        
        {/* Timeline Navigation */}
        <div className="relative flex items-center mb-8 md:mb-16">
          <button 
            onClick={handlePrevYear}
            className="absolute left-0 bg-[#206A7C] text-white p-2 rounded-md hover:bg-teal-800 
            transition-colors z-10"
            aria-label="Previous year"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div ref={scrollContainerRef} className="w-full overflow-x-auto mx-10 py-[2rem] px-[.5rem] md:px-[2rem]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="relative min-w-[420px]">
              {/* Timeline Bar */}
              <div className="h-1 bg-[#206A7C] w-full absolute top-1/2 -translate-y-1/2"></div>

              {/* Year Markers */}
              <div className="flex justify-between relative mb-[1rem] gap-2">
                {timelineData.map((item, index) => (
                  <div key={`${item.year}-${index}`} ref={(el) => { yearRefs.current[index] = el; }} className="flex flex-col items-center relative">
                    <button
                      onClick={() => handleYearClick(index)}
                      className={`relative z-10 transition-all duration-300 ${
                        index === activeYear 
                          ? "text-[#206A7C] font-bold" 
                          : "text-gray-500 hover:text-teal-600"
                      }`}
                    >
                      <div className="h-10 w-10 flex items-center justify-center mb-2 transition-colors duration-300 relative">
                        {/* Only render motion div after component is mounted */}
                        {mounted && index === activeYear && (
                          <motion.div
                            layoutId="activeYearIndicator"
                            className="absolute inset-0 top-[2.2rem] rounded-full border-2
                             border-teal-700 w-[3rem] h-[3rem] md:w-[3.5rem] md:h-[3.5rem]
                             left-1/2 transform -translate-x-1/2"
                            transition={{ duration: 0.5 }}
                            initial={false}
                          />
                        )}
                        {/* Fallback for SSR */}
                        {!mounted && index === activeYear && (
                          <div className="absolute inset-0 top-[2.2rem] rounded-full border-2
                           border-teal-700 w-[3rem] h-[3rem] md:w-[3.5rem] md:h-[3.5rem]
                           left-1/2 transform -translate-x-1/2" />
                        )}
                      </div>
                      <span 
                        className="block md:text-base mt-3 text-sm"
                        style={{ fontSize: item.year === 'Future' ? 13 : 14 }}
                      >
                        {item.year}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleNextYear}
            className="absolute right-0 bg-[#206A7C] text-white p-2 rounded-md hover:bg-teal-800 transition-colors z-10"
            aria-label="Next year"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Content Display */}
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h3
              key={`year-${activeYear}`}
              className="text-3xl font-bold text-[#206A7C] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {timelineData[activeYear].year}
            </motion.h3>
            
            <motion.p
              key={`content-${activeYear}`}
              className="text-lg text-gray-800 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {renderedData[activeYear].content}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;