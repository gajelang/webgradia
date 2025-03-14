"use client";

import Image from "next/image";

type Partner = {
  name: string;
  src: string;
  w?: number;
  h?: number;
};

const partners: Partner[] = [
  { name: "BCA", src: "/img/logo/bca.png", w: 100, h: 40 },
  { name: "BNI", src: "/img/logo/bni.png", w: 120, h: 60 },
  { name: "esse", src: "/img/logo/esse.png", w: 140, h: 60 },
  { name: "gojek", src: "/img/logo/gojek.png", w: 120, h: 50 },
  { name: "grab", src: "/img/logo/grab.png", w: 100, h: 40 },
  { name: "kfc", src: "/img/logo/kfc.png", w: 100, h: 50 },
  { name: "maybank", src: "/img/logo/maybank.png", w: 130, h: 60 },
  { name: "mnc", src: "/img/logo/mnc.png", w: 160, h: 80 },
  { name: "pssi", src: "/img/logo/pssi.png", w: 120, h: 60 },
  { name: "samsung", src: "/img/logo/samsung.png", w: 130, h: 40 },
  { name: "xl", src: "/img/logo/xl.png", w: 60, h: 40 },
  { name: "telkomsel", src: "/img/logo/telkomsel.png", w: 150, h: 40 },
  { name: "smartfren", src: "/img/logo/smartfren.png", w: 140, h: 40 },
];

export function OurPartnersSection() {
  return (
    <section className="bg-white text-black py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            OUR PARTNERS
          </h2>
          {/* Panah opsional */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden md:block"
          >
            <path d="M17 7 7 17" />
            <path d="M17 17H7V7" />
          </svg>
        </div>

        {/* Grid Logo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              // Card ala "glass effect" mendekati warna putih
              className={`
                group flex items-center justify-center p-4 rounded-lg
                border border-solid
                bg-white/30 backdrop-blur-sm
                transition
              `}
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.w ?? 120}
                height={partner.h ?? 60}
                className="object-contain grayscale group-hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
