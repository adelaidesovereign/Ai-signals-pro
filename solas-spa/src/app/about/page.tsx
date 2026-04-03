"use client";

import Link from "next/link";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
  LineReveal,
} from "@/components/AnimatedSection";

const timeline = [
  { year: "2016", event: "Founders Elena & James Ashworth discover the 200-acre property while hiking the Blue Ridge" },
  { year: "2017", event: "Acquisition of land and engagement of architect Tomoko Sato, known for her nature-integrated designs" },
  { year: "2018", event: "Construction begins with a commitment to preserving 85% of existing old-growth forest" },
  { year: "2019", event: "Solas opens with 28 rooms, the spa, and Rootwood restaurant" },
  { year: "2020", event: "Despite global challenges, Solas becomes a refuge. Treehouse and cottage accommodations added" },
  { year: "2021", event: "Forbes Travel Guide Five-Star recognition. Kitchen garden expands to 2 acres" },
  { year: "2022", event: "The Canopy Bar opens. Chef Margaux Chen joins as Executive Chef" },
  { year: "2023", event: "Summit Residence and expanded wellness programming launch. Cond\u00e9 Nast Traveler Gold List" },
  { year: "2024", event: "Carbon-neutral certification achieved. Named #1 Spa in the Southeast by Travel + Leisure" },
];

const team = [
  { name: "Elena Ashworth", role: "Co-Founder & Creative Director", bio: "Former interior architect whose vision for Solas began with a sketchbook and a sunset on the Blue Ridge Parkway." },
  { name: "James Ashworth", role: "Co-Founder & Managing Director", bio: "Hospitality veteran with two decades at Four Seasons and Aman. His philosophy: luxury is attention to the unseen details." },
  { name: "Margaux Chen", role: "Executive Chef", bio: "Trained at Noma and Narisawa before falling in love with Appalachian ingredients. Her tasting menus have earned national acclaim." },
  { name: "Dr. Lena Okafor", role: "Wellness Director", bio: "Integrative medicine practitioner who designed our holistic wellness program blending Eastern and Appalachian healing traditions." },
  { name: "Tomoko Sato", role: "Architect", bio: "The Tokyo-born, Asheville-based architect who designed Solas to disappear into the forest rather than impose upon it." },
];

