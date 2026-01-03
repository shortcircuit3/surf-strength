import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/lib/auth";

const SESSION_COOKIE_NAME = "surf-session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json({
        authenticated: false,
        hasAccess: false,
      });
    }

    const session = await validateSession(sessionToken);

    if (!session) {
      // Clear invalid session cookie
      cookieStore.delete(SESSION_COOKIE_NAME);
      return NextResponse.json({
        authenticated: false,
        hasAccess: false,
      });
    }

    return NextResponse.json({
      authenticated: true,
      hasAccess: true,
      email: session.email,
      paidAt: session.paidAt,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Failed to check session" },
      { status: 500 }
    );
  }
}
