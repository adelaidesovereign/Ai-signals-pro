import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV === "production") {
  throw new Error("STRIPE_SECRET_KEY is required in production.");
}

export const stripe = new Stripe(secretKey ?? "sk_test_missing", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
  appInfo: {
    name: "Quantum Engineer",
    version: "1.0.0",
  },
});

export type ProductSlug =
  | "field-guide"
  | "certification"
  | "certification-plan"
  | "inner-circle";

export const PRODUCT_CONFIG: Record<
  ProductSlug,
  {
    priceEnvKey: string;
    mode: "payment" | "subscription";
    installmentPlan?: boolean;
    successPath: string;
    product: "FIELD_GUIDE" | "CERTIFICATION" | "INNER_CIRCLE";
    amountCents: number;
  }
> = {
  "field-guide": {
    priceEnvKey: "STRIPE_PRICE_FIELD_GUIDE",
    mode: "payment",
    successPath: "/field-guide?welcome=1",
    product: "FIELD_GUIDE",
    amountCents: 2700,
  },
  certification: {
    priceEnvKey: "STRIPE_PRICE_CERTIFICATION_FULL",
    mode: "payment",
    successPath: "/certification?welcome=1",
    product: "CERTIFICATION",
    amountCents: 49700,
  },
  "certification-plan": {
    priceEnvKey: "STRIPE_PRICE_CERTIFICATION_INSTALLMENT",
    mode: "subscription",
    installmentPlan: true,
    successPath: "/certification?welcome=1",
    product: "CERTIFICATION",
    amountCents: 16700,
  },
  "inner-circle": {
    priceEnvKey: "STRIPE_PRICE_INNER_CIRCLE",
    mode: "subscription",
    successPath: "/inner-circle?welcome=1",
    product: "INNER_CIRCLE",
    amountCents: 9700,
  },
};
