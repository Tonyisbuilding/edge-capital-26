import TeamMemberCards from "@/common/TeamMemberCards";
import NavBar from "@/common/NavBar";
import {
  teamMembers,
  teamMembersDutch,
  advisoryBoard,
  advisoryBoardDutch,
  SupportAndCommercial,
  SupportAndCommercialDutch,
} from "@/constant/data";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";

const Teams = () => {

  const { language } = useChangeLanguageContext();

  return (
    <>
      <NavBar />
      <div className="bg-[#EEF4F5] pt-[6rem] md:pt-[5rem]">
        <TeamMemberCards
          teamMembers={language === 'nl' ? teamMembersDutch : teamMembers}
          department={language === 'nl' ? 'Management' : "Management"}
        />
        <TeamMemberCards
          teamMembers={language === 'nl' ? advisoryBoardDutch : advisoryBoard}
          department={language === 'nl' ? 'Advies' : 'Advisory board'}
        />
        <TeamMemberCards
          teamMembers={language === 'nl' ? SupportAndCommercialDutch : SupportAndCommercial}
          department={language === 'nl' ? 'Support en commercieel' : 'Support and commercial'}
        />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Teams;