const values = [
  { title: "Rooted in Place", desc: "Every design choice, ingredient, and experience connects to this specific landscape. We are not a luxury brand that could exist anywhere. We are of these mountains." },
  { title: "Invisible Luxury", desc: "True luxury doesn't announce itself. It's the heated bathroom floor at 3 AM, the hand-written note, the perfectly timed sunset view. Details felt, not displayed." },
  { title: "Living Lightly", desc: "85% of original forest preserved. Carbon-neutral operations. 90% local sourcing. Regenerative agriculture in our kitchen garden. Sustainability isn't a program; it's how we build." },
  { title: "Time as Gift", desc: "We design every experience to dissolve the urgency of the outside world. No check-in lines, no scheduled buffets, no manufactured urgency. Your time here is yours." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #2d3a2e 0%, #1a2818 50%, #1a1f16 100%)",
          }}
        />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Our Story
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
              Born of Mountain & Light
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
              The word &ldquo;solas&rdquo; comes from the Gaelic for
              &ldquo;light&rdquo; and &ldquo;solace.&rdquo; It is both what
              we offer and what we seek.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <AnimatedSection>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-8">
                  A sanctuary imagined while
                  <span className="text-gold italic"> walking among giants</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <div className="space-y-6 text-stone text-base leading-relaxed">
                  <p>
                    In the autumn of 2016, Elena and James Ashworth took a wrong turn
                    on a Blue Ridge hiking trail and stumbled into a clearing that
                    would change their lives. Before them stretched 200 acres of
                    untouched Appalachian forest, a creek running through ancient
                    hemlock, and a view that seemed to hold the entire world in its
                    quiet frame.
                  </p>
                  <p>
                    &ldquo;We didn&rsquo;t find this land,&rdquo; Elena often says.
                    &ldquo;It found us.&rdquo; Both had spent careers in hospitality
                    &mdash; James in operations at the world&rsquo;s finest hotels,
                    Elena as an interior architect &mdash; dreaming of creating
                    something that honored the landscape rather than consuming it.
                  </p>
                  <p>
                    They engaged architect Tomoko Sato, whose design philosophy of
                    &ldquo;buildings that breathe with the forest&rdquo; aligned
                    perfectly with their vision. Together, they spent eighteen months
                    studying the land &mdash; the path of light through the canopy,
                    the flow of water, the patterns of wildlife &mdash; before
                    drawing a single line.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="left" className="lg:sticky lg:top-32">
              <div
                className="aspect-[3/4]"
                style={{
                  background: "linear-gradient(135deg, #3a4a35 0%, #2d3a2e 50%, #1a2318 100%)",
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center atmosphere-mist p-12">
                  <span className="font-display text-cream/15 text-[120px] md:text-[180px] leading-none italic">
                    S
                  </span>
                  <span className="text-cream/30 text-[11px] tracking-[0.3em] uppercase mt-6">
                    Est. 2019
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="philosophy" className="py-24 md:py-32 bg-cream-light">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Philosophy
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">
                What We Believe
              </h2>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.1} className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div>
                  <h3 className="font-display text-2xl mb-4 text-gold">{value.title}</h3>
                  <p className="text-stone text-base leading-relaxed">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Our Journey
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">
                Milestones
              </h2>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.06}>
            <div className="max-w-3xl">
              {timeline.map((item) => (
                <StaggerItem key={item.year}>
                  <div className="grid grid-cols-[80px_1fr] gap-8 py-6 border-b border-forest/8">
                    <span className="font-display text-gold text-xl">{item.year}</span>
                    <p className="text-stone text-sm leading-relaxed">{item.event}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Leadership
              </p>
              <h2 className="font-display text-cream text-4xl md:text-5xl leading-[1.1]">
                The People Behind Solas
              </h2>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((person) => (
              <StaggerItem key={person.name}>
                <div className="group">
                  <div
                    className="aspect-[3/4] mb-6"
                    style={{
                      background: "linear-gradient(135deg, #2d3a2e 0%, #1a2318 100%)",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-cream/10 text-[80px]">
                        {person.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-cream text-xl mb-1 group-hover:text-gold transition-colors duration-500">
                    {person.name}
                  </h3>
                  <p className="text-gold/60 text-[11px] tracking-[0.15em] uppercase mb-3">
                    {person.role}
                  </p>
                  <p className="text-cream/40 text-sm leading-relaxed">{person.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Sustainability
              </p>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-8">
                Treading lightly on the land
                <span className="text-gold italic"> that sustains us</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="space-y-6 text-stone text-base leading-relaxed text-left">
                <p>
                  Solas was designed around the trees, not in spite of them. Our
                  architect mapped every significant tree on the property and
                  designed buildings to weave between them. The result: 85% of the
                  original old-growth forest stands untouched.
                </p>
                <p>
                  Our operations are carbon-neutral, powered by a combination of
                  solar arrays, geothermal heating, and verified carbon offsets for
                  what we cannot yet eliminate. The kitchen garden uses regenerative
                  agriculture practices that actively improve soil health. Our spa
                  products are made on-site with zero-waste production methods.
                </p>
              </div>
            </AnimatedSection>

            <LineReveal className="my-12" />

            <StaggerChildren stagger={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "85%", label: "Forest Preserved" },
                { number: "90%", label: "Local Sourcing" },
                { number: "100%", label: "Carbon Neutral" },
                { number: "0", label: "Waste to Landfill" },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <span className="font-display text-gold text-3xl md:text-4xl block mb-2">
                      {stat.number}
                    </span>
                    <span className="text-stone text-[11px] tracking-[0.15em] uppercase">
                      {stat.label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>
    </>
  );
}
