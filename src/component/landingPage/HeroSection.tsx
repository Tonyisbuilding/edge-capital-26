import images from "@/constant/images";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

// Beleggen met een voorsprong!
const HeroSection = () => {
  const { language } = useChangeLanguageContext();
  return (
    <>
      {/* Gradient from #EEF4F5 (80%) to #F6FEFF (20%) */}
      <section className="hero page-section mt-[48px]" style={{ background: 'linear-gradient(to bottom, #EEF4F5 80%, #F6FEFF 100%)' }}>
        <div className="container hero-container pt-[44px] sm:pt-0">
          <div className="hero-main">
            <div className="hero-content">
              <h1 className="hero-title">
                {language === "en" ? "Investing" : "Beleggen met "}
                <br />
                {language === "en" ? "with An Edge" : "een voorsprong!"}
              </h1>

              <p className="hero-subtitle">
                {language === "nl"
                  ? "Gebruik van dynamische, datagestuurde strategieën voor superieure rendementen met een beheerst risico."
                  : "Using dynamic, data-driven strategy for superior returns with controlled risk"}
              </p>

              <div className="hero-buttons ">
                <button className="btn btn-primary">
                  <Link to="/contact" className="block ">
                    {language === "nl" ? "Neem Contact op" : "Get in Touch"}
                  </Link>
                </button>
                <button className="btn btn-secondary">
                  <Link to="/requestinfo">
                    {language === "nl" ? "Brochure aanvragen" : "Request Brochure"}
                  </Link>
                </button>
              </div>
            </div>

            <div className="hero-image">
              <video
                autoPlay
                loop
                muted
                playsInline
                src={images.landingPage.heroSectionVideo}
                className="w-full h-full object-cover opacity-75"
              />
            </div>
          </div>

          <div className="hero-features">
            <div className="hero-feature">
              <div className="feature-icon">
                <img src={images.landingPage.LimitedRiskIcon} alt="Limited Risk" />
              </div>
              <div className="feature-text">
                <h3 className="bold-text">
                  {language === "nl" ? "Beperkt Risico" : "Limited Risk"}
                </h3>
                <p>
                  {language === "nl"
                    ? "Risicomanagement staat bij ons voorop: kapitaalbescherming is voor ons even essentieel als het realiseren van netto rendement."
                    : "Risk management is our priority: capital protection is just as essential to us as achieving net returns."}
                </p>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                <img src={images.landingPage.FlexibleIcon} alt="Flexible" />
              </div>
              <div className="feature-text">
                <h3 className="bold-text">
                  {language === "nl" ? "Flexibel" : "Flexible"}
                </h3>
                <p>
                  {language === "nl"
                    ? "Maandelijks in en uitstappen zonder kosten"
                    : "Monthly entry and exit without costs"}
                </p>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                <img src={images.landingPage.CrisisResilientIcon} alt="Average Return" />
              </div>
              <div className="feature-text">
                <h3 className="bold-text">
                  {language === "nl" ? "Gemiddeld rendement" : "Average Return"}
                </h3>
                <p>
                  {language === "nl"
                    ? "Ons fondspallet is opgebouwd uit marktneutrale strategieën met als doelstelling een jaarlijks rendement tussen 12% en 20%, onafhankelijk van de richting van de markt."
                    : "Our fund portfolio is built on market-neutral strategies, targeting annual returns between 12% and 20%, regardless of market direction."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

//  {images.landingPage.strategy}
//  {images.landingPage.bolt}
//  {images.landingPage.management}
//  src={images.landingPage.heroSection}
