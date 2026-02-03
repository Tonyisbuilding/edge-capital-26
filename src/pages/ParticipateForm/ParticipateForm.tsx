import NavBar from "@/common/NavBar";
import React from "react";
import Footer from "@/common/Footer";
import Contact from "@/component/landingPage/Contact";
import ParticipantForm from "@/common/ParticipateForm";



function ParticipateForm() {
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
        <ParticipantForm />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default ParticipateForm;
