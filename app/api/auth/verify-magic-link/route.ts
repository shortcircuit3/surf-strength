import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLink, createSession } from "@/lib/auth";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "surf-session";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/workouts?error=invalid_link", APP_URL)
      );
    }

    // Verify the magic link
    const email = await verifyMagicLink(token);
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
    const sessionToken = await createSession(email, userAgent, ipAddress);
    if (!sessionToken) {
      return NextResponse.redirect(
        new URL("/workouts?error=session_failed", APP_URL)
      );
    }

    // Set session cookie
    const response = NextResponse.redirect(new URL("/workouts", APP_URL));
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verify magic link error:", error);
    return NextResponse.redirect(
      new URL("/workouts?error=verification_failed", APP_URL)
    );
  }
}
