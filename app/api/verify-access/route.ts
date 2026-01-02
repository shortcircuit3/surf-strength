import { NextRequest, NextResponse } from "next/server";
import { hasPaidAccess, getPaidUser } from "@/lib/payments";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const hasAccess = await hasPaidAccess(email);

    if (hasAccess) {
      const user = await getPaidUser(email);
      return NextResponse.json({
        hasAccess: true,
        email: email.toLowerCase(),
        paidAt: user?.paid_at,
      });
    }

    return NextResponse.json({
      hasAccess: false,
      email: email.toLowerCase(),
    });
  } catch (error) {
    console.error("Verify access error:", error);
    return NextResponse.json(
      { error: "Failed to verify access" },
      { status: 500 }
    );
  }
}

