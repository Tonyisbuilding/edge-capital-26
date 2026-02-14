import NavBar from "@/common/NavBar";
import Contact from "@/component/landingPage/Contact";
import Footer from "@/common/Footer";
import RequestInfoForm from "@/common/RequestInfoForm";


function RequestInfo() {
  return (
    <>
      <NavBar />
      <RequestInfoForm />
      <Contact />
      <Footer />
    </>
  )
}

export default RequestInfo;