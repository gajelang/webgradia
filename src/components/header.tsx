"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility function untuk menggabungkan classNames
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export function Header() {
  // Daftar item navigasi
  const navItems = [
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Portfolio", link: "#portfolio" },
    { name: "Testimonials", link: "#testimonials" },
  ];

  // State untuk menampilkan/menyembunyikan header
  const [showHeader, setShowHeader] = useState(true);
  // Simpan posisi scroll sebelumnya
  const [lastScrollY, setLastScrollY] = useState(0);

  // Fungsi untuk *smooth scroll* ke ID
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetID: string) => {
    e.preventDefault();
    const targetEl = document.querySelector(targetID);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY) {
        // Scroll ke bawah
        setShowHeader(false);
      } else {
        // Scroll ke atas
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    // Menggunakan hidden md:flex sehingga header disembunyikan pada mobile
    <div className="hidden md:flex">
      <AnimatePresence>
        {showHeader && (
          <motion.div
            key="header"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex max-w-fit fixed top-7 inset-x-0 mx-auto border border-transparent rounded-full bg-white",
              "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
              "z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4"
            )}
          >
            {navItems.map((navItem, idx) => (
              <a
                key={idx}
                href={navItem.link}
                onClick={(e) => handleSmoothScroll(e, navItem.link)}
                className="relative flex items-center space-x-1 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <span>{navItem.name}</span>
              </a>
            ))}

            {/* Tombol WhatsApp */}
            <motion.a
              href="https://wa.me/628895018725"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-md"
            >
              {/* WhatsApp Logo (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#fff" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/>
              </svg>
              <span className="text-sm font-medium">Contact Us</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}