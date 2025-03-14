"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GSAPReveal } from "@/components/animations/gsap-reveal";
import { GSAPTextReveal } from "@/components/animations/gsap-text-reveal";

// Komponen CountUp dengan GSAP
function CountUpGSAP({
  target,
  duration = 2,
  prefix = "",
  suffix = "+",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      },
    });
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 bg-neutral-50 text-black"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Kolom Kiri: Heading + Counters */}
        <div className="flex flex-col justify-between">
          {/* Heading */}
          <GSAPTextReveal type="words" stagger={0.05}>
            <h1 className="text-7xl font-bold mb-8">
              What is Gradia?
            </h1>
          </GSAPTextReveal>

          {/* Empat angka (capaian) */}
          <GSAPReveal animation="slide" direction="up" delay={0.3}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* 1) 150+ Billboard */}
              <div>
                <h3 className="text-5xl font-bold mb-1">
                  <CountUpGSAP target={150} suffix="+" />
                </h3>
                <p className="text-gray-700 text-sm">
                  Billboard & Outdoor Advertising
                  <br />
                  Locations in Indonesia
                </p>
              </div>

              {/* 2) 24+ Hours */}
              <div>
                <h3 className="text-5xl font-bold mb-1">
                  <CountUpGSAP target={24} suffix="/7" />
                </h3>
                <p className="text-gray-700 text-sm">
                  Hours
                  <br />
                  Printing Service
                </p>
              </div>

              {/* 3) 1500+ Clients */}
              <div>
                <h3 className="text-5xl font-bold mb-1">
                  <CountUpGSAP target={1500} suffix="+" />
                </h3>
                <p className="text-gray-700 text-sm">
                  Promotional Media
                  <br />
                  Production Clients
                </p>
              </div>

              {/* 4) 100+ Staff */}
              <div>
                <h3 className="text-5xl font-bold mb-1">
                  <CountUpGSAP target={100} suffix="+" />
                </h3>
                <p className="text-gray-700 text-sm">
                  Experienced
                  <br />
                  Staff
                </p>
              </div>
            </div>
          </GSAPReveal>
        </div>

        {/* Kolom Kanan: Paragraf Penjelasan */}
        <div className="space-y-6">
          <GSAPReveal animation="slide" direction="up" delay={0.2}>
            <p className="text-gray-700 text-2xl">
              Gradia is your one-stop partner for everything your brand needs.
              We handle digital and print advertising, from billboards to social
              media, plus event planning and website development. Whether you
              want to grow your online presence or attract customers with
              eye-catching ads, we help bring your ideas to life.
            </p>
          </GSAPReveal>

          <GSAPReveal animation="slide" direction="up" delay={0.4}>
            <p className="text-gray-700 text-2xl">
              Our team focuses on simple, effective marketing that works. We
              create websites, manage social media, and plan events that make
              people notice your brand. At Gradia, we don’t just offer
              services—we build strong partnerships to help your business grow.
            </p>
          </GSAPReveal>
        </div>
      </div>
    </section>
  );
}
