import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import EdgeDocuments from "@/component/EdgeDoc/EdgeDocHero";
import DocumentCardSections from "@/component/EdgeDoc/DocumentCard";

const EdgeDoc = () => {
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
        <EdgeDocuments />
        <DocumentCardSections />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default EdgeDoc;
