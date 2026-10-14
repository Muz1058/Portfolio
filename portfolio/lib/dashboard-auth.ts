import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const dashboardCookieName = "portfolio_dashboard_session";
const sessionDurationSeconds = 60 * 60 * 8;

function signature(expiresAt: string, password: string) {
  return createHmac("sha256", password).update(expiresAt).digest("base64url");
}

export function createDashboardSession(password: string) {
  const expiresAt = String(Date.now() + sessionDurationSeconds * 1000);
  return { value: `${expiresAt}.${signature(expiresAt, password)}`, maxAge: sessionDurationSeconds };
}

export function hasDashboardSession(request: NextRequest, password: string) {
  const cookie = request.cookies.get(dashboardCookieName)?.value;
  if (!cookie) return false;

  const [expiresAt, suppliedSignature] = cookie.split(".");
  if (!expiresAt || !suppliedSignature || Number(expiresAt) <= Date.now()) return false;

  const expectedSignature = signature(expiresAt, password);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/api/dashboard",
    maxAge,
  };
}

export function dashboardIsConfigured() {
  return Boolean(process.env.DASHBOARD_PASSWORD && process.env.GITHUB_TOKEN);
}
