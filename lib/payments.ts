import crypto from "crypto";
import { query, queryOne } from "./db";

interface PaidUser {
  id: number;
  email: string;
  stripe_customer_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: Date;
  created_at: Date;
  updated_at: Date;
}

/**
 * Add a paid user to the database
 */
export async function addPaidUser(
  email: string,
  stripeCustomerId: string,
  stripePaymentIntentId: string
): Promise<void> {
  await query(
    `INSERT INTO users (email, stripe_customer_id, stripe_payment_intent_id, paid_at)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (email) DO UPDATE SET
       stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, users.stripe_customer_id),
       stripe_payment_intent_id = COALESCE(EXCLUDED.stripe_payment_intent_id, users.stripe_payment_intent_id),
       updated_at = NOW()`,
    [email.toLowerCase(), stripeCustomerId, stripePaymentIntentId]
  );
  console.log(`Added/updated paid user: ${email}`);
}

/**
 * Check if an email has paid access
 */
export async function hasPaidAccess(email: string): Promise<boolean> {
  const user = await queryOne<PaidUser>(
    "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
    [email]
  );
  return user !== null;
}

/**
 * Get paid user details
 */
export async function getPaidUser(email: string): Promise<PaidUser | null> {
  return queryOne<PaidUser>(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
    [email]
  );
}

/**
 * Remove a user (for refunds)
 */
export async function removePaidUser(email: string): Promise<void> {
  await query("DELETE FROM users WHERE LOWER(email) = LOWER($1)", [email]);
  console.log(`Removed paid user: ${email}`);
}

/**
 * Verify Stripe webhook signature
 */
export function verifyStripeWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const elements = signature.split(",");
  const timestampElement = elements.find((e) => e.startsWith("t="));
  const signatureElement = elements.find((e) => e.startsWith("v1="));

  if (!timestampElement || !signatureElement) {
    return false;
  }

  const timestamp = timestampElement.split("=")[1];
  const expectedSig = signatureElement.split("=")[1];

  const signedPayload = `${timestamp}.${payload}`;
  const hmac = crypto.createHmac("sha256", secret);
  const computedSig = hmac.update(signedPayload).digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSig),
    Buffer.from(computedSig)
  );
}
