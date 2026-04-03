"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/AnimatedSection";
import { images } from "@/lib/images";

const inquiryTypes = [
  "Room Reservation",
  "Spa Treatment",
  "Dining Reservation",
  "Private Event",
  "Gift Card",
  "General Inquiry",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    arrivalDate: "",
    departureDate: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    "w-full bg-transparent border-b border-forest/20 py-3 text-forest placeholder:text-stone/50 focus:border-gold focus:outline-none transition-colors duration-500 text-sm";
  const labelClasses =
    "text-[11px] tracking-[0.15em] uppercase text-stone/70 mb-2 block";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={images.mountainMist} alt="Mountain vista" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-forest/50" />
        <div className="absolute inset-0 atmosphere-mist" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Reservations
            </p>
            <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Begin Your Stay
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <AnimatedSection>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.2] mb-3">
                  Make a Reservation
                </h2>
                <p className="text-stone text-base leading-relaxed mb-12">
                  Complete the form below and our reservations team will respond
                  within 24 hours to confirm your stay.
                </p>
              </AnimatedSection>

              {submitted ? (
                <AnimatedSection>
                  <div className="py-16 text-center border border-gold/20 bg-cream-light">
                    <span className="font-display text-gold text-5xl block mb-4">
                      Thank You
                    </span>
                    <p className="text-stone text-base leading-relaxed max-w-md mx-auto">
                      Your reservation request has been received. Our team will
                      contact you within 24 hours to confirm the details of your
                      stay at Solas.
                    </p>
                  </div>
                </AnimatedSection>
              ) : (
                <AnimatedSection delay={0.15}>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClasses}>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          className={inputClasses}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Email</label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          className={inputClasses}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClasses}>Phone</label>
                        <input
                          type="tel"
                          placeholder="(828) 555-0000"
                          className={inputClasses}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Inquiry Type</label>
                        <select
                          required
                          className={`${inputClasses} bg-cream appearance-none cursor-pointer`}
                          value={formData.inquiryType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              inquiryType: e.target.value,
                            })
                          }
                        >
                          <option value="">Select an option</option>
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <label className={labelClasses}>Arrival Date</label>
                        <input
                          type="date"
                          className={`${inputClasses} cursor-pointer`}
                          value={formData.arrivalDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              arrivalDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Departure Date</label>
                        <input
                          type="date"
                          className={`${inputClasses} cursor-pointer`}
                          value={formData.departureDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              departureDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Guests</label>
                        <select
                          className={`${inputClasses} bg-cream appearance-none cursor-pointer`}
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({ ...formData, guests: e.target.value })
                          }
                        >
                          <option value="">Select</option>
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                          <option value="7+">7+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your ideal stay, special occasions, dietary needs, or any preferences..."
                        className={`${inputClasses} resize-none`}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-12 py-4 bg-gold text-cream hover:bg-gold-light transition-all duration-500 cursor-pointer"
                      style={{
                        transitionTimingFunction:
                          "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      Submit Reservation Request
                    </button>
                  </form>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:sticky lg:top-32 space-y-12">
              <AnimatedSection direction="left">
                <div className="border border-forest/10 p-8">
                  <h3 className="font-display text-xl mb-6">Contact Details</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className={labelClasses}>Address</span>
                      <p className="text-stone">
                        1247 Ridgecrest Trail
                        <br />
                        Asheville, North Carolina 28804
                      </p>
                    </div>
                    <div>
                      <span className={labelClasses}>Phone</span>
                      <p>
                        <a
                          href="tel:+18285551247"
                          className="text-forest hover:text-gold transition-colors"
                        >
                          (828) 555-1247
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className={labelClasses}>Email</span>
                      <p>
                        <a
                          href="mailto:welcome@solasspa.com"
                          className="text-forest hover:text-gold transition-colors"
                        >
                          welcome@solasspa.com
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className={labelClasses}>Reservations</span>
                      <p className="text-stone">
                        Available daily, 8:00 AM - 8:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={0.1}>
                <div className="border border-forest/10 p-8">
                  <h3 className="font-display text-xl mb-6">Getting Here</h3>
                  <div className="space-y-4 text-sm text-stone">
                    <div>
                      <span className={labelClasses}>By Air</span>
                      <p>
                        Asheville Regional Airport (AVL) &mdash; 35 minutes.
                        Complimentary airport transfers arranged upon booking.
                      </p>
                    </div>
                    <div>
                      <span className={labelClasses}>By Car</span>
                      <p>
                        20 minutes from downtown Asheville via the Blue Ridge
                        Parkway. Valet parking complimentary.
                      </p>
                    </div>
                    <div>
                      <span className={labelClasses}>Private Aviation</span>
                      <p>
                        Asheville Regional offers FBO services. Helicopter
                        transfers to the estate available upon request.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={0.2}>
                <div className="border border-forest/10 p-8">
                  <h3 className="font-display text-xl mb-4">Gift Cards</h3>
                  <p className="text-stone text-sm leading-relaxed mb-4">
                    Give the gift of Solas. Digital and physical gift cards
                    available in any denomination.
                  </p>
                  <button className="text-[12px] tracking-[0.15em] uppercase text-forest hover:text-gold transition-colors duration-500 inline-flex items-center gap-3 group cursor-pointer">
                    <span>Purchase a Gift Card</span>
                    <span className="inline-block w-8 h-px bg-current transition-all duration-500 group-hover:w-12" />
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="relative h-[400px] overflow-hidden">
        <Image src={images.blueRidge} alt="Blue Ridge Mountains panorama" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="font-display text-cream/20 text-6xl block mb-4">
              35.5951&deg; N, 82.5515&deg; W
            </span>
            <span className="text-cream/30 text-[11px] tracking-[0.3em] uppercase">
              Blue Ridge Mountains &middot; Asheville, NC
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
