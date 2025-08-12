"use client";
import { useEffect, useState } from "react";

interface Repository {
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export default function Repo() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepositories() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("API request failed");
        const json = await res.json();
        setRepos(json.repositories || []);
      } catch {
        setError("Failed to fetch repositories");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRepositories();
  }, []);

  if (isLoading) return <div>Loading repositories...</div>;

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border">
      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
          {error}
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Latest Repositories
      </h2>
      <ul className="space-y-3 max-h-60 overflow-y-auto">
        {repos.map((repo) => (
          <li key={repo.name} className="border-b last:border-none pb-2">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="text-sm text-gray-500">{repo.description}</p>
            )}
            {repo.primaryLanguage && (
              <span
                className="inline-block mt-1 px-2 py-0.5 text-xs rounded"
                style={{
                  backgroundColor: repo.primaryLanguage.color,
                  color: "white",
                }}
              >
                {repo.primaryLanguage.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
