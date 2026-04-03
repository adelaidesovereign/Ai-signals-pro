"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
  LineReveal,
} from "@/components/AnimatedSection";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const heroWords = ["Find", "Your", "Stillness"];

const spaHighlights = [
  {
    title: "Thermal Waters",
    description:
      "Natural mineral pools fed by ancient mountain springs, maintained at varying temperatures for a complete hydrotherapy journey.",
    image: "linear-gradient(145deg, #2d3a2e 0%, #1a1f16 60%, #0d1210 100%)",
  },
  {
    title: "Forest Bathing",
    description:
      "Guided Shinrin-yoku through old-growth hemlock and rhododendron, where the canopy filters light into healing warmth.",
    image: "linear-gradient(145deg, #3a4a35 0%, #2d3a2e 60%, #1a1f16 100%)",
  },
  {
    title: "Stone & Sage",
    description:
      "Our signature treatment combines heated Appalachian river stones with wild mountain sage oil in a 90-minute ritual.",
    image: "linear-gradient(145deg, #4a3a2e 0%, #2d2a1e 60%, #1a1816 100%)",
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
    gradient: "linear-gradient(135deg, #2d3a2e 0%, #1a2318 100%)",
  },
  {
    name: "Canopy Treehouse",
    size: "620 sq ft",
    detail: "Suspended among century-old oaks, glass floor panels",
    gradient: "linear-gradient(135deg, #3a3a2e 0%, #252518 100%)",
  },
  {
    name: "Creekside Cottage",
    size: "1,100 sq ft",
    detail: "Private hot spring pool, outdoor rain shower, firepit",
    gradient: "linear-gradient(135deg, #2e3a3a 0%, #182525 100%)",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #1a1f16 0%, #2d3a2e 30%, #1a2818 60%, #0d1210 100%)",
          }}
        />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="absolute inset-0 atmosphere-warm" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,14,8,0.6) 0%, transparent 100%)",
          }}
        />
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-auto opacity-20"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,140 Q120,80 240,120 Q360,40 480,90 Q600,20 720,70 Q840,30 960,80 Q1080,50 1200,100 Q1320,60 1440,110 L1440,200 Z"
            fill="#0a0e08"
          />
        </svg>

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeExpo }}
            className="text-[11px] tracking-[0.4em] uppercase text-gold mb-8"
          >
            Blue Ridge Mountains &middot; Asheville, NC
          </motion.p>

          <h1 className="font-display text-cream mb-8">
            {heroWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mx-2 md:mx-4">
                <motion.span
                  className="inline-block text-6xl md:text-8xl lg:text-[140px] xl:text-[160px] leading-[0.9] tracking-[-0.02em]"
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1,
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
            className="text-cream/50 text-base md:text-lg max-w-lg mx-auto mb-12 font-body leading-relaxed"
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
            <Link
              href="/contact"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Reserve Your Stay
            </Link>
            <Link
              href="/spa"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-cream/25 text-cream hover:bg-cream/10 transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Explore Wellness
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-cream/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* Intro Statement */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">
                Est. 2019
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] mb-8">
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
          </div>
        </div>
      </section>

      {/* Spa & Wellness Preview */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 mb-20">
            <AnimatedSection className="lg:w-1/3 lg:sticky lg:top-32" direction="left">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Spa & Wellness
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">
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
                className="inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 group"
              >
                <span>Explore Treatments</span>
                <span className="inline-block w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
              </Link>
            </AnimatedSection>

            <div className="lg:w-2/3 grid gap-8">
              <StaggerChildren stagger={0.15}>
                {spaHighlights.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="group">
                      <div
                        className="aspect-[16/9] md:aspect-[21/9] mb-6 overflow-hidden"
                        style={{ background: item.image }}
                      >
                        <div className="w-full h-full flex items-end p-8 md:p-12 bg-gradient-to-t from-black/40 to-transparent">
                          <h3 className="font-display text-2xl md:text-3xl text-cream group-hover:text-gold transition-colors duration-500">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-stone text-sm md:text-base leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width atmospheric break */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #2d3a2e 0%, #1a2818 40%, #1a1f16 100%)",
          }}
        />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedSection>
            <blockquote className="text-center px-6">
              <p className="font-display text-cream text-3xl md:text-5xl lg:text-6xl max-w-3xl leading-[1.2] italic">
                &ldquo;The mountains are calling and I must go&rdquo;
              </p>
              <cite className="block text-cream/40 text-sm mt-6 not-italic tracking-[0.15em] uppercase">
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
            <AnimatedSection direction="left">
              <div
                className="aspect-[4/5] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #3a2e20 0%, #2d2418 40%, #1a1610 100%)",
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center atmosphere-warm p-12">
                  <span className="font-display text-cream/20 text-[120px] md:text-[180px] leading-none">
                    R
                  </span>
                  <span className="text-cream/30 text-[11px] tracking-[0.3em] uppercase mt-4">
                    Rootwood Restaurant
                  </span>
                </div>
              </div>
            </AnimatedSection>

            <div>
              <AnimatedSection>
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                  Dining
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
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
                      <div className="py-5 border-b border-forest/10 flex justify-between items-baseline">
                        <span className="text-sm tracking-[0.05em]">
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
                  className="inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 group"
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
      <section className="py-24 md:py-36 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16 md:mb-20">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Accommodations
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="font-display text-cream text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
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
                <Link href="/accommodations" className="group block">
                  <div
                    className="aspect-[3/4] mb-6 overflow-hidden transition-transform duration-700 group-hover:scale-[0.98]"
                    style={{
                      background: room.gradient,
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div className="w-full h-full flex flex-col justify-end p-8 bg-gradient-to-t from-black/50 via-transparent to-transparent">
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
            <Link
              href="/accommodations"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-cream/20 text-cream hover:bg-cream hover:text-forest transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              View All Accommodations
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Experiences Preview */}
      <section className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Experiences
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-forest/10">
            {[
              {
                title: "Mountain Trails",
                desc: "Guided hikes through old-growth forest to hidden waterfalls and panoramic overlooks",
              },
              {
                title: "River Arts",
                desc: "Private studio visits with Asheville's celebrated artisan community",
              },
              {
                title: "Blue Ridge Parkway",
                desc: "Curated drives along America's most scenic highway with gourmet picnic service",
              },
              {
                title: "Stargazing",
                desc: "Evening astronomy sessions from our mountaintop observatory deck",
              },
            ].map((exp, i) => (
              <AnimatedSection key={exp.title} delay={i * 0.1}>
                <div className="bg-cream p-8 md:p-10 h-full group hover:bg-cream-light transition-colors duration-500">
                  <span className="text-gold text-[11px] tracking-[0.2em] uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl mt-4 mb-4 group-hover:text-gold transition-colors duration-500">
                    {exp.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <LineReveal className="mt-16" />

          <AnimatedSection delay={0.2} className="mt-10">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 group"
            >
              <span>All Experiences</span>
              <span className="inline-block w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Awards / Recognition */}
      <section className="py-16 md:py-20 border-t border-forest/8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40">
              {[
                "Forbes Travel Guide",
                "Cond\u00e9 Nast Traveler",
                "Travel + Leisure",
                "Robb Report",
                "Departures",
              ].map((pub) => (
                <span
                  key={pub}
                  className="text-[13px] tracking-[0.15em] uppercase text-forest whitespace-nowrap"
                >
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
