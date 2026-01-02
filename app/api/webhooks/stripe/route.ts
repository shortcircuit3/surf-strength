import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { addPaidUser, removePaidUser } from "@/lib/payments";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing Stripe signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  let event: Stripe.Event;

  const stripe = getStripe();

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // For development without webhook secret
      event = JSON.parse(body) as Stripe.Event;
      console.warn(
        "Warning: Processing webhook without signature verification"
      );
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  console.log(`Received Stripe webhook: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", {
          id: session.id,
          payment_status: session.payment_status,
          customer_email: session.customer_email,
          customer: session.customer,
          customer_details: session.customer_details,
        });

        if (session.payment_status === "paid") {
          // Get customer email - try multiple sources
          let email = session.customer_email || session.customer_details?.email;

          // If no email on session, fetch from customer object
          if (!email && session.customer) {
            console.log("Fetching customer details from Stripe...");
            const customer = await stripe.customers.retrieve(
              session.customer as string
            );
            if (customer && !customer.deleted) {
              email = customer.email;
            }
          }

          if (email) {
            console.log(`Adding paid user to database: ${email}`);
            await addPaidUser(
              email,
              (session.customer as string) || "",
              (session.payment_intent as string) || ""
            );
            console.log(`Successfully added paid user: ${email}`);
          } else {
            console.error("No email found in checkout session:", session.id);
            console.error("Session data:", JSON.stringify(session, null, 2));
          }
        } else {
          console.log(
            `Payment not completed yet. Status: ${session.payment_status}`
          );
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;

        // Get customer email from charge
        if (charge.billing_details?.email) {
          await removePaidUser(charge.billing_details.email);
          console.log(
            `Removed access for refunded user: ${charge.billing_details.email}`
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        // Handle subscription cancellation if you add subscriptions later
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription deleted: ${subscription.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    message: "Stripe webhook endpoint active",
    timestamp: new Date().toISOString(),
  });
}
