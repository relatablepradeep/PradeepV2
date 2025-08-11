// app/api/github/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 });
    }

    // Fetch last 365 days (adjust -364 if you want inclusive day count)
    const today = new Date();
    const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const startDate = new Date(endDate);
    startDate.setUTCDate(endDate.getUTCDate() - 364); // last 365 days

    const from = startDate.toISOString().split("T")[0] + "T00:00:00Z";
    const to = endDate.toISOString().split("T")[0] + "T23:59:59Z";

    const query = `
      query {
        user(login: "relatablepradeep") {
          contributionsCollection(from: "${from}", to: "${to}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API error: ${res.status} ${text}`);
    }

    const json = await res.json();

    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    const days = weeks.flatMap((w: any) => w.contributionDays || []);

    return NextResponse.json(days);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
