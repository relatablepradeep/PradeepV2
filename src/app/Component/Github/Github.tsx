"use client";
import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function GithubStreak() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [streak, setStreak] = useState(0);
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate sample data for demonstration
  const generateSampleData = () => {
    const days: ContributionDay[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const contributionCount = Math.floor(Math.random() * 8); // 0-7 contributions
      
      days.push({
        date: date.toISOString().split('T')[0],
        contributionCount
      });
    }
    return days;
  };

  // Store data temporarily
  const storeDataTemporarily = (data: ContributionDay[]) => {
    const storageData = {
      data,
      timestamp: Date.now(),
      expiresIn: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
    };
    
    // In a real app, you'd use a proper storage mechanism
    // For demo purposes, we'll use a simple in-memory storage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('github_streak_backup', JSON.stringify(storageData));
      } catch (e) {
        console.warn('Could not store backup data');
      }
    }
  };

  // Retrieve temporary data
  const getStoredData = (): ContributionDay[] | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem('github_streak_backup');
      if (!stored) return null;
      
      const parsedData = JSON.parse(stored);
      const now = Date.now();
      
      // Check if data is still valid (within 2 days)
      if (now - parsedData.timestamp < parsedData.expiresIn) {
        return parsedData.data;
      } else {
        localStorage.removeItem('github_streak_backup');
        return null;
      }
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to fetch from API first
        const res = await fetch("/api/Github");
        
        if (!res.ok) {
          throw new Error('API request failed');
        }
        
        const days: ContributionDay[] = await res.json();
        setData(days);
        storeDataTemporarily(days);
        
      } catch (error) {
        console.warn('API failed, trying backup data:', error);
        
        // Try to get stored data
        const storedData = getStoredData();
        
        if (storedData) {
          setData(storedData);
          setError('Using cached data (API unavailable)');
        } else {
          // Use sample data as last resort
          const sampleData = generateSampleData();
          setData(sampleData);
          setError('Using sample data (API and cache unavailable)');
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Calculate streak whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      let count = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].contributionCount > 0) {
          count++;
        } else {
          break;
        }
      }
      setStreak(count);
    }
  }, [data]);

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-200 hover:bg-gray-300";
    if (count < 3) return "bg-green-200 hover:bg-green-300";
    if (count < 6) return "bg-green-400 hover:bg-green-500";
    if (count < 10) return "bg-green-600 hover:bg-green-700";
    return "bg-green-800 hover:bg-green-900";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="w-1/2 min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 49 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/2 min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 relative">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            🔥 <span className="text-orange-600">{streak}</span> Day Streak
          </h1>
          <p className="text-gray-600">Keep up the momentum!</p>
          {error && (
            <div className="mt-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdayNames.map((day) => (
            <div key={day} className="text-center font-medium text-sm text-gray-500 h-6 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-xl shadow-sm border">
          {data.map((day, index) => (
            <div
              key={day.date}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  date: `${formatDate(day.date)} - ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 8,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
              className={`w-8 h-8 rounded-md cursor-pointer transition-all duration-200 border border-gray-100 ${getContributionColor(day.contributionCount)} transform hover:scale-110 hover:shadow-sm`}
              title="" // Remove default title to avoid conflict with custom tooltip
            ></div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{data.reduce((sum, day) => sum + day.contributionCount, 0)}</div>
            <div className="text-sm text-gray-500">Total contributions this year</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{data.filter(day => day.contributionCount > 0).length}</div>
            <div className="text-sm text-gray-500">Active days this year</div>
          </div>
        </div>
      </div>

      {/* Enhanced Tooltip - positioned next to cursor */}
      {tooltip && (
        <div
          className="fixed bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl pointer-events-none z-50 border border-gray-700"
          style={{
            left: tooltip.x + 10, // Small offset to the right of cursor
            top: tooltip.y - 40,   // Above the cursor
            transform: 'translateX(0)', // Remove centering transform
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div className="relative">
            {tooltip.date}
            {/* Small arrow pointing to the contribution square */}
            <div 
              className="absolute w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700"
              style={{
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%) translateY(-50%)'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Add fade-in animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}