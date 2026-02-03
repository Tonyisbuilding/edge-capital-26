import NavBar from "@/common/NavBar";
import TeamMemberCards from "@/common/TeamMemberCards";
import CompanyTimeline from "@/component/About/CompanyTimeLine";
import EdgeCapitalHero from "@/component/About/EdgeCapitalHero";
import WhatSetsUsApart from "@/component/About/WhatSetUsApart";
import React from "react";
import Footer from "@/common/Footer";
import Contact from "@/component/landingPage/Contact";
import { teamMembers, teamMembersDutch } from "@/constant/data";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const About = () => {

  const { language } = useChangeLanguageContext();
  return (
    <>
      <NavBar />
      <div
        style={{
          maxWidth: "1550px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <EdgeCapitalHero />
        <WhatSetsUsApart />
        <CompanyTimeline />
        <TeamMemberCards teamMembers={language  === 'nl' ? teamMembersDutch : teamMembers} />
        <Contact />
        <Footer />
      </div>
      {/* <EdgeCapitalFooter /> */}
    </>
  );
};

export default About;
