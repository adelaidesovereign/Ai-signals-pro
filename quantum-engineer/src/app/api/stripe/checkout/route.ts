import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { stripe, PRODUCT_CONFIG, type ProductSlug } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const product = searchParams.get("product") as ProductSlug | null;

  if (!product || !(product in PRODUCT_CONFIG)) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  const config = PRODUCT_CONFIG[product];
  const priceId = process.env[config.priceEnvKey];
  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  // Dev fallback — if Stripe is not configured yet (local dev, staging),
  // send the visitor to a friendly explainer page instead of erroring.
  const isStripeMissing =
    !stripeSecret ||
    stripeSecret.startsWith("sk_test_placeholder") ||
    !priceId ||
    priceId.includes("_dev") ||
    priceId === "";
  if (isStripeMissing) {
    const origin = process.env.NEXTAUTH_URL ?? new URL(req.url).origin;
    const dest = new URL(`${origin}/checkout-unavailable`);
    dest.searchParams.set("product", product);
    return NextResponse.redirect(dest, { status: 303 });
  }

  const session = await auth();
  const origin =
    process.env.NEXTAUTH_URL ?? new URL(req.url).origin;

  // If the buyer is already signed in, attach their Stripe customer so the
  // webhook can grant access directly without guessing.
  let customerId: string | undefined;
  let customerEmail: string | undefined;
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (user) {
      if (user.stripeCustomerId) {
        customerId = user.stripeCustomerId;
      } else {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId: user.id },
        });
        customerId = customer.id;
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
      customerEmail = user.email;
    }
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: config.mode,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customerId,
    customer_email: customerId ? undefined : customerEmail,
    success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}&product=${product}`,
    cancel_url: `${origin}/services#${product}`,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    metadata: {
      product,
      userId: session?.user?.id ?? "",
    },
    // Stripe-hosted checkout is already themed per dashboard settings. Once
    // Adelaide sets the brand assets on the Stripe dashboard — the cream
    // background, sage accents, the logo — every checkout inherits them.
    ...(config.mode === "subscription"
      ? {
          subscription_data: {
            metadata: {
              product,
              installmentPlan: config.installmentPlan ? "true" : "false",
            },
          },
        }
      : {}),
  });

  return NextResponse.redirect(checkout.url ?? `${origin}/services`, {
    status: 303,
  });
}
