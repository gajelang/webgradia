"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import ContactCTA from "@/components/contact-section";

// Komponen baru:
import { OurPartnersSection } from "@/components/OurPartnersSection";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Cleanup ketika komponen di-unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-black max-w-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* Masukkan komponen di sini */}
      <OurPartnersSection />
      <hr className=" mx-24"/>
      <PortfolioSection />
      <TestimonialsSection />
      <ContactCTA />
    </main>
  );
}