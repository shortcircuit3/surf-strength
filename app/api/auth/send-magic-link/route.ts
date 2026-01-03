import { NextRequest, NextResponse } from "next/server";
import { createMagicLink, checkMagicLinkRateLimit } from "@/lib/auth";
import { hasPaidAccess } from "@/lib/payments";
import { sendMagicLinkEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user has paid access
    const hasAccess = await hasPaidAccess(email);
    if (!hasAccess) {
      // Don't reveal whether the email exists or not for security
      // Still return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: "If this email has access, a sign-in link has been sent.",
      });
    }

    // Check rate limiting
    const canSend = await checkMagicLinkRateLimit(email);
    if (!canSend) {
      return NextResponse.json(
        { error: "Please wait before requesting another sign-in link" },
        { status: 429 }
      );
    }

    // Create magic link
    const token = await createMagicLink(email);

    // Send email
    const result = await sendMagicLinkEmail(email, token);
    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "If this email has access, a sign-in link has been sent.",
    });
  } catch (error) {
    console.error("Send magic link error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
