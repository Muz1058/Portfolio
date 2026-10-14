import { NextRequest, NextResponse } from "next/server";
import { dashboardIsConfigured, hasDashboardSession } from "@/lib/dashboard-auth";

export const runtime = "nodejs";
export const maxDuration = 30;

const contentPath = "portfolio/data/content.json";
const maxContentBytes = 1024 * 1024;

function isPortfolioContent(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const content = value as Record<string, unknown>;
  const collections = ["projects", "experience", "certifications", "skills", "services"];
  return collections.every((key) => Array.isArray(content[key]) && (content[key] as unknown[]).every(
    (entry) => Boolean(entry && typeof entry === "object" && !Array.isArray(entry)),
  )) && Array.isArray(content.currentlyLearning) && content.currentlyLearning.every((item) => typeof item === "string") &&
    Boolean(content.settings && typeof content.settings === "object" && !Array.isArray(content.settings));
}

export async function POST(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  const token = process.env.GITHUB_TOKEN;
  if (!dashboardIsConfigured() || !password || !token) {
    return NextResponse.json({ error: "Set DASHBOARD_PASSWORD and GITHUB_TOKEN in the app environment first." }, { status: 503 });
  }
  if (!hasDashboardSession(request, password)) {
    return NextResponse.json({ error: "Sign in to the dashboard before publishing." }, { status: 401 });
  }

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return NextResponse.json({ error: "Cross-origin publish requests are not allowed." }, { status: 403 });
  }

  const ownerAndRepo = process.env.GITHUB_REPOSITORY ?? "Muz1058/Portfolio";
  const branch = process.env.GITHUB_BRANCH ?? "main";
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(ownerAndRepo) || !/^[A-Za-z0-9_.\/-]+$/.test(branch)) {
    return NextResponse.json({ error: "GITHUB_REPOSITORY or GITHUB_BRANCH is invalid." }, { status: 500 });
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > maxContentBytes) {
    return NextResponse.json({ error: "Portfolio content is too large to publish." }, { status: 413 });
  }

  let content: unknown;
  try {
    content = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "The portfolio content is not valid JSON." }, { status: 400 });
  }
  if (!isPortfolioContent(content)) {
    return NextResponse.json({ error: "The JSON is missing required portfolio content collections." }, { status: 400 });
  }

  const apiUrl = `https://api.github.com/repos/${ownerAndRepo}/contents/${contentPath}`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
    "User-Agent": "Muzaffar-Ali-Portfolio-Dashboard",
  };

  try {
    const currentResponse = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, { headers, cache: "no-store" });
    let sha: string | undefined;
    if (currentResponse.ok) {
      const currentFile = await currentResponse.json() as { sha?: string };
      sha = currentFile.sha;
    } else if (currentResponse.status !== 404) {
      const details = await currentResponse.text();
      return NextResponse.json({ error: `GitHub could not read the target file (${currentResponse.status}): ${details.slice(0, 300)}` }, { status: 502 });
    }

    const body: { message: string; content: string; branch: string; sha?: string } = {
      message: "Update portfolio content from dashboard",
      content: Buffer.from(`${JSON.stringify(content, null, 2)}\n`, "utf8").toString("base64"),
      branch,
    };
    if (sha) body.sha = sha;

    const updateResponse = await fetch(apiUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = await updateResponse.json() as { message?: string; commit?: { html_url?: string; sha?: string } };
    if (!updateResponse.ok) {
      const conflict = updateResponse.status === 409 || updateResponse.status === 422;
      return NextResponse.json({ error: conflict ? "GitHub changed this file at the same time. Reload the latest content and try again." : result.message ?? "GitHub rejected the content update." }, { status: conflict ? 409 : 502 });
    }

    return NextResponse.json({
      message: "Portfolio content pushed to GitHub.",
      commitUrl: result.commit?.html_url,
      commitSha: result.commit?.sha,
      branch,
    });
  } catch {
    return NextResponse.json({ error: "Could not reach GitHub. Check the server network and try again." }, { status: 502 });
  }
}
