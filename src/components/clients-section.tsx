"use client";

import React, { useEffect, useRef, ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

// Utility function untuk menggabungkan class names
function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GSAPTextReveal({
  children,
  stagger = 0.05,
}: {
  children: React.ReactNode;
  stagger?: number;
}) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (el.current) {
      gsap.fromTo(
        el.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger, duration: 0.5 }
      );
    }
  }, [stagger]);
  return <div ref={el}>{children}</div>;
}

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
  gap?: string;
}

export function Marquee({
  className,
  reverse = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 40,
  gap = "2rem",
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ "--duration": `${speed}s`, "--gap": gap } as React.CSSProperties}
      className={cn(
        "flex overflow-hidden p-2 [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical
                ? "animate-marquee-vertical flex-col"
                : "animate-marquee flex-row",
              reverse ? "[animation-direction:reverse]" : ""
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export function ClientsSection() {
  const clients = [
    {
      name: "BCA",
      src: "/img/logo/bca.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "BNI",
      src: "/img/logo/bni.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "esse",
      src: "/img/logo/esse.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "gojek",
      src: "/img/logo/gojek.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "grab",
      src: "/img/logo/grab.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "kfc",
      src: "/img/logo/kfc.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "maybank",
      src: "/img/logo/maybank.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "mnc",
      src: "/img/logo/mnc.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "pssi",
      src: "/img/logo/pssi.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 120,
      imageHeight: 40,
    },
    {
      name: "samsung",
      src: "/img/logo/samsung.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 180,
      imageHeight: 40,
    },
    {
      name: "xl",
      src: "/img/logo/xl.png",
      wrapperWidth: 150,
      wrapperHeight: 80,
      imageWidth: 70,
      imageHeight: 40,
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".client-logo", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 text-black">
      <div className="max-w-6xl mx-auto text-center">
        <GSAPTextReveal stagger={0.05}>
          <h2 className="text-xl font-bold mb-4 bg-clip-text bg-gradient-to-b from-black to-gray-600">
            Trusted By Leading Brands
          </h2>
        </GSAPTextReveal>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Marquee speed={30} gap="2rem">
          {clients.map((client) => (
            <div
              key={client.name}
              className="client-logo flex items-center justify-center"
              style={{
                width: `${client.wrapperWidth}px`,
                height: `${client.wrapperHeight}px`,
              }}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.imageWidth}
                height={client.imageHeight}
                className="hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </Marquee>
      </motion.div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee var(--duration) linear infinite; }
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        .animate-marquee-vertical { animation: marquee-vertical var(--duration) linear infinite; }
      `}</style>
    </section>
  );
}
