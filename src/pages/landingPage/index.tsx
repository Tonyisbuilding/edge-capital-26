import Footer from "@/common/Footer";
import NavBar from "@/common/NavBar";
import TeamMemberCards from "@/common/TeamMemberCards";
import Contact from "@/component/landingPage/Contact";
import EdgeCapital from "@/component/landingPage/EdgeCapital";
import HeroSection from "@/component/landingPage/HeroSection";
import Marquee from "@/component/landingPage/Marquee";
import Presentation from "@/component/landingPage/Presentation";
import HomepageVideo from "@/component/landingPage/HomepageVideo";
import AmbassadorSection from "@/component/landingPage/AmbassadorSection";

// import TheTeamYouCanTrust from "@/component/landingPage/TheTeamYouCanTrust";
import WhyEdgeCapital from "@/component/landingPage/WhyEdgeCapital";
// import OurHistory from "@/component/About/OurHistory";
import {
  teamMembers, teamMembersDutch,
  advisoryBoard, advisoryBoardDutch,
  SupportAndCommercial, SupportAndCommercialDutch,
  edgeNextTeam, edgeNextTeamDutch
} from "@/constant/data";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";



import FAQSection from '@/component/EC-Campaign/FAQSection';

const LandingPage = () => {
  const { language } = useChangeLanguageContext();

  // Combine all team members
  const allTeamMembers = language === 'nl'
    ? [...teamMembersDutch, ...advisoryBoardDutch, ...SupportAndCommercialDutch, ...edgeNextTeamDutch]
    : [...teamMembers, ...advisoryBoard, ...SupportAndCommercial, ...edgeNextTeam];

  return (
    <>
      <div>
        <NavBar />
        <HeroSection />
        <div
          style={{
            maxWidth: "1920px",
            margin: "0 auto",
            width: "98%",
          }}
        >
          <Marquee speed={15} />
          <EdgeCapital />
          <WhyEdgeCapital />
          <AmbassadorSection />
          <TeamMemberCards teamMembers={allTeamMembers} />
          <HomepageVideo />

          <Presentation />
        </div>
        <FAQSection />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
