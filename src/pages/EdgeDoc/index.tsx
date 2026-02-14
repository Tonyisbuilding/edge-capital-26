import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import EdgeDocuments from "@/component/EdgeDoc/EdgeDocHero";
import DocumentCardSections from "@/component/EdgeDoc/DocumentCard";

const EdgeDoc = () => {
  return (
    <>
      <NavBar />
      <EdgeDocuments />
      <DocumentCardSections />
      <Contact />
      <Footer />
    </>
  );
};

export default EdgeDoc;
