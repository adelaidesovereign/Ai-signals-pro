"use client";

import Link from "next/link";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
  LineReveal,
} from "@/components/AnimatedSection";

const venues = [
  {
    name: "Rootwood",
    subtitle: "Fine Dining",
    hours: "Wednesday - Sunday, 6:00 PM - 10:00 PM",
    dress: "Resort Elegant",
    description:
      "Our flagship restaurant, where Executive Chef Margaux Chen presents a nightly tasting menu that evolves with the seasons. Each course tells the story of western North Carolina's terroir through technique honed in kitchens from Copenhagen to Kyoto. The 40-seat dining room features floor-to-ceiling windows overlooking the French Broad River valley.",
    menu: [
      { course: "Amuse", dish: "Smoked trout mousse, buckwheat crisp, preserved lemon" },
      { course: "First", dish: "Foraged ramp veloute, poached quail egg, black garlic oil" },
      { course: "Second", dish: "Seared NC mountain trout, spring pea tendrils, Meyer lemon beurre blanc" },
      { course: "Main", dish: "Hickory-grilled wagyu, smoked bone marrow, charred brassicas, red wine jus" },
      { course: "Cheese", dish: "Appalachian cheese selection, sourwood honeycomb, walnut bread" },
      { course: "Dessert", dish: "Dark chocolate terrine, raspberry coulis, gold leaf" },
    ],
    gradient: "linear-gradient(160deg, #2d2418 0%, #1a1610 60%, #0d0c08 100%)",
  },
  {
    name: "The Canopy Bar",
    subtitle: "Cocktails & Small Plates",
    hours: "Daily, 4:00 PM - Midnight",
    dress: "Resort Casual",
    description:
      "Elevated among the treetops, The Canopy Bar offers craft cocktails inspired by Appalachian botanicals and a menu of refined small plates. The outdoor terrace wraps around a 200-year-old oak, offering sunset views that stretch to the Great Smokies. Live acoustic music Thursday through Saturday.",
    menu: [
      { course: "Signature", dish: "The Solas: bourbon, sourwood honey, lemon, thyme smoke" },
      { course: "Garden", dish: "Lavender Collins: gin, estate lavender, elderflower, prosecco" },
      { course: "Mountain", dish: "Smoky Old Fashioned: rye, smoked maple, Angostura, orange" },
      { course: "Plate", dish: "Charcuterie: house-cured meats, pickled vegetables, grilled bread" },
      { course: "Plate", dish: "Truffle fries, parmesan cream, fresh herbs" },
    ],
    gradient: "linear-gradient(160deg, #1a2818 0%, #162018 60%, #0d1210 100%)",
  },
  {
    name: "Morning Light",
    subtitle: "Breakfast & Brunch",
    hours: "Daily, 7:00 AM - 11:00 AM | Weekend Brunch until 1:00 PM",
    dress: "Resort Casual",
    description:
      "Start each morning with views of mist rising through the valley. Morning Light serves farm-fresh breakfast and weekend brunch featuring eggs from our heritage flock, house-baked pastries, and produce picked that morning from the kitchen garden. Cold-pressed juices and specialty coffee from a local Asheville roaster.",
    menu: [
      { course: "Garden", dish: "Avocado toast: sourdough, pickled radish, everything seasoning, microgreens" },
      { course: "Farm", dish: "Heritage eggs any style, heritage pork sausage, roasted tomato, sourdough" },
      { course: "Sweet", dish: "Buttermilk pancakes, sourwood honey butter, seasonal berry compote" },
      { course: "Light", dish: "Acai bowl, house granola, local honey, seasonal fruit" },
      { course: "Brunch", dish: "Smoked trout benedict, dill hollandaise, capers, brioche" },
    ],
    gradient: "linear-gradient(160deg, #3a3020 0%, #2d2818 60%, #1a1a10 100%)",
  },
];

