"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/spa", label: "Spa & Wellness" },
  { href: "/dining", label: "Dining" },
  { href: "/accommodations", label: "Accommodations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Reservations" },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_rgba(26,31,22,0.08)]"
            : "bg-transparent"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 group"
            >
              <span className="font-display text-2xl md:text-3xl tracking-[0.02em] text-forest">
                Solas
              </span>
              <span className="block text-[9px] tracking-[0.35em] uppercase text-stone font-body mt-[-4px]">
                Blue Ridge Sanctuary
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] tracking-[0.12em] uppercase font-body transition-colors duration-500 hover:text-gold ${
                    pathname === link.href ? "text-gold" : "text-forest/70"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.5, ease: easeExpo }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Book Now - Desktop */}
            <Link
              href="/contact"
              className="hidden lg:block text-[12px] tracking-[0.15em] uppercase font-body px-7 py-3 border border-forest/20 hover:bg-forest hover:text-cream transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Book Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 flex flex-col gap-[6px]">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: easeExpo }}
                  className={`block h-px w-full origin-center ${isOpen ? "bg-cream" : "bg-forest"}`}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: easeExpo }}
                  className={`block h-px w-full ${isOpen ? "bg-cream" : "bg-forest"}`}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: easeExpo }}
                  className={`block h-px w-full origin-center ${isOpen ? "bg-cream" : "bg-forest"}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeExpo }}
            className="fixed inset-0 z-40 bg-forest flex items-center justify-center"
          >
            <nav className="text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: easeExpo,
                  }}
                >
                  <Link
                    href={link.href}
                    className={`block font-display text-4xl md:text-5xl py-3 transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-gold"
                        : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: easeExpo }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-cream/30 text-cream hover:bg-cream hover:text-forest transition-all duration-500"
                >
                  Reserve Your Stay
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
