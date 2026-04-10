import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, PRODUCT_CONFIG, type ProductSlug } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { tagBuyer } from "@/lib/convertkit";

export const runtime = "nodejs";

async function ensureUser({
  email,
  stripeCustomerId,
}: {
  email: string;
  stripeCustomerId?: string;
}) {
  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existing) {
    if (stripeCustomerId && !existing.stripeCustomerId) {
      return prisma.user.update({
        where: { id: existing.id },
        data: { stripeCustomerId },
      });
    }
    return existing;
  }

  // Provisional account created by the webhook. The buyer sets their own
  // username + password on the /welcome page using their Stripe session id.
  // Until then, a placeholder username and random password hash keeps the
  // row valid.
  const placeholderUsername = `member_${Date.now().toString(36)}`;
  const placeholderHash =
    "$2a$12$placeholderplaceholderplaceholderplaceholder";
  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      username: placeholderUsername,
      passwordHash: placeholderHash,
      stripeCustomerId,
    },
  });
}

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 400 },
    );
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[stripe] signature verify failed", err);
    return NextResponse.json(
      { error: "Invalid signature." },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const productSlug = session.metadata?.product as ProductSlug | undefined;
        if (!productSlug || !PRODUCT_CONFIG[productSlug]) break;
        const config = PRODUCT_CONFIG[productSlug];

        const email =
          session.customer_details?.email ??
          session.customer_email ??
          "";
        if (!email) break;

        const user = await ensureUser({
          email,
          stripeCustomerId:
            (session.customer as string | null) ?? undefined,
        });

        if (config.mode === "payment") {
          await prisma.purchase.upsert({
            where: { stripeSessionId: session.id },
            update: { status: "PAID" },
            create: {
              userId: user.id,
              product: config.product,
              status: "PAID",
              amountCents: config.amountCents,
              currency: session.currency ?? "usd",
              stripeSessionId: session.id,
              stripePaymentIntent:
                (session.payment_intent as string | null) ?? undefined,
              installmentPlan: false,
            },
          });
        } else {
          const subscriptionId = session.subscription as string | null;
          if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            await prisma.subscription.upsert({
              where: { stripeSubscriptionId: sub.id },
              update: {
                status: "ACTIVE",
                currentPeriodEnd: new Date(sub.current_period_end * 1000),
                cancelAtPeriodEnd: sub.cancel_at_period_end,
              },
              create: {
                userId: user.id,
                product: config.product,
                status: "ACTIVE",
                stripeSubscriptionId: sub.id,
                stripePriceId: sub.items.data[0]?.price.id ?? "",
                currentPeriodEnd: new Date(sub.current_period_end * 1000),
                cancelAtPeriodEnd: sub.cancel_at_period_end,
              },
            });
          }
        }

        await tagBuyer({
          email,
          product:
            config.product === "FIELD_GUIDE"
              ? "field-guide"
              : config.product === "CERTIFICATION"
                ? "certification"
                : "inner-circle",
        }).catch(() => {});
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status:
              sub.status === "active"
                ? "ACTIVE"
                : sub.status === "past_due"
                  ? "PAST_DUE"
                  : sub.status === "canceled"
                    ? "CANCELED"
                    : sub.status === "trialing"
                      ? "TRIALING"
                      : "INCOMPLETE",
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = invoice.subscription as string | null;
        if (subId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subId },
            data: { status: "PAST_DUE" },
          });
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[stripe] handler for ${event.type} failed`, err);
    return NextResponse.json(
      { error: "Handler error." },
      { status: 500 },
    );
  }
}
