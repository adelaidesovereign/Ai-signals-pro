"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
  LineReveal,
} from "@/components/AnimatedSection";
import { MagneticButton } from "@/components/MagneticButton";
import { images } from "@/lib/images";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const heroWords = ["Find", "Your", "Stillness"];

const spaHighlights = [
  {
    title: "Thermal Waters",
    description:
      "Natural mineral pools fed by ancient mountain springs, maintained at varying temperatures for a complete hydrotherapy journey.",
    image: images.hotSpring,
  },
  {
    title: "Forest Bathing",
    description:
      "Guided Shinrin-yoku through old-growth hemlock and rhododendron, where the canopy filters light into healing warmth.",
    image: images.forestSunrays,
  },
  {
    title: "Stone & Sage",
    description:
      "Our signature treatment combines heated Appalachian river stones with wild mountain sage oil in a 90-minute ritual.",
    image: images.spaStones,
  },
];

const diningFeatures = [
  { label: "Farm-to-Table", detail: "90% sourced within 50 miles" },
  { label: "Wine Cellar", detail: "1,200 selections, 14 countries" },
  { label: "Private Dining", detail: "Creekside and mountaintop settings" },
  { label: "Kitchen Garden", detail: "2-acre organic estate garden" },
];

const accommodationTypes = [
  {
    name: "Mountain Suite",
    size: "850 sq ft",
    detail: "Panoramic valley views, private terrace, soaking tub",
    image: images.hotelSuite,
  },
  {
    name: "Canopy Treehouse",
    size: "620 sq ft",
    detail: "Suspended among century-old oaks, glass floor panels",
    image: images.treehouse,
  },
  {
    name: "Creekside Cottage",
    size: "1,100 sq ft",
    detail: "Private hot spring pool, outdoor rain shower, firepit",
    image: images.cabin,
  },
];

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={images.hero}
          alt="Blue Ridge Mountains at sunset"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest/50" />
      </motion.div>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-0 atmosphere-mist" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 40%, rgba(184,134,11,0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 60%, rgba(184,134,11,0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 30% 40%, rgba(184,134,11,0.06) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6" style={{ opacity, y }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeExpo }}
          className="overline text-gold mb-8"
        >
          Blue Ridge Mountains &middot; Asheville, NC
        </motion.p>

        <h1 className="font-display text-cream mb-8">
          {heroWords.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mx-2 md:mx-4">
              <motion.span
                className="inline-block text-6xl md:text-8xl lg:text-[140px] xl:text-[160px] leading-[0.9] tracking-[-0.03em]"
                initial={{ y: "120%", rotateX: 40 }}
                animate={{ y: "0%", rotateX: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5 + i * 0.12,
                  ease: easeExpo,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: easeExpo }}
          className="text-cream/60 text-base md:text-lg max-w-lg mx-auto mb-12 font-body leading-relaxed"
        >
          A sanctuary where the ancient mountains hold space
          for your renewal
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: easeExpo }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton as="a" href="/contact" strength={0.2}>
            <span className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500">
              Reserve Your Stay
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="/spa" strength={0.2}>
            <span className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-cream/25 text-cream btn-fill-light transition-all duration-500">
              Explore Wellness
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-cream/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Intro Statement */}
      <section className="py-24 md:py-36 lg:py-44 relative">
        <div className="absolute inset-0 atmosphere-glow" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <p className="overline mb-8">Est. 2019</p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.15] mb-8 tracking-[-0.01em]">
                Where the Appalachian mist meets
                <span className="text-gold italic"> timeless luxury</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="text-stone text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Solas was born from a simple belief: that true wellness emerges when
                we honor both the grandeur of nature and the art of gracious
                hospitality. Set on 200 acres of protected Blue Ridge forest, every
                detail has been considered to create a place where time moves at the
                pace of the mountains.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.45}>
              <div className="divider-gold max-w-32 mx-auto mt-12" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Spa & Wellness Preview */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 mb-20">
            <AnimatedSection className="lg:w-1/3 lg:sticky lg:top-32" direction="left">
              <p className="overline mb-4">Spa & Wellness</p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6 tracking-[-0.01em]">
                Rituals of
                <br />
                Restoration
              </h2>
              <p className="text-stone text-base leading-relaxed mb-8">
                Our 30,000-square-foot spa draws from Appalachian healing traditions
                and global wellness practices. Every treatment is a journey guided by
                the rhythms of the mountain seasons.
              </p>
              <Link
                href="/spa"
                className="link-reveal inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 group"
              >
                <span>Explore Treatments</span>
                <span className="inline-block w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
              </Link>
            </AnimatedSection>

            <div className="lg:w-2/3 grid gap-8">
              <StaggerChildren stagger={0.15}>
                {spaHighlights.map((item) => (
                  <StaggerItem key={item.title}>
                    <Link href="/spa" className="group block">
                      <div className="relative aspect-[16/9] md:aspect-[21/9] mb-6 img-zoom overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-end p-8 md:p-12 z-20">
                          <h3 className="font-display text-2xl md:text-3xl text-cream group-hover:text-gold transition-colors duration-500">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-stone text-sm md:text-base leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width atmospheric break */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={images.forestMist}
          alt="Misty forest in the Blue Ridge Mountains"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest/60" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span className="font-display text-cream text-[40vw] leading-none select-none">
            S
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center relative z-10">
          <AnimatedSection>
            <blockquote className="text-center px-6">
              <p className="font-display text-cream text-3xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl leading-[1.15] italic tracking-[-0.02em]">
                &ldquo;The mountains are calling and I must go&rdquo;
              </p>
              <div className="divider-gold max-w-16 mx-auto mt-8 mb-6" />
              <cite className="block text-cream/40 text-sm not-italic tracking-[0.15em] uppercase">
                John Muir
              </cite>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Dining Preview */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection direction="left" className="relative">
              <div className="relative aspect-[4/5] img-zoom overflow-hidden">
                <Image
                  src={images.fineDining}
                  alt="Fine dining at Rootwood restaurant"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-forest/20" />
              </div>
              <AnimatedSection delay={0.3} className="absolute -bottom-8 -right-4 md:-right-8 bg-cream p-6 md:p-8 shadow-2xl max-w-[240px] z-20">
                <span className="overline text-[10px] block mb-2">Award-Winning</span>
                <span className="font-display text-lg leading-tight">
                  Forbes Five-Star Dining 2024
                </span>
              </AnimatedSection>
            </AnimatedSection>

            <div>
              <AnimatedSection>
                <p className="overline mb-4">Dining</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 tracking-[-0.01em]">
                  From Mountain
                  <br />
                  to Table
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <p className="text-stone text-base leading-relaxed mb-10 max-w-md">
                  Executive Chef Margaux Chen transforms the bounty of western North
                  Carolina into an evolving menu that honors Appalachian foodways
                  through a modern lens. Our two-acre kitchen garden and
                  relationships with over forty local farms ensure every plate tells
                  the story of this land.
                </p>
              </AnimatedSection>

              <StaggerChildren stagger={0.1}>
                <div className="space-y-0">
                  {diningFeatures.map((item) => (
                    <StaggerItem key={item.label}>
                      <div className="py-5 border-b border-forest/10 flex justify-between items-baseline group hover:border-gold/30 transition-colors duration-500">
                        <span className="text-sm tracking-[0.05em] group-hover:text-gold transition-colors duration-500">
                          {item.label}
                        </span>
                        <span className="text-stone text-sm">{item.detail}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerChildren>

              <AnimatedSection delay={0.5} className="mt-10">
                <Link
                  href="/dining"
                  className="link-reveal inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 group"
                >
                  <span>View Menus & Hours</span>
                  <span className="inline-block w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Preview */}
      <section className="py-24 md:py-36 bg-forest relative noise-overlay">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <AnimatedSection>
              <p className="overline mb-4">Accommodations</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="font-display text-cream text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 tracking-[-0.01em]">
                Rest Among the Canopy
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-cream/50 text-base leading-relaxed max-w-xl mx-auto">
                Forty-two rooms and residences, each designed to frame the landscape
                as living art. Natural materials, handcrafted furnishings, and
                floor-to-ceiling glass blur the boundary between shelter and sky.
              </p>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.12} className="grid md:grid-cols-3 gap-6 md:gap-8">
            {accommodationTypes.map((room) => (
              <StaggerItem key={room.name}>
                <Link href="/accommodations" className="group block card-lift">
                  <div className="relative aspect-[3/4] mb-6 img-zoom overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                      <span className="text-cream/30 text-[11px] tracking-[0.2em] uppercase mb-2">
                        {room.size}
                      </span>
                      <h3 className="font-display text-cream text-2xl group-hover:text-gold transition-colors duration-500">
                        {room.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-cream/40 text-sm leading-relaxed">
                    {room.detail}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <AnimatedSection delay={0.4} className="text-center mt-16">
            <MagneticButton as="a" href="/accommodations" strength={0.15}>
              <span className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-cream/20 text-cream btn-fill-light transition-all duration-500">
                View All Accommodations
              </span>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Experiences Preview */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl mb-16">
            <AnimatedSection>
              <p className="overline mb-4">Experiences</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 tracking-[-0.01em]">
                Beyond the Spa
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-stone text-base leading-relaxed">
                The Blue Ridge offers an endless canvas for discovery. From guided
                sunrise hikes along the Appalachian Trail to private waterfall
                meditation and artisan studio visits in the River Arts District.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Mountain Trails", desc: "Guided hikes through old-growth forest to hidden waterfalls and panoramic overlooks", image: images.hiking },
              { title: "River Arts", desc: "Private studio visits with Asheville\u2019s celebrated artisan community", image: images.pottery },
              { title: "Blue Ridge Parkway", desc: "Curated drives along America\u2019s most scenic highway with gourmet picnic service", image: images.blueRidge },
              { title: "Stargazing", desc: "Evening astronomy sessions from our mountaintop observatory deck", image: images.stargazing },
            ].map((exp, i) => (
              <AnimatedSection key={exp.title} delay={i * 0.1}>
                <Link href="/experiences" className="group block card-lift overflow-hidden bg-cream-light">
                  <div className="relative aspect-[4/3] img-zoom overflow-hidden">
                    <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                    <div className="absolute inset-0 bg-forest/20 group-hover:bg-forest/10 transition-colors duration-500" />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="text-gold text-[11px] tracking-[0.2em] uppercase">0{i + 1}</span>
                    <h3 className="font-display text-xl md:text-2xl mt-3 mb-3 group-hover:text-gold transition-colors duration-500">
                      {exp.title}
                    </h3>
                    <p className="text-stone text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <LineReveal className="mt-16" />

          <AnimatedSection delay={0.2} className="mt-10">
            <Link
              href="/experiences"
              className="link-reveal inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 group"
            >
              <span>All Experiences</span>
              <span className="inline-block w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 md:py-20 border-t border-forest/8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection>
            <p className="overline text-center mb-10 text-stone/50">As Featured In</p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-30">
              {["Forbes Travel Guide", "Cond\u00e9 Nast Traveler", "Travel + Leisure", "Robb Report", "Departures"].map((pub) => (
                <span key={pub} className="text-[13px] tracking-[0.15em] uppercase text-forest whitespace-nowrap hover:opacity-100 transition-opacity duration-500">
                  {pub}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
