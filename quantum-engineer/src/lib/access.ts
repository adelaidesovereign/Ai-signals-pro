// Access helpers for course content.
//
// In production (real Stripe keys configured) the gating is strict: users
// must have a paid Purchase or active Subscription to read beyond chapter 1
// / lesson 1.1.
//
// In local dev, staging, or any environment where Stripe is not yet
// configured, we grant full access to every course so the builder can
// walk through the entire experience without registering a fake account
// and faking a purchase.

export function isDevMode() {
  const secret = process.env.STRIPE_SECRET_KEY ?? "";
  const priceFieldGuide = process.env.STRIPE_PRICE_FIELD_GUIDE ?? "";
  return (
    !secret ||
    secret.startsWith("sk_test_placeholder") ||
    secret.startsWith("sk_test_missing") ||
    !priceFieldGuide ||
    priceFieldGuide.includes("_dev") ||
    priceFieldGuide === ""
  );
}

/**
 * Returns true if the given user (or anonymous visitor, in dev mode) can
 * read the full course content. Lessons beyond the preview still require
 * this in production.
 */
export function grantsFullCourseAccess({
  hasPaidRecord,
}: {
  hasPaidRecord: boolean;
}) {
  if (isDevMode()) return true;
  return hasPaidRecord;
}
