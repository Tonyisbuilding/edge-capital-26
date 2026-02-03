import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import RequestInfoForm from "@/common/RequestInfoForm";


function RequestInfo() {
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
        <RequestInfoForm />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default RequestInfo;