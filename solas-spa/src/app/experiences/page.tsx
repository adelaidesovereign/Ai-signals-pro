"use client";

import Link from "next/link";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/AnimatedSection";

const experiences = [
  {
    category: "Mountain & Forest",
    items: [
      { name: "Sunrise Summit Hike", duration: "4 hours", price: "$125", desc: "Guided trek to a 5,200-foot summit for panoramic Blue Ridge views. Gourmet trail breakfast included. Moderate difficulty." },
      { name: "Hidden Waterfall Trek", duration: "3 hours", price: "$95", desc: "Discover three secluded waterfalls on our private trail system. Swim in natural pools during summer months." },
      { name: "Forest Bathing (Shinrin-yoku)", duration: "2 hours", price: "Complimentary", desc: "Guided sensory immersion through old-growth hemlock and rhododendron forest with a certified guide." },
      { name: "Night Forest Walk", duration: "90 min", price: "$75", desc: "Experience the forest after dark. Bioluminescent fungi, owl calls, and a sky full of stars." },
    ],
  },
  {
    category: "Culture & Arts",
    items: [
      { name: "River Arts District Tour", duration: "Half day", price: "$175", desc: "Private guided visit to Asheville's celebrated artist studios. Meet potters, painters, and glassblowers in their working spaces." },
      { name: "Biltmore Estate Visit", duration: "Full day", price: "$225", desc: "VIP access to America's largest home with private guide, including wine tasting at the estate winery." },
      { name: "Appalachian Music Evening", duration: "2 hours", price: "$85", desc: "Live bluegrass and old-time music in our barn venue, paired with local craft beverages and artisan cheese." },
      { name: "Pottery Workshop", duration: "3 hours", price: "$145", desc: "Hands-on wheel-throwing session with a master potter. Create your own piece to take home, fired and shipped." },
    ],
  },
  {
    category: "Adventure",
    items: [
      { name: "Blue Ridge Parkway Drive", duration: "Half day", price: "$195", desc: "Chauffeured tour along America's most scenic highway with curated stops. Gourmet picnic at an overlook." },
      { name: "Fly Fishing", duration: "Half day", price: "$275", desc: "Expert-guided fly fishing on private mountain streams stocked with native brook and rainbow trout." },
      { name: "Mountain Biking", duration: "3 hours", price: "$125", desc: "Guided rides on world-class Pisgah National Forest trails. Premium bikes provided. All skill levels." },
      { name: "Zipline Canopy Tour", duration: "2.5 hours", price: "$165", desc: "Soar through the forest canopy on eight ziplines spanning over a mile. Ages 10 and up." },
    ],
  },
  {
    category: "Wellness & Learning",
    items: [
      { name: "Stargazing", duration: "90 min", price: "$65", desc: "Evening astronomy from our mountaintop observatory deck with a professional astronomer and telescope." },
      { name: "Farm-to-Table Cooking Class", duration: "3 hours", price: "$195", desc: "Cook alongside Chef Chen using ingredients harvested from our kitchen garden minutes before class." },
      { name: "Herbalism Workshop", duration: "2 hours", price: "$115", desc: "Learn to identify, harvest, and prepare medicinal plants from the Appalachian tradition." },
      { name: "Watercolor in the Wild", duration: "3 hours", price: "$135", desc: "Plein air painting workshop in scenic locations on the estate. All materials provided. No experience needed." },
    ],
  },
];

const seasonal = [
  { season: "Spring", highlight: "Wildflower hikes through fields of trillium, flame azalea, and mountain laurel. Foraging workshops for ramps and morels." },
  { season: "Summer", highlight: "Waterfall swimming, outdoor concerts under the stars, firefly evenings, and tubing on the French Broad River." },
  { season: "Autumn", highlight: "Peak foliage drives, apple orchard visits, harvest dinners, and cider-making with local orchardists." },
  { season: "Winter", highlight: "Snowshoeing through silent forests, fireside storytelling, hot chocolate trails, and stargazing in crystalline skies." },
];

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #2d3a2e 0%, #3a4a35 30%, #1a2818 70%, #0d1210 100%)",
          }}
        />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Experiences
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-3xl">
              Beyond the Spa
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
              The Blue Ridge offers an endless canvas for discovery, adventure,
              and creative exploration.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Experiences by Category */}
      {experiences.map((section, sectionIndex) => (
        <section key={section.category} className={`py-20 md:py-28 ${sectionIndex % 2 === 1 ? "bg-cream-light" : ""}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <AnimatedSection>
              <div className="flex items-baseline gap-6 mb-12">
                <h2 className="font-display text-3xl md:text-4xl">{section.category}</h2>
                <div className="flex-1 h-px bg-forest/10 hidden md:block" />
              </div>
            </AnimatedSection>

            <StaggerChildren stagger={0.08} className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {section.items.map((item) => (
                <StaggerItem key={item.name}>
                  <div className="group py-6 border-b border-forest/8">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-display text-xl md:text-2xl group-hover:text-gold transition-colors duration-500">
                        {item.name}
                      </h3>
                      <span className="text-sm font-body tracking-wide whitespace-nowrap ml-4">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-stone text-sm leading-relaxed mb-2">
                      {item.desc}
                    </p>
                    <span className="text-gold/60 text-[11px] tracking-[0.15em] uppercase">
                      {item.duration}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      ))}

      {/* Seasons */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Year-Round Wonder
              </p>
              <h2 className="font-display text-cream text-4xl md:text-5xl leading-[1.1]">
                Every Season Tells a Story
              </h2>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonal.map((s) => (
              <StaggerItem key={s.season}>
                <div className="border border-cream/10 p-8 h-full group hover:border-gold/30 transition-colors duration-500">
                  <h3 className="font-display text-gold text-2xl mb-4">{s.season}</h3>
                  <p className="text-cream/40 text-sm leading-relaxed">{s.highlight}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-6 max-w-2xl mx-auto">
              Let us curate your perfect day
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-stone text-base leading-relaxed max-w-md mx-auto mb-10">
              Our concierge team will design a bespoke itinerary tailored to your
              interests and the season.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Link
              href="/contact"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Plan Your Experience
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
