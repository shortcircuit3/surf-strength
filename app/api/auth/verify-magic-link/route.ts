import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLink, createSession } from "@/lib/auth";

const SESSION_COOKIE_NAME = "surf-session";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  console.log(
    "[verify-magic-link] Starting verification for token:",
    token?.slice(0, 8) + "..."
  );

  if (!token) {
    console.log("[verify-magic-link] No token provided");
    return NextResponse.redirect(
      new URL("/workouts?error=invalid_link", APP_URL)
    );
  }

  try {
    // Verify the magic link
    console.log("[verify-magic-link] Calling verifyMagicLink...");
    const email = await verifyMagicLink(token);
    console.log(
      "[verify-magic-link] verifyMagicLink result:",
      email ? "found" : "not found"
    );

    if (!email) {
      return NextResponse.redirect(
        new URL("/workouts?error=expired_link", APP_URL)
      );
    }

    // Get device info from headers
    const userAgent = request.headers.get("user-agent") || undefined;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    // Create session
    console.log("[verify-magic-link] Creating session for:", email);
    const sessionToken = await createSession(email, userAgent, ipAddress);
    console.log(
      "[verify-magic-link] Session created:",
      sessionToken ? "success" : "failed"
    );

    if (!sessionToken) {
      return NextResponse.redirect(
        new URL("/workouts?error=session_failed", APP_URL)
      );
    }

    // Create redirect response with session cookie
    const response = NextResponse.redirect(new URL("/workouts", APP_URL));

    // Set cookie directly on the response
    const isProduction = process.env.NODE_ENV === "production";
    const maxAge = 30 * 24 * 60 * 60; // 30 days

    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    console.log("[verify-magic-link] Success! Redirecting to /workouts");
    return response;
  } catch (error) {
    console.error("[verify-magic-link] ERROR:", error);
    // Return the actual error in development for debugging
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        {
          error: "Verification failed",
          details: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
        { status: 500 }
      );
    }
    return NextResponse.redirect(
      new URL("/workouts?error=verification_failed", APP_URL)
    );
  }
}
