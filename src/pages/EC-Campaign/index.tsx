import React, { useState, useRef } from 'react';
import Footer from "@/common/Footer";

import HeroSection from "@/component/EC-Campaign/HeroSection";
import TrustSection from "@/component/EC-Campaign/TrustSection";
import ReviewsSection from "@/component/EC-Campaign/ReviewsSection";
import FeaturesSection from "@/component/EC-Campaign/FeaturesSection";
import HowItWorksSection from '@/component/EC-Campaign/HowItWorksSection';
import BenefitsSection from '@/component/EC-Campaign/BenefitsSection';
import LeadFormSection from '@/component/EC-Campaign/LeadFormSection';
import FAQSection from '@/component/EC-Campaign/FAQSection';
const ECCampaign = () => {
    const [prefilledEmail, setPrefilledEmail] = useState("");
    const leadFormRef = useRef<HTMLDivElement>(null);

    const handleHeroCtaClick = (email: string) => {
        setPrefilledEmail(email);
        // Scroll to the lead form
        if (leadFormRef.current) {
            leadFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="ec-campaign-page">
            <HeroSection onCtaClick={handleHeroCtaClick} />
            <TrustSection />
            <ReviewsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BenefitsSection />
            <LeadFormSection initialEmail={prefilledEmail} sectionRef={leadFormRef} />
            <Footer />
        </div>
    );
};

export default ECCampaign;
