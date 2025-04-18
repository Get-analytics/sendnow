import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import AnalyticsOverview from "@/components/AnalyticsOverview";
import FeatureSection from "@/components/FeatureSection";
import UserTypeSection from "@/components/UserTypeSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-hidden bg-white text-gray-800"
    >
      <Header />
      <Hero />
      <UploadSection />
      <AnalyticsOverview />
      <FeatureSection />
      <UserTypeSection />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <ContactForm />
      <CTASection />
      <Footer />
    </motion.div>
  );
};

export default Home;
