import { NextRequest, NextResponse } from "next/server";
import { invalidateSession } from "@/lib/auth";

const SESSION_COOKIE_NAME = "surf-session";

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {
      // Invalidate server-side session
      await invalidateSession(sessionToken);
    }

    // Create response and clear cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
