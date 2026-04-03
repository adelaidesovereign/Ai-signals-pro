import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 atmosphere-glow" />
      <div className="text-center px-6 relative z-10">
        <span className="font-display text-[180px] md:text-[280px] leading-none text-forest/[0.04] block select-none">
          404
        </span>
        <div className="-mt-20 md:-mt-32">
          <p className="overline mb-4">Page Not Found</p>
          <h1 className="font-display text-3xl md:text-5xl leading-[1.15] mb-4">
            The trail ends here
          </h1>
          <p className="text-stone text-base leading-relaxed max-w-md mx-auto mb-10">
            It seems you&rsquo;ve wandered off the path. Let us guide you back
            to the sanctuary.
          </p>
          <Link
            href="/"
            className="inline-block text-[12px] tracking-[0.2em] uppercase font-body px-10 py-4 border border-forest/20 text-forest btn-fill transition-all duration-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
