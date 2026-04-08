import Link from "next/link";

const footerLinks = {
  experience: [
    { href: "/spa", label: "Spa & Wellness" },
    { href: "/dining", label: "Dining" },
    { href: "/accommodations", label: "Accommodations" },
    { href: "/experiences", label: "Experiences" },
  ],
  discover: [
    { href: "/about", label: "Our Story" },
    { href: "/about#philosophy", label: "Philosophy" },
    { href: "/about#sustainability", label: "Sustainability" },
    { href: "/contact", label: "Careers" },
  ],
  connect: [
    { href: "/contact", label: "Reservations" },
    { href: "/contact", label: "Gift Cards" },
    { href: "/contact", label: "Press Inquiries" },
    { href: "/contact", label: "Private Events" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-forest text-cream/70">
      {/* Pre-footer CTA */}
      <div className="border-b border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Begin Your Journey
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream mb-8 max-w-3xl mx-auto leading-[1.1]">
            Your sanctuary awaits in the mountains
          </h2>
          <Link
            href="/contact"
            className="inline-block text-[12px] tracking-[0.2em] uppercase px-10 py-4 border border-cream/30 text-cream hover:bg-cream hover:text-forest transition-all duration-500"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            Reserve Your Stay
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-3xl text-cream tracking-[0.02em]">
                Solas
              </span>
              <span className="block text-[9px] tracking-[0.35em] uppercase text-cream/40 mt-[-2px]">
                Blue Ridge Sanctuary
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/50 max-w-xs mb-8">
              Nestled within 200 acres of pristine Blue Ridge Mountain forest,
              Solas offers an escape where luxury meets the untamed beauty of
              western North Carolina.
            </p>
            <address className="not-italic text-sm text-cream/40 space-y-1">
              <p>1247 Ridgecrest Trail</p>
              <p>Asheville, North Carolina 28804</p>
              <p className="mt-3">
                <a
                  href="tel:+18285551247"
                  className="hover:text-gold transition-colors duration-300"
                >
                  (828) 555-1247
                </a>
              </p>
              <p>
                <a
                  href="mailto:welcome@solasspa.com"
                  className="hover:text-gold transition-colors duration-300"
                >
                  welcome@solasspa.com
                </a>
              </p>
            </address>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-cream/30 mb-6">
              Experience
            </h3>
            <ul className="space-y-3">
              {footerLinks.experience.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-cream/30 mb-6">
              Discover
            </h3>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-cream/30 mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Solas Spa & Sanctuary. All rights
            reserved. This is a portfolio demonstration.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-cream/30 hover:text-cream/50 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-cream/30 hover:text-cream/50 transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-cream/30 hover:text-cream/50 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
