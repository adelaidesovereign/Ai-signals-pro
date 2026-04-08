"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/AnimatedSection";
import { images } from "@/lib/images";
import { rooms } from "@/lib/rooms";

const amenities = [
  "Organic bath products by Solas Apothecary",
  "Turndown service with house-made chocolates",
  "24-hour in-room dining",
  "Complimentary thermal waters access",
  "Daily yoga & wellness programming",
  "Valet parking",
  "High-speed Wi-Fi throughout",
  "EV charging stations",
  "Concierge & experience planning",
  "Pet-friendly rooms available",
  "Twice-daily housekeeping",
  "Complimentary estate shuttle",
];

export default function AccommodationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <Image src={images.hotelBed} alt="Luxury suite" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-forest/50" />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Accommodations
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
              Rest Among the Canopy
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
              Forty-two rooms and residences, each designed to frame the
              landscape as living art.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.2] mb-6">
                Natural materials, handcrafted furnishings, and floor-to-ceiling glass
                blur the boundary between
                <span className="text-gold italic"> shelter and sky</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-stone text-base leading-relaxed">
                Every accommodation at Solas is oriented to capture the best of the
                Blue Ridge: morning mist rising through the valley, afternoon light
                filtering through the forest canopy, and the spectacular sunsets that
                paint the Great Smokies in gold and violet. Local artisans crafted
                the furniture, and each room features original work by western North
                Carolina artists.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Room Cards */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <StaggerChildren stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <StaggerItem key={room.slug}>
                <Link href={`/accommodations/${room.slug}`} className="group block card-lift">
                  <div className="relative aspect-[3/4] mb-6 img-zoom overflow-hidden">
                    <Image src={room.images[0]} alt={room.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
                      <span className="text-cream/30 text-[11px] tracking-[0.2em] uppercase">
                        {room.size}
                      </span>
                      <div>
                        <h3 className="font-display text-cream text-2xl md:text-3xl mb-2 group-hover:text-gold transition-colors duration-500">
                          {room.name}
                        </h3>
                        <span className="text-cream/40 text-sm">{room.price}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {room.features.map((feature) => (
                      <li key={feature} className="text-stone text-sm flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Included With Every Stay
              </p>
              <h2 className="font-display text-cream text-4xl md:text-5xl leading-[1.1]">
                Amenities & Services
              </h2>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.04} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-5">
            {amenities.map((amenity) => (
              <StaggerItem key={amenity}>
                <div className="flex items-start gap-3 py-3 border-b border-cream/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span className="text-cream/60 text-sm">{amenity}</span>
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
              Find your perfect sanctuary
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-stone text-base leading-relaxed max-w-md mx-auto mb-10">
              Our reservations team is available to help you select the ideal
              accommodation for your stay.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Link
              href="/contact"
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Check Availability
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
