import { NextResponse } from "next/server";
import { getStripe, SURF_WORKOUT_PRICE_ID, APP_URL } from "@/lib/stripe";

export async function POST() {
  if (!SURF_WORKOUT_PRICE_ID) {
    console.error("STRIPE_PRICE_ID is not set");
    return NextResponse.json(
      { error: "Stripe price ID not configured" },
      { status: 500 }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: SURF_WORKOUT_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/success?payment=success`,
      cancel_url: `${APP_URL}?canceled=true`,
      // Collect customer email for access verification
      customer_creation: "always",
      // This ensures the email field is shown and required
      custom_fields: [],
      // Collect billing address which includes email
      billing_address_collection: "required",
      // Also collect phone (optional but helps with verification)
      phone_number_collection: {
        enabled: true,
      },
    });

    if (!session.url) {
      console.error("No checkout URL in response");
      return NextResponse.json(
        { error: "No checkout URL returned from Stripe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout", details: String(error) },
      { status: 500 }
    );
  }
}
