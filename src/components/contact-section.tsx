"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ComponentPropsWithoutRef,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// -------------------------------------------------------------------
// Utility: Fungsi untuk menggabungkan className
export function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// -------------------------------------------------------------------
// Komponen Marquee (digunakan untuk klien & layanan)
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
  gap?: string;
}

function Marquee({
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
        className,
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
            )}
            style={{ animationDirection: reverse ? "reverse" : "normal" }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// -------------------------------------------------------------------
// Komponen CyclingVector: Berganti tiap 1 detik
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
        d="M58.34,0h-7.78v34.44L37.66,2.51l-7.21,2.91,13.24,32.76L18.7,13.2l-5.5,5.5,23.95,23.95L6.11,29.08l-3.11,7.13-32.83,14.35H0v7.78h35.83L3,72.68l3.11,7.13,31.03-13.56-23.95,23.95,5.5,5.5,24.98-24.98-13.24,32.76,7.21,2.91,12.9-31.93v34.44h7.78v-34.44l12.9,31.93,7.21-2.91-13.23-32.76,24.98,24.98,5.5-5.5-23.95-23.95,31.03,13.56,3.11-7.13-32.83-14.35h35.83v-7.78h-35.83l32.83-14.35-3.11-7.13-31.03,13.56,23.95-23.95-5.5-5.5-24.98,24.98,13.23-32.76-7.21-2.91-12.9,31.93V0Z"
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

// -------------------------------------------------------------------
// Komponen Utama: LandingSection
export default function LandingSection() {
  // Variabel untuk mengatur ukuran font heading
  const headingFontSize = "text-7xl";

  // Data logo klien
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

  // List layanan yang ditawarkan (dalam bahasa Inggris)
  const servicesOffered = [
    "Advertising",
    "Branding",
    "Logo Design",
    "Social Media Management",
    "Graphic Design",
    "Website Development",
    "Event Management",
    "Billboard Advertising",
    "Apparel Manufacturing",
    "Merchandise",
  ];

  // Ref & animasi GSAP untuk logo klien
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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

  // Button Biasa dengan efek hover (bisa diedit)
  function CustomCTAButton({
    onClick,
    children,
  }: {
    onClick?: () => void;
    children: React.ReactNode;
  }) {
    return (
      <button
        onClick={onClick}
        className="rounded-lg bg-white text-black px-6 py-3 font-semibold hover:px-10 hover:bg-[#ff4e00] hover:py-4 hover:text-white transition-all"
      >
        {children}
      </button>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16"
    >
      {/* Heading dengan vector di tengah */}
      <p className={`${headingFontSize} text-center font-bold`}>
        One trusted team{" "}
        <span className="inline-block align-middle mx-2">
          <CyclingVector />
        </span>
        <br />
        for all your needs
      </p>

      {/* Marquee untuk list layanan (arah dibalik: bergerak ke kanan) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mt-16"
      >
        <Marquee speed={30} gap="2rem" reverse={true}>
          {servicesOffered.map((service, idx) => (
            <span key={idx} className="text-2xl font-medium mx-4">
              {service}
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Marquee dengan logo klien (hitam-putih) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl"
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
                className="hover:opacity-100 transition-opacity filter grayscale"
              />
            </div>
          ))}
        </Marquee>
      </motion.div>

      {/* CTA Button */}
      <div className="my-8">
        <CustomCTAButton
          onClick={() =>
            window.open("https://wa.me/628895018725", "_blank", "noopener,noreferrer")
          }
        >
          Contact Us!
        </CustomCTAButton>
      </div>

      {/* Global Style untuk marquee, filter, dsb. */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical var(--duration) linear infinite;
        }
        .filter.grayscale {
          filter: grayscale(100%);
        }
      `}</style>
    </section>
  );
}