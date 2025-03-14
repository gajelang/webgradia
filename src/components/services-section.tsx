"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom hook untuk mendeteksi lebar layar
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

// Fungsi bantu untuk menambahkan border (desktop)
function getBorderClasses(
  i: number,
  length: number,
  isActive: boolean,
  isHover: boolean
) {
  // Border default: neutral-700, berubah menjadi orange-500 saat hover/active
  const leftColor =
    isActive || isHover ? "border-l-orange-500" : "border-l-neutral-700";
  const rightColor =
    isActive || isHover ? "border-r-orange-500" : "border-r-neutral-700";

  let classes = "";
  if (i > 0) {
    classes += `border-l ${leftColor} `;
  }
  if (i < length - 1) {
    classes += `border-r ${rightColor} `;
  }
  return classes.trim();
}

// Versi Desktop: Accordion horizontal
function ServicesSectionDesktop() {
  // State untuk panel aktif dan hover
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const services = [
    {
      id: 1,
      stepNumber: "01",
      title: "Advertising & Branding",
      content: `
• Brand Identity (Logo, Visual Branding)
• Graphic Design
• Media Placement (Billboards, Banners, Neon Signs, Rontek)
• Offset & Digital Printing
• Lettering & 3D Signage
      `,
    },
    {
      id: 2,
      stepNumber: "02",
      title: "Merchandise Production",
      content: `
• Tumblers
• Mugs
• Umbrellas
• Pins
• Agendas
• Keychains
• Plush Toys
• Lanyards & ID Cards
• Ballpoints
• Calendars
      `,
    },
    {
      id: 3,
      stepNumber: "03",
      title: "Apparel & Convection",
      content: `
• Polo Shirts
• T-Shirts
• Hoodies & Jackets
• Jerseys (Basketball, Futsal, Cycling)
• Uniforms & Office Wear
• Caps
      `,
    },
    {
      id: 4,
      stepNumber: "04",
      title: "Construction & Interior",
      content: `
• Billboard & Signage Installation
• Building & Interior Design
• Electrical & Gas Installation
• Interior & Exterior Contracting
• Architecture & Planning
      `,
    },
    {
      id: 5,
      stepNumber: "05",
      title: "Digital Marketing",
      content: `
• Social Media Management
• Content Strategy & Planning
• Social Media Ads (Facebook, Instagram, TikTok Ads)
• Influencer & KOL Management
      `,
    },
    {
      id: 6,
      stepNumber: "06",
      title: "Web Development",
      content: `
• Website Development
• Landing Pages
• Company Profile Websites
• E-commerce Websites
• SEO Optimization
      `,
    },
    {
      id: 7,
      stepNumber: "07",
      title: "Event Activation",
      content: `
• Event Planning & Execution
• Exhibition & Roadshow Setup
• Promotional Booth & Activation
      `,
    },
  ];

  return (
    <div className="hidden md:block bg-neutral-900 text-white pt-5 pb-16" id="services">
      {/* Heading di tengah */}
      <div className="text-center mb-8">
        <p className="text-9xl font-bold my-10">Our Services</p>
      </div>

      {/* Container flex untuk accordion */}
      <div className="max-w-screen-xl mx-auto flex">
        {services.map((svc, i) => {
          const isActive = i === activeIndex;
          const isHover = i === hoverIndex;
          const borderClasses = getBorderClasses(i, services.length, isActive, isHover);

          return (
            <motion.div
              key={svc.id}
              animate={{ flex: isActive ? 2 : 1 }}
              transition={{ duration: 0.4 }}
              className={`
                relative flex flex-col justify-between h-[600px] w-full cursor-pointer
                ${isActive ? "bg-orange-500 text-black" : "bg-neutral-900 text-white"}
                ${borderClasses}
              `}
              style={{ minWidth: 0 }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(-1)}
              onClick={() => setActiveIndex(isActive ? -1 : i)}
            >
              <div className="p-6 space-y-4 whitespace-normal break-words">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold opacity-70">
                    {svc.stepNumber}
                  </span>
                  {/* Tombol +/× */}
                  <button
                    className={`bg-neutral-800 rounded-full w-6 h-6 flex items-center justify-center text-xs 
                      transition ${isActive ? "text-black" : "text-neutral-400 hover:text-white"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(isActive ? -1 : i);
                    }}
                  >
                    {isActive ? "×" : "＋"}
                  </button>
                </div>
                <h3 className="text-2xl font-bold">{svc.title}</h3>
                {isActive && (
                  <div>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {svc.content}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4">
                {isActive && (
                  <a
                    href="https://wa.me/628895018725"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 rounded text-center font-semibold bg-black text-white hover:bg-black/80"
                  >
                    Contact Us
                  </a>
                )}
                {!isActive && (
                  <div className="text-sm text-neutral-400 text-center">
                    click to expand
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Versi Mobile: Layout vertikal
function ServicesSectionMobile() {
  const services = [
    {
      id: 1,
      stepNumber: "01",
      title: "Advertising & Branding",
      content: `
• Brand Identity (Logo, Visual Branding)
• Graphic Design
• Media Placement (Billboards, Banners, Neon Signs, Rontek)
• Offset & Digital Printing
• Lettering & 3D Signage
      `,
    },
    {
      id: 2,
      stepNumber: "02",
      title: "Merchandise Production",
      content: `
• Tumblers
• Mugs
• Umbrellas
• Pins
• Agendas
• Keychains
• Plush Toys
• Lanyards & ID Cards
• Ballpoints
• Calendars
      `,
    },
    {
      id: 3,
      stepNumber: "03",
      title: "Apparel & Convection",
      content: `
• Polo Shirts
• T-Shirts
• Hoodies & Jackets
• Jerseys (Basketball, Futsal, Cycling)
• Uniforms & Office Wear
• Caps
      `,
    },
    {
      id: 4,
      stepNumber: "04",
      title: "Construction & Interior",
      content: `
• Billboard & Signage Installation
• Building & Interior Design
• Electrical & Gas Installation
• Interior & Exterior Contracting
• Architecture & Planning
      `,
    },
    {
      id: 5,
      stepNumber: "05",
      title: "Digital Marketing",
      content: `
• Social Media Management
• Content Strategy & Planning
• Social Media Ads (Facebook, Instagram, TikTok Ads)
• Influencer & KOL Management
      `,
    },
    {
      id: 6,
      stepNumber: "06",
      title: "Web Development",
      content: `
• Website Development
• Landing Pages
• Company Profile Websites
• E-commerce Websites
• SEO Optimization
      `,
    },
    {
      id: 7,
      stepNumber: "07",
      title: "Event Activation",
      content: `
• Event Planning & Execution
• Exhibition & Roadshow Setup
• Promotional Booth & Activation
      `,
    },
  ];

  return (
    <div className="block md:hidden bg-black text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        {services.map((svc) => (
          <div key={svc.id} className="mb-6 border-b border-gray-700 pb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold opacity-70">{svc.stepNumber}</span>
                <h3 className="text-2xl font-bold">{svc.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed whitespace-pre-line">
                {svc.content}
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/628895018725"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 rounded text-center font-semibold bg-white text-black hover:bg-gray-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Komponen utama: menggabungkan versi desktop dan mobile
export default function ServicesSection() {
  return (
    <>
      <ServicesSectionDesktop />
      <ServicesSectionMobile />
    </>
  );
}
