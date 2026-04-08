"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/AnimatedSection";
import { rooms } from "@/lib/rooms";

export default function RoomDetailPage() {
  const params = useParams();
  const room = rooms.find((r) => r.slug === params.slug);

  if (!room) {
    return (
      <section className="py-32 text-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="font-display text-4xl mb-6">Room Not Found</h1>
          <p className="text-stone mb-10">
            The accommodation you are looking for does not exist.
          </p>
          <Link
            href="/accommodations"
            className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
          >
            View All Accommodations
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[540px] flex items-end overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest/50" />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <Link
              href="/accommodations"
              className="inline-flex items-center gap-2 text-cream/40 text-[11px] tracking-[0.2em] uppercase hover:text-gold transition-colors duration-500 mb-6"
            >
              <span className="w-4 h-px bg-current" />
              All Accommodations
            </Link>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              {room.size}
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
              {room.name}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed italic">
              {room.tagline}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Description + Specs Sidebar */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Description */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                  The Experience
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.2] mb-8">
                  {room.name}
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <p className="text-stone text-base md:text-lg leading-relaxed">
                  {room.description}
                </p>
              </AnimatedSection>

              {/* Highlights */}
              <div className="mt-14">
                <StaggerChildren stagger={0.1} className="grid sm:grid-cols-3 gap-8">
                  {room.highlights.map((highlight) => (
                    <StaggerItem key={highlight.label}>
                      <div className="border-t border-forest/15 pt-6">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">
                          {highlight.label}
                        </p>
                        <p className="text-stone text-sm leading-relaxed">
                          {highlight.detail}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </div>

            {/* Specs Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <div className="bg-forest/[0.03] p-8 md:p-10">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">
                    Room Details
                  </p>
                  <div className="space-y-6">
                    <div className="border-b border-forest/10 pb-4">
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-1">Size</p>
                      <p className="text-forest text-sm">{room.size}</p>
                    </div>
                    <div className="border-b border-forest/10 pb-4">
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-1">Bed Configuration</p>
                      <p className="text-forest text-sm">{room.bedConfiguration}</p>
                    </div>
                    <div className="border-b border-forest/10 pb-4">
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-1">Max Occupancy</p>
                      <p className="text-forest text-sm">{room.maxOccupancy} guests</p>
                    </div>
                    <div className="border-b border-forest/10 pb-4">
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-1">Bathroom</p>
                      <p className="text-forest text-sm">{room.bathroom}</p>
                    </div>
                    <div className="border-b border-forest/10 pb-4">
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-1">Check-in</p>
                      <p className="text-forest text-sm">{room.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-1">Check-out</p>
                      <p className="text-forest text-sm">{room.checkOut}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-10 pt-8 border-t border-forest/10">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-stone/60 mb-2">Starting Rate</p>
                    <p className="font-display text-2xl text-forest">{room.price}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-20 md:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <StaggerChildren stagger={0.12} className="grid md:grid-cols-3 gap-4">
            {room.images.map((img, i) => (
              <StaggerItem key={i}>
                <div className="relative aspect-[4/5] overflow-hidden img-zoom">
                  <Image
                    src={img}
                    alt={`${room.name} - view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Extended Features / Amenities */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <AnimatedSection>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                In-Room Amenities
              </p>
              <h2 className="font-display text-cream text-4xl md:text-5xl leading-[1.1]">
                Every Detail, Considered
              </h2>
            </AnimatedSection>
          </div>

          <StaggerChildren stagger={0.05} className="grid md:grid-cols-2 gap-x-16 gap-y-5">
            {room.extendedFeatures.map((feature) => (
              <StaggerItem key={feature}>
                <div className="flex items-start gap-3 py-3 border-b border-cream/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span className="text-cream/60 text-sm">{feature}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Reserve Your Stay
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-4 max-w-2xl mx-auto">
              {room.name}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-display text-xl text-stone/70 mb-10">{room.price}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                Book This Room
              </Link>
              <Link
                href="/accommodations"
                className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-forest/20 text-forest hover:border-gold hover:text-gold transition-all duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                Back to All Accommodations
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
