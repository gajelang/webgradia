"use client";

import { GradientCard } from "@/components/ui/gradient-card";
import { GSAPTextReveal } from "@/components/animations/gsap-text-reveal";
import { motion } from "framer-motion";
import { StaggerChildren } from "@/components/animations/stagger-children";
import { Magnetic } from "@/components/animations/magnetic";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PortfolioSection() {
  const projects = [
    {
      title: "Eco-Friendly Product Launch",
      client: "GreenTech Industries",
      category: "Integrated Campaign",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Fashion Brand Relaunch",
      client: "Elegance Apparel",
      category: "Brand Identity",
      image: "/placeholder.svg?height=400&width=600",
    },
    // ... tambahkan project lain
  ];

  return (
    <section
      id="portfolio"
      // Atur jarak untuk mobile (py-16, px-4), lalu lebih besar di md
      className="bg-white text-black py-16 px-4 md:py-24 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <GSAPTextReveal type="words" stagger={0.05}>
            <p className="text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-600">
              Our Work
            </p>
          </GSAPTextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-700 max-w-2xl mx-auto mb-8 text-sm md:text-base"
          >
            Browse through our portfolio of award-winning campaigns and projects.
          </motion.p>
        </div>

        {/* StaggerChildren agar animasi item beruntun */}
        <StaggerChildren
          staggerDelay={0.1}
          // Grid responsif: 1 kolom di mobile, 2 kolom di sm, 3 kolom di lg
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientCard className="h-full">
                <div className="group relative overflow-hidden rounded-xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent flex flex-col justify-end p-4 md:p-6">
                    <span className="text-xs md:text-sm text-white/70">
                      {project.category}
                    </span>
                    <h3 className="text-base md:text-xl font-semibold mb-1 text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 mb-4">
                      Client: {project.client}
                    </p>
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </StaggerChildren>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <Magnetic>
            <Button
              variant="outline"
              className="border-gray-200 bg-gray-100 hover:bg-gray-200 text-sm md:text-base"
            >
              View All Projects
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}