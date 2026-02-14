import React from "react";
import Navbar from "../../common/NavBar";
import Footer from "../../common/Footer";

const AmbassadeurNyckDeVries: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16">
                <div className="w-[98%] max-w-[1700px] mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#192227] mb-8">
                        Ambassadeur Nyck de Vries
                    </h1>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AmbassadeurNyckDeVries;
