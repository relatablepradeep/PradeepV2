export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing GITHUB_TOKEN" }), { status: 500 });
    }

    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 48); // last 49 days

    const query = `
      query {
        user(login: "relatablepradeep") {
          contributionsCollection(from: "${start.toISOString()}", to: "${today.toISOString()}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
          repositories(first: 3, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              description
              url
              updatedAt
              primaryLanguage {
                name
                color
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
      return new Response(JSON.stringify({ error: "Failed to fetch from GitHub API" }), { status: res.status });
    }

    const data = await res.json();

    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors }), { status: 500 });
    }

    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    const days = weeks.flatMap((w: any) => w.contributionDays);

    const repositories = data.data.user.repositories.nodes;

    return new Response(
      JSON.stringify({ contributions: days, repositories }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
}
