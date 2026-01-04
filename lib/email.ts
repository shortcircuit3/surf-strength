/**
 * Email service for sending magic links
 * Uses Resend API (https://resend.com)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@example.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const APP_NAME = "Surf Workout";

interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendMagicLinkEmail(
  email: string,
  token: string
): Promise<SendEmailResult> {
  const magicLinkUrl = `${APP_URL}/api/auth/verify-magic-link?token=${token}`;

  // In development, just log the link
  if (!RESEND_API_KEY || process.env.NODE_ENV === "development") {
    console.log("=".repeat(60));
    console.log("MAGIC LINK EMAIL (dev mode)");
    console.log(`To: ${email}`);
    console.log(`Link: ${magicLinkUrl}`);
    console.log("=".repeat(60));
    return { success: true };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: `Sign in to ${APP_NAME}`,
        text: `Sign in to ${APP_NAME}\n\nClick this link to sign in: ${magicLinkUrl}\n\nThis link will expire in 15 minutes.\n\nIf you didn't request this email, you can safely ignore it.`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to send email:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