const farmPartners = [
  { name: "Hickory Nut Gap Farm", specialty: "Heritage meats", distance: "12 miles" },
  { name: "Gaining Ground Farm", specialty: "Organic vegetables", distance: "8 miles" },
  { name: "Looking Glass Creamery", specialty: "Artisan cheeses", distance: "22 miles" },
  { name: "Imladris Farm", specialty: "Berries & stone fruit", distance: "15 miles" },
  { name: "Sunburst Trout", specialty: "Mountain trout", distance: "28 miles" },
  { name: "Dynamite Roasting", specialty: "Specialty coffee", distance: "5 miles" },
];

export default function DiningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #3a2e20 0%, #2d2418 50%, #1a1610 100%)",
          }}
        />
        <div className="absolute inset-0 atmosphere-warm" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Dining
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-3xl">
              From Mountain to Table
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
              Three distinct venues celebrating the extraordinary bounty of
              western North Carolina, guided by Executive Chef Margaux Chen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Venues */}
      {venues.map((venue, venueIndex) => (
        <section key={venue.name} className={`py-24 md:py-32 ${venueIndex % 2 === 1 ? "bg-cream-light" : ""}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Image */}
              <AnimatedSection direction={venueIndex % 2 === 0 ? "left" : "right"} className={venueIndex % 2 === 1 ? "lg:order-2" : ""}>
                <div
                  className="aspect-[4/5] lg:aspect-[3/4]"
                  style={{ background: venue.gradient }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-12">
                    <span className="font-display text-cream/15 text-[100px] md:text-[140px] leading-none">
                      {venue.name.charAt(0)}
                    </span>
                    <span className="text-cream/25 text-[11px] tracking-[0.3em] uppercase mt-4">
                      {venue.name}
                    </span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Content */}
              <div className={venueIndex % 2 === 1 ? "lg:order-1" : ""}>
                <AnimatedSection>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">
                    {venue.subtitle}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-3">
                    {venue.name}
                  </h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-stone text-sm mb-6">
                    <span>{venue.hours}</span>
                    <span>&middot;</span>
                    <span>{venue.dress}</span>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <p className="text-stone text-base leading-relaxed mb-10">
                    {venue.description}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-forest/50 mb-6">
                    Sample Menu
                  </h3>
                </AnimatedSection>

                <StaggerChildren stagger={0.06}>
                  <div className="space-y-0">
                    {venue.menu.map((item, i) => (
                      <StaggerItem key={`${item.course}-${i}`}>
                        <div className="py-4 border-b border-forest/8 grid grid-cols-[80px_1fr] gap-4">
                          <span className="text-[11px] tracking-[0.15em] uppercase text-gold/70">
                            {item.course}
                          </span>
                          <span className="text-sm text-stone">{item.dish}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerChildren>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Farm Partners */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Our Partners
              </p>
              <h2 className="font-display text-cream text-4xl md:text-5xl leading-[1.1] mb-6">
                Rooted in Community
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-cream/50 text-base leading-relaxed max-w-xl">
                Over 90% of our ingredients are sourced within 50 miles. These
                relationships with local farmers, foragers, and artisans are the
                foundation of everything we serve.
              </p>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.06} className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/5">
            {farmPartners.map((partner) => (
              <StaggerItem key={partner.name}>
                <div className="bg-forest p-8 group hover:bg-forest-mid transition-colors duration-500">
                  <h3 className="font-display text-cream text-xl mb-1 group-hover:text-gold transition-colors duration-500">
                    {partner.name}
                  </h3>
                  <p className="text-cream/30 text-sm mb-3">{partner.specialty}</p>
                  <span className="text-gold/50 text-[11px] tracking-[0.15em] uppercase">
                    {partner.distance}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Private Dining CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Private Dining
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-6 max-w-2xl mx-auto">
              Intimate gatherings in extraordinary settings
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-stone text-base leading-relaxed max-w-md mx-auto mb-10">
              From creekside suppers for two to mountaintop celebrations for fifty,
              our events team creates unforgettable culinary moments.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Link
              href="/contact"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Inquire About Private Dining
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
