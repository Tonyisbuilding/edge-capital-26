import { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';
import SplashLogo from '../../assets/images/landingPage/Edge-capital-logo(splash).svg';

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

const SplashScreen = ({ onLoadingComplete }: SplashScreenProps): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [totalSegments, setTotalSegments] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const segmentWidth = 12; // px
  const segmentGap = 3; // px

  // Calculate total segments that fit the screen width
  useEffect(() => {
    const calculateSegments = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Calculate how many segments fit in the container
        const segments = Math.floor(containerWidth / (segmentWidth + segmentGap));
        setTotalSegments(segments);
      }
    };

    calculateSegments();
    window.addEventListener('resize', calculateSegments);
    return () => window.removeEventListener('resize', calculateSegments);
  }, []);

  useEffect(() => {
    // Slower loading like real websites (~5 seconds)
    const duration = 5000;
    const interval = 80;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + increment;
        if (nextProgress >= 100) {
          clearInterval(timer);
          // Start exit animation
          setTimeout(() => {
            setIsExiting(true);
            // Wait for animation to complete before calling onLoadingComplete
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
          }, 400);
          return 100;
        }
        return nextProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  // Calculate how many segments should be visible based on progress
  const visibleSegments = Math.floor((progress / 100) * totalSegments);

  // Calculate the exact pixel position of the percentage text (at the end of visible segments)
  const percentagePosition = visibleSegments * (segmentWidth + segmentGap);

  return (
    <div className={`splash-screen ${isExiting ? 'exiting' : ''}`}>
      <div className="splash-content">
        <img
          src={SplashLogo}
          alt="Edge Capital"
          className="splash-logo"
        />
      </div>

      <div className="splash-loader-container" ref={containerRef}>
        <div className="splash-loading-bar">
          {/* Segments appear progressively - only render visible ones */}
          {Array.from({ length: visibleSegments }).map((_, index) => (
            <div
              key={index}
              className="splash-bar-segment"
              style={{ width: `${segmentWidth}px` }}
            />
          ))}
        </div>
        {/* Percentage follows the loading exactly - positioned at the end of visible segments */}
        <span
          className="splash-percentage"
          style={{
            left: `${percentagePosition}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;
