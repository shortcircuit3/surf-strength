import Stripe from "stripe";

// Initialize Stripe lazily to avoid errors at build time
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    });
  }
  return stripeInstance;
}

// Price ID for the surf workout program (configure in Stripe dashboard)
export const SURF_WORKOUT_PRICE_ID = process.env.STRIPE_PRICE_ID || "";

// App URL for redirects
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
