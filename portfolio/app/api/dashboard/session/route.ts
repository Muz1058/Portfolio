import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, createDashboardSession, dashboardCookieName, dashboardIsConfigured, hasDashboardSession } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  return NextResponse.json({
    configured: dashboardIsConfigured(),
    authenticated: Boolean(password && hasDashboardSession(request, password)),
  });
}

export async function POST(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return NextResponse.json({ error: "Dashboard publishing is not configured." }, { status: 503 });

  let submittedPassword: unknown;
  try {
    submittedPassword = (await request.json() as { password?: unknown }).password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const suppliedBytes = typeof submittedPassword === "string" ? Buffer.from(submittedPassword) : Buffer.alloc(0);
  const expectedBytes = Buffer.from(password);
  const passwordMatches = suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
  if (!passwordMatches) {
    return NextResponse.json({ error: "Incorrect dashboard password." }, { status: 401 });
  }

  const session = createDashboardSession(password);
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(dashboardCookieName, session.value, cookieOptions(session.maxAge));
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(dashboardCookieName, "", cookieOptions(0));
  return response;
}
