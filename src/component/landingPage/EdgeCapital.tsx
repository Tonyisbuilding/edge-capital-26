import "./component.css";
import React, { useEffect, useRef, useState } from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const EdgeCapital: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { language } = useChangeLanguageContext();
  const [activeWordCount, setActiveWordCount] = useState(0);

  // Paragraph 1: The Problem
  const paragraph1 = language === "en"
    ? "At Edge Capital, we believe in a different approach to investing. We do not rely on fundamental or technical analyses, which often lead to inaccurate predictions. It is widely known that four out of five traditional investment funds underperform the index they try to beat over the long term."
    : "Bij Edge Capital geloven we in een andere benadering van beleggen. Wij vertrouwen niet op fundamentele of technische analyses, die vaak leiden tot onnauwkeurige voorspellingen. Het is algemeen bekend dat vier op de vijf traditionele beleggingsfondsen op de lange termijn slechter presteren dan de index die zij proberen te verslaan.";

  // Paragraph 2: The Solution
  const paragraph2 = language === "en"
    ? "Instead of traditional methods, our quantitative trading systems use predefined parameters such as interest rates and option premiums. We limit risks by fully hedging all positions, and we apply our strategies across multiple markets, including options and futures."
    : "In plaats van traditionele methoden maken onze kwantitatieve handelssystemen gebruik van vooraf gedefinieerde parameters, zoals rentestanden en optiepremies. Wij beperken risico's door alle posities volledig af te dekken (hedging), en we passen onze strategieën toe op meerdere markten, waaronder opties en futures.";

  const words1 = paragraph1.split(/\s+/);
  const words2 = paragraph2.split(/\s+/);
  const totalWords = words1.length + words2.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionHeight = rect.height;
      const startPoint = windowHeight;
      const endPoint = -sectionHeight * 0.5;

      const progress = (startPoint - rect.top) / (startPoint - endPoint);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const wordsToReveal = Math.floor(clampedProgress * totalWords);
      setActiveWordCount(wordsToReveal);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords, language]);

  return (
    <section ref={sectionRef} className="text-animation-section bg-[#F6FEFF]">
      <div className="scroll-text-container">
        {/* Paragraph 1 */}
        <p className="animated-paragraph">
          {words1.map((word, index) => (
            <span
              key={`p1-${index}`}
              className={`word-span ${index < activeWordCount ? 'active' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </p>

        {/* Paragraph 2 */}
        <p className="animated-paragraph">
          {words2.map((word, index) => {
            const globalIndex = words1.length + index;
            return (
              <span
                key={`p2-${index}`}
                className={`word-span ${globalIndex < activeWordCount ? 'active' : ''}`}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
};

export default EdgeCapital;
