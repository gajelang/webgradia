"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextAnimation } from "@/components/animations/text-animation";
import { FadeIn } from "@/components/animations/fade-in";
import { Magnetic } from "@/components/animations/magnetic";
import { Button } from "@/components/ui/button";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { ClientsSection } from "@/components/clients-section";

// Komponen CyclingVector: menggantikan logo image
function CyclingVector() {
  const vectors = [
    // Vector #1
    <svg
      key="v1"
      width="50"
      height="50"
      viewBox="0 0 108.89 108.89"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ff4e00"
        d="M58.34,0h-7.78v34.44L37.66,2.51l-7.21,2.91,13.24,32.76L18.7,13.2l-5.5,5.5,23.95,23.95L6.11,29.08l-3.11,7.13,32.83,14.35H0v7.78h35.83L3,72.68l3.11,7.13,31.03-13.56-23.95,23.95,5.5,5.5,24.98-24.98-13.24,32.76,7.21,2.91,12.9-31.93v34.44h7.78v-34.44l12.9,31.93,7.21-2.91-13.23-32.76,24.98,24.98,5.5-5.5-23.95-23.95,31.03,13.56,3.11-7.13-32.83-14.35h35.83v-7.78h-35.83l32.83-14.35-3.11-7.13-31.03,13.56,23.95-23.95-5.5-5.5-24.98,24.98,13.23-32.76-7.21-2.91-12.9,31.93V0Z"
      />
    </svg>,
    // Vector #2
    <svg
      key="v2"
      width="50"
      height="50"
      viewBox="0 0 108.89 73.35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="#ff4e00"
        points="108.89 10.48 108.89 52.39 72.59 73.35 72.59 52.39 54.44 62.87 36.29 52.39 36.29 73.35 0 52.39 0 10.48 18.15 20.96 18.15 0 54.44 20.96 90.74 0 90.74 20.96 108.89 10.48"
      />
    </svg>,
    // Vector #3
    <svg
      key="v3"
      width="50"
      height="50"
      viewBox="0 0 109.93 115.58"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ff4e00"
        d="M54.96,0l8.61,31.3,25.36-20.26-11.43,30.38,32.43-1.49-27.11,17.86,27.11,17.86-32.43-1.49,11.43,30.38-25.36-20.26-8.61,31.3-8.61-31.3-25.36,20.26,11.43-30.38-32.43,1.49,27.11-17.86L0,39.93l32.43,1.49-11.43-30.38,25.36,20.26L54.96,0Z"
      />
    </svg>,
    // Vector #4
    <svg
      key="v4"
      width="50"
      height="50"
      viewBox="0 0 108.89 108.89"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ff4e00"
        d="M108.89,53.34v2.92h-.39c-29.14,0-52.78,23.54-52.93,52.63h-2.62c-.16-29.1-23.81-52.63-52.95-52.63v-2.92C29.24,53.34,52.95,29.63,52.95.39v-.39h2.62v.39c0,29.24,23.69,52.95,52.93,52.95h.39Z"
      />
    </svg>,
    // Vector #5
    <svg
      key="v5"
      width="50"
      height="50"
      viewBox="0 0 107.11 109.32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ff4e00"
        d="M55.38,5.45v38.36c0,6.97,3.76,13.39,9.84,16.8l32.15,18.01c1.79,1,4.03,1.06,5.95-.04,1.31-.74,2.25-2.01,2.73-3.43l.59-1.71c.32-.92.48-1.88.48-2.86v-26.11c0-1.01-.22-2.01-.64-2.92l-.05-.11c-.64-1.38-1.67-2.56-3.03-3.24-2.02-1.01-4.31-.9-6.15.15l-17.94,10.23c-1.89,1.08-4.16,1.28-6.21.54l-.73-.26c-1.84-.66-3.36-2.1-3.93-3.97-.85-2.79.34-5.66,2.71-7.06l21.21-12.58c1.39-.82,2.34-2.34,2.35-4.16.01-1.18-.48-2.3-1.24-3.2h0c-.39-.46-.86-.84-1.39-1.14L63.04.65c-1.4-.77-3.11-.88-4.65-.18-1.89.85-3.01,2.84-3.01,4.91v.07Z"
      />
    </svg>,
    // Vector #6
    <svg
      key="v6"
      width="50"
      height="50"
      viewBox="0 0 105.1 104.7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="#ff4e00"
        points="87.3 0 87.3 17.27 69.5 17.27 69.5 34.68 52.75 34.68 52.35 34.68 35.6 34.68 35.6 17.27 17.8 17.27 17.8 0 0 0 0 104.7 17.8 104.7 17.8 87.43 35.6 87.43 35.6 70.02 52.35 70.02 52.75 70.02 69.5 70.02 69.5 87.43 87.3 87.43 87.3 104.7 105.1 104.7 105.1 0 87.3 0"
      />
    </svg>,
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % vectors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [vectors.length]);

  return <>{vectors[index]}</>;
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
      gsap.to(animationRef.current, {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  // Fungsi untuk smooth scroll ke section "about"
  const handleLearnMore = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen md:pt-32 pt-10 overflow-hidden bg-white text-black"
    >
      <InteractiveGrid
        containerClassName="absolute inset-0"
        className="opacity-30"
        points={40}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-2">
          {/* Menggunakan CyclingVector sebagai logo */}
          <div className="mx-auto mb-16 w-10">
            <CyclingVector />
          </div>

          <TextAnimation
            type="words"
            staggerDelay={0.05}
            className="text-3xl md:text-7xl font-bold mb-10 tracking-tight"
          >
            Your All-in-One Partner for
            <br />
            Marketing, Events & Branding.
          </TextAnimation>

          <FadeIn delay={0.5} direction="up">
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              <strong>Gradia</strong> is a Full-service advertising agency delivering impactful campaigns
              across print, digital, and experiential media. We transform ideas
              into powerful brand stories that resonate with your audience.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} direction="up">
            <div className="flex gap-4 justify-center">
              {/* Tombol Learn More: scroll ke #about */}
              <Magnetic strength={50}>
                <Button
                  variant="outline"
                  className="gap-2 border-gray-200 bg-white hover:bg-gray-100"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </Magnetic>

              {/* Tombol Ask a Question: mengarah ke WhatsApp */}
              <Magnetic strength={50}>
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  <a
                    href="https://wa.me/628895018725"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    Ask a Question
                  </a>
                </Button>
              </Magnetic>
            </div>
          </FadeIn>
        </div>

        {/* Opsional: Tambahkan bagian animasi atau ClientsSection di bawah */}
        <div ref={animationRef}></div>
      </div>

      <ClientsSection/>
    </section>
  );
}
