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
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🏄 ${APP_NAME}</h1>
            </div>
            <div style="background: #f8fafc; padding: 40px 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="color: #1e293b; margin-top: 0;">Sign in to access your workouts</h2>
              <p style="color: #64748b; margin-bottom: 30px;">
                Click the button below to securely sign in. This link will expire in 15 minutes.
              </p>
              <a href="${magicLinkUrl}" style="display: inline-block; background: #0ea5e9; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Sign In to ${APP_NAME}
              </a>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 30px;">
                If you didn't request this email, you can safely ignore it.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${magicLinkUrl}" style="color: #0ea5e9; word-break: break-all;">${magicLinkUrl}</a>
              </p>
            </div>
          </body>
          </html>
        `,
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
