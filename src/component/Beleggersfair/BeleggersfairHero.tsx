import React, { Fragment } from "react";
import "./BeleggersfairHero.css";
import helloIcon from "@/assets/icons/hello.svg";
import shieldAwardIcon from "@/assets/icons/shield-award.svg";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constant/images";
import { Link } from "react-router-dom";

const HERO_COPY = {
  nl: {
    date: "Beurs van Berlage, 7 november 2025",
    headingTop: "Onrust in de markt?",
    headingBottom: "Wij benutten het.",
    highlight: "Sinds 2008 volgen marktschokken elkaar sneller op.",
    description: [
      "Bij Edge Capital en EdgeNext zien we volatiliteit niet als risico, maar als kans.",
      "Ontdek hoe absolute return strategieën bescherming én rendement kunnen bieden — juist in turbulente markten.",
    ],
    cta: "Meer informatie",
    sponsor: "Beleggersfair Gold Sponsor",
  },
  en: {
    date: "Beurs van Berlage, 7 November 2025",
    headingTop: "Turmoil in the market?",
    headingBottom: "We exploit it.",
    highlight: "Since 2008, market shocks have arrived faster than ever.",
    description: [
      "At Edge Capital and EdgeNext we see volatility not as a risk, but as an opportunity.",
      "Discover how absolute return strategies can deliver protection and performance — even in turbulent markets.",
    ],
    cta: "Get more information",
    sponsor: "Beleggersfair Gold Sponsor",
  },
} as const;

const BeleggersfairHero = () => {
  const { language } = useChangeLanguageContext();
  const copy = HERO_COPY[language] ?? HERO_COPY.en;

  return (
    <div
      className="BeleggersfairHeroContainer"
      style={{
        backgroundImage: `url(${images.beleggersfair.heroBackground})`,
      }}
    >
      <div className="BeleggersfairContentWrapper">
        <div className="BeleggersfairDateBadge">
          {copy.date}
        </div>

        <h1 className="BeleggersfairMainHeading">
          {copy.headingTop}
          <br />
          {copy.headingBottom}
        </h1>

        <p className="BeleggersfairSubheading">
          <span className="BeleggersfairHighlight">
            {copy.highlight}
          </span>
        </p>

        <p className="BeleggersfairDescription">
          {copy.description.map((line, index) => (
            <Fragment key={index}>
              {line}
              {index < copy.description.length - 1 && <br />}
            </Fragment>
          ))}
        </p>

        <div className="BeleggersfairCtaSection">
          <Link to="/requestinfo" className="BeleggersfairCtaButton">
            {copy.cta}
            <span className="BeleggersfairHandIcon">
              <img src={helloIcon} alt="Waving hand icon" />
            </span>
          </Link>

          <div className="BeleggersfairSponsorBadge">
            <span className="BeleggersfairShieldIcon">
              <img src={shieldAwardIcon} alt="Shield award icon" />
            </span>
            <span className="BeleggersfairSponsorText">
              {copy.sponsor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeleggersfairHero;
