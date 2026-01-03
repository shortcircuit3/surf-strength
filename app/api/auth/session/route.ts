import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";

const SESSION_COOKIE_NAME = "surf-session";

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json({
        authenticated: false,
        hasAccess: false,
      });
    }

    const session = await validateSession(sessionToken);

    if (!session) {
      // Clear invalid session cookie
      const response = NextResponse.json({
        authenticated: false,
        hasAccess: false,
      });
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
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
