"use client";

import Link from "next/link";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
  LineReveal,
} from "@/components/AnimatedSection";

const treatments = [
  {
    category: "Signature Rituals",
    items: [
      { name: "Blue Ridge Renewal", duration: "120 min", price: "$425", desc: "A full-body journey combining warm Appalachian river stones, wild sage oil, and a mountain herb wrap. Our most beloved ritual." },
      { name: "Solas Ceremony", duration: "150 min", price: "$575", desc: "The ultimate immersion: dry brushing, thermal waters circuit, custom massage, and a botanical facial using foraged ingredients." },
      { name: "Forest Floor", duration: "90 min", price: "$325", desc: "Grounding treatment inspired by the forest ecosystem: mushroom extract body mask, pine needle exfoliation, and moss-infused moisture." },
    ],
  },
  {
    category: "Massage",
    items: [
      { name: "Mountain Deep Tissue", duration: "60 / 90 min", price: "$225 / $295", desc: "Targeted deep pressure using heated basalt stones and arnica-infused oil to release chronic tension." },
      { name: "Appalachian Hot Stone", duration: "90 min", price: "$310", desc: "Smooth river stones heated to precise temperatures, placed along energy meridians and used in flowing massage strokes." },
      { name: "Couples Creekside", duration: "90 min", price: "$550", desc: "Side-by-side massage in our open-air creekside pavilion, surrounded by the sounds of rushing water and birdsong." },
      { name: "Prenatal Nurture", duration: "60 min", price: "$215", desc: "Gentle, supportive bodywork designed for expectant mothers, using organic shea and lavender." },
    ],
  },
  {
    category: "Skin & Beauty",
    items: [
      { name: "Wildflower Facial", duration: "75 min", price: "$275", desc: "Custom facial using botanicals harvested from our estate meadow. Includes lymphatic drainage and LED light therapy." },
      { name: "Gentleman's Revival", duration: "60 min", price: "$235", desc: "Deep-cleansing facial with charcoal and white clay, followed by a scalp massage and hand treatment." },
      { name: "Mountain Glow Peel", duration: "45 min", price: "$195", desc: "Professional-grade enzyme peel with Appalachian sourwood honey and alpha hydroxy acids for radiant skin." },
    ],
  },
  {
    category: "Hydrotherapy",
    items: [
      { name: "Thermal Waters Circuit", duration: "90 min", price: "$145", desc: "Self-guided journey through our six mineral pools, ranging from 68 to 104 degrees, with cold plunge and steam room." },
      { name: "Vichy Rain Ritual", duration: "60 min", price: "$265", desc: "Seven overhead rain jets deliver a warm cascade while a therapist performs a full-body exfoliation and massage." },
      { name: "Private Onsen", duration: "60 min", price: "$195 per couple", desc: "Reserve a private outdoor soaking tub nestled among rhododendron, with herbal tea service and mountain views." },
    ],
  },
];

const wellnessPrograms = [
  { name: "Forest Bathing (Shinrin-yoku)", schedule: "Daily, 7:00 AM", desc: "Guided sensory walk through old-growth hemlock forest" },
  { name: "Mountain Sunrise Yoga", schedule: "Daily, 6:30 AM", desc: "Vinyasa flow on the observation deck overlooking the valley" },
  { name: "Sound Healing", schedule: "Wed & Sat, 4:00 PM", desc: "Crystal singing bowls and gong meditation in the underground grotto" },
  { name: "Breathwork & Cold Exposure", schedule: "Tue & Fri, 8:00 AM", desc: "Guided Wim Hof-inspired session with natural cold plunge" },
  { name: "Meditation Garden", schedule: "Open daily", desc: "Seven themed garden rooms for self-guided contemplation" },
  { name: "Wellness Consultation", schedule: "By appointment", desc: "60-minute session with our integrative wellness director" },
];

export default function SpaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #2d3a2e 0%, #1a2818 50%, #0d1210 100%)",
          }}
        />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Spa & Wellness
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-3xl">
              Rituals of Restoration
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
              30,000 square feet of sanctuary drawing from Appalachian healing
              traditions, Eastern philosophy, and modern wellness science.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.2] mb-6">
                Every treatment begins with intention and ends with
                <span className="text-gold italic"> transformation</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-stone text-base leading-relaxed">
                Our therapists are trained in both ancient healing arts and
                contemporary techniques. Before each session, they consult with you
                to understand your needs, crafting a bespoke experience that honors
                where you are today. All products are made in-house using botanicals
                from our estate gardens and surrounding forests.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Treatment Menu */}
      {treatments.map((section, sectionIndex) => (
        <section key={section.category} className={`py-16 md:py-24 ${sectionIndex % 2 === 1 ? "bg-cream-light" : ""}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <AnimatedSection>
              <div className="flex items-baseline gap-6 mb-12">
                <h2 className="font-display text-3xl md:text-4xl">{section.category}</h2>
                <div className="flex-1 h-px bg-forest/10 hidden md:block" />
              </div>
            </AnimatedSection>

            <StaggerChildren stagger={0.08}>
              <div className="space-y-0">
                {section.items.map((item) => (
                  <StaggerItem key={item.name}>
                    <div className="group py-8 border-b border-forest/8 grid md:grid-cols-[1fr_auto_auto] gap-4 md:gap-12 items-start">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-gold transition-colors duration-500">
                          {item.name}
                        </h3>
                        <p className="text-stone text-sm leading-relaxed max-w-lg">
                          {item.desc}
                        </p>
                      </div>
                      <span className="text-stone text-sm whitespace-nowrap">{item.duration}</span>
                      <span className="text-sm font-body tracking-wide whitespace-nowrap">{item.price}</span>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </section>
      ))}

      {/* Wellness Programs */}
      <section className="py-24 md:py-36 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Wellness Programs
              </p>
              <h2 className="font-display text-cream text-4xl md:text-5xl leading-[1.1] mb-6">
                Daily Rituals & Practices
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-cream/50 text-base leading-relaxed max-w-xl">
                Complimentary for all spa guests. Our daily programming is designed to
                deepen your connection to self, nature, and stillness.
              </p>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.08} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessPrograms.map((program) => (
              <StaggerItem key={program.name}>
                <div className="border border-cream/10 p-8 hover:border-gold/30 transition-colors duration-500 group">
                  <h3 className="font-display text-cream text-xl mb-2 group-hover:text-gold transition-colors duration-500">
                    {program.name}
                  </h3>
                  <p className="text-gold/70 text-[12px] tracking-[0.1em] uppercase mb-4">
                    {program.schedule}
                  </p>
                  <p className="text-cream/40 text-sm leading-relaxed">{program.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-6 max-w-2xl mx-auto">
              Ready to begin your restoration?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-stone text-base leading-relaxed max-w-md mx-auto mb-10">
              Our wellness concierge will help curate a personalized spa journey based
              on your intentions and preferences.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Link
              href="/contact"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Book a Treatment
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
