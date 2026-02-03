import NavBar from "@/common/NavBar";
import Footer from "@/common/Footer";
import BeleggersfairHero from "@/component/Beleggersfair/BeleggersfairHero";
import BeleggersfairFormSection from "@/component/Beleggersfair/BeleggersfairFormSection";
import React from "react";
import "./index.css";

const Beleggersfair = () => {
  return (
    <>
      <NavBar />
      <BeleggersfairHero />
      <BeleggersfairFormSection />
      <Footer />
    </>
  );
};

export default Beleggersfair;
