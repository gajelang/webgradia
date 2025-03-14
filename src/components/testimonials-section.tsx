"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/gradient-card";
import { Quote } from "lucide-react";
import { GSAPTextReveal } from "@/components/animations/gsap-text-reveal";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Prism Agency transformed our brand identity and helped us connect...",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechNova Solutions",
    },
    {
      quote:
        "Working with Prism has been a game-changer for our business...",
      author: "Michael Chen",
      position: "CEO",
      company: "Artisan Goods",
    },
    // ...dst
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".testimonial-card");
    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 50 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.8,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 px-6 bg-neutral-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GSAPTextReveal type="words" stagger={0.05}>
            <p className="text-5xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Client Testimonials
            </p>
          </GSAPTextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's what our clients say...
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientCard className="h-full">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Quote className="w-10 h-10 mb-4 text-white/30" />
                </motion.div>

                <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.position}
                  </p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </GradientCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}