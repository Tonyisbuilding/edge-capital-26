import React, { useState, useEffect } from 'react';
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const ReviewsSection = () => {
    const { language } = useChangeLanguageContext();

    const translations = {
        en: {
            title: <>More than 150 entrepreneurs<br />and individuals have gone before you</>,
            reviews: [
                {
                    text: "I am very satisfied with my investments at Edge Capital. For 4 years I’ve neatly received the interest on my bonds every quarter, and in the past 3 months I’ve achieved over 10% return on my participation in EdgeFund. The transparency and professionalism of the team give me a lot of confidence in my investments. I would definitely recommend Edge Capital to other investors.",
                    name: "Johan Vermeer",

                },
                {
                    text: "Very satisfied! I’ve been participating in the EdgeFund from Edge Capital for a year now and have earned over 15% return on my investment. The monthly reports sent by Bolder could come a bit earlier in the month, but fortunately Edge Capital always shares the gross return itself at the end of the month. Contact with Edge Capital is also very satisfactory: they are easy to reach and very helpful. I recommend this firm to invest with.",
                    name: "Bo & Di",

                },
                {
                    text: "Since early 2024 I’ve been investing in the EdgeFund and my experience has been very positive. The return in 2024 was almost 20%, and this year the performance has also remained stable despite volatile markets. Withdrawals were handled quickly and carefully, which strengthened my confidence. The team is knowledgeable and transparent; my visit to the office confirmed this. Edge Capital is a reliable partner for me, with clear communication and solid results.",
                    name: "Roderick den Hartog",

                }
            ]
        },
        nl: {
            title: <>Al meer dan 150 ondernemers<br />en particulieren gingen u voor</>,
            reviews: [
                {
                    text: "Ik ben zeer tevreden met mijn investeringen bij Edge Capital. Al 4 jaar ontvang ik keurig per kwartaal de rente op mijn obligaties en in de afgelopen 3 maanden heb ik ruim 10% rendement behaald op mijn deelname in EdgeFund. De transparantie en professionaliteit van het team geven mij veel vertrouwen in mijn beleggingen. Ik zou Edge Capital zeker aanbevelen aan andere beleggers.",
                    name: "Johan Vermeer",

                },
                {
                    text: "Sinds begin 2024 beleg ik in het Edgefund en mijn ervaring is zeer positief. Het rendement in 2024 was bijna 20% en ook dit jaar blijft de performance stabiel, ondanks de volatiele markten. Opnames werden snel en zorgvuldig verwerkt, wat mijn vertrouwen versterkt. Het team is deskundig en transparant; mijn bezoek aan het kantoor bevestigde dit. Edge Capital is voor mij een betrouwbare partner met duidelijke communicatie en solide resultaten.",
                    name: "Bo & Di",

                },
                {
                    text: "Sinds begin 2024 beleg ik in het Edgefund en mijn ervaring is zeer positief. Het rendement in 2024 was bijna 20% en ook dit jaar blijft de performance stabiel, ondanks de volatiele markten. Opnames werden snel en zorgvuldig verwerkt, wat mijn vertrouwen versterkt. Het team is deskundig en transparant; mijn bezoek aan het kantoor bevestigde dit. Edge Capital is voor mij een betrouwbare partner met duidelijke communicatie en solide resultaten.",
                    name: "Roderick den Hartog",

                }
            ]
        }
    };

    const currentContent = translations[language];
    const reviews = currentContent.reviews;

    const [activeIndex, setActiveIndex] = useState(1); // Start with middle card active
    const autoPlayTime = 15000; // 15 seconds (3x slower)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % reviews.length);
        }, autoPlayTime);

        return () => clearInterval(interval);
    }, [reviews.length]);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
    };

    // Calculate indices for left, center, right to render them specifically if needed, 
    // but for a simple carousel of 3 items, index mapping is straightforward.
    // If we have more than 3, we need sliding window logic. Assuming 3 for now based on screenshot.

    return (
        <div className="ec-reviews-section">
            <h2 className="ec-reviews-title">
                {currentContent.title}
            </h2>

            <div className="ec-carousel-container">
                <div className="ec-carousel-track">
                    {reviews.map((review, index) => {
                        // Determine position relative to active index
                        let position = 'next';
                        if (index === activeIndex) position = 'active';
                        else if (index === (activeIndex - 1 + reviews.length) % reviews.length) position = 'prev';

                        return (
                            <div key={index} className={`ec-review-card ${position}`}>
                                <p className="ec-review-text">{review.text}</p>
                                <div className="ec-review-author">
                                    <h4>{review.name}</h4>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="ec-carousel-indicators">
                {reviews.map((_, index) => (
                    <div
                        key={index}
                        className={`ec-indicator-line ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    >
                        <div className="ec-progress-bar"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsSection;
