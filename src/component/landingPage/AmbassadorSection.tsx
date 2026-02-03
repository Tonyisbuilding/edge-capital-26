import React, { useEffect, useState } from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import "./ambassadorSection.css";

// Import ambassador background images
import ambImg1 from "./amb-img1.jpg";
import ambImg2 from "./amb-img2.jpg";
// Import mobile background images
import ambImg1Mobile from "@/assets/images/landingPage/amb-img1-mobile.jpg";
import ambImg2Mobile from "@/assets/images/landingPage/amb-img2-mobile.jpg";

import titleUnderline from "./Vector 13.svg";

const AmbassadorSection: React.FC = () => {
    const { language } = useChangeLanguageContext();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const images = isMobile ? [ambImg1Mobile, ambImg2Mobile] : [ambImg1, ambImg2];
    const intervalDuration = 5000; // 5 seconds per image

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    // Switch to next image
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                    return 0;
                }
                return prev + (100 / (intervalDuration / 50)); // Update every 50ms
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [images.length]);

    return (
        <section className="ambassador-section">
            <div className="ambassador-container">
                {/* Header */}
                <div className="ambassador-header">
                    <h2 className="ambassador-title">
                        {language === 'nl'
                            ? 'Nyck de Vries, Edge Capital Ambassadeur'
                            : 'Nyck de Vries, Edge Capital Ambassador'}
                    </h2>
                    <img src={titleUnderline} alt="" className="title-underline" />
                </div>

                {/* Background Image Slider */}
                <div className="ambassador-content">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`ambassador-bg ${index === currentImageIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}

                    {/* Content Overlay */}
                    <div className="ambassador-overlay">
                        <div className="ambassador-text-content">
                            <h3 className="ambassador-headline">
                                {language === 'nl'
                                    ? 'Uithoudingsvermogen. Efficiëntie. Prestaties.'
                                    : 'Endurance. Efficiency. Performance.'}
                            </h3>
                            <p className="ambassador-description">
                                {language === 'nl'
                                    ? 'Wij combineren diepgaande handelskennis met geavanceerde analyses en technologie om kritieke liquiditeit te leveren en de wereldwijde markten van morgen vorm te geven.'
                                    : 'We combine deep trading expertise with advanced analytics and technology to deliver critical liquidity and shape the global markets of tomorrow.'}
                            </p>
                            <a href="/ambassador" className="ambassador-cta">
                                {language === 'nl' ? 'Lees meer' : 'Read more'}
                                <span className="cta-arrow">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Progress Loader */}
                    <div className="ambassador-loader">
                        {images.map((_, index) => (
                            <div key={index} className="loader-item">
                                <div
                                    className={`loader-progress ${index === currentImageIndex ? 'active' : ''}`}
                                    style={{
                                        width: index === currentImageIndex ? `${progress}%` : index < currentImageIndex ? '100%' : '0%'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AmbassadorSection;
