import { ExternalLink, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: string;
  source: string;
  title: string;
  description: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  category: string;
  timestamp: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
}

const newsData: NewsItem[] = [
  {
    id: "1",
    source: "Bloomberg",
    title: "SEC Approves New Bitcoin ETF Regulations",
    description:
      "The Securities and Exchange Commission has approved new regulations for Bitcoin ETF trading, potentially opening doors for institutional investors.",
    impact: "HIGH",
    category: "Regulation",
    timestamp: "5 minutes ago",
    sentiment: "POSITIVE",
  },
  {
    id: "2",
    source: "Reuters",
    title: "Global Markets Rally on Tech Earnings",
    description:
      "Major technology companies reported better-than-expected earnings, driving a rally across global markets including cryptocurrency.",
    impact: "MEDIUM",
    category: "Market",
    timestamp: "15 minutes ago",
    sentiment: "POSITIVE",
  },
  {
    id: "3",
    source: "CNBC",
    title: "Inflation Data Concerns Investors",
    description:
      "Latest inflation data shows higher-than-expected increases, raising concerns about future monetary policy decisions.",
    impact: "HIGH",
    category: "Economics",
    timestamp: "32 minutes ago",
    sentiment: "NEGATIVE",
  },
  {
    id: "4",
    source: "CoinDesk",
    title: "Ethereum Upgrade Improves Network Efficiency",
    description:
      "The latest Ethereum network upgrade has successfully increased transaction throughput by 40%, improving scalability.",
    impact: "MEDIUM",
    category: "Technology",
    timestamp: "1 hour ago",
    sentiment: "POSITIVE",
  },
  {
    id: "5",
    source: "The Block",
    title: "Major Exchange Faces Regulatory Investigation",
    description:
      "A leading cryptocurrency exchange is facing a regulatory investigation regarding compliance with anti-money laundering regulations.",
    impact: "HIGH",
    category: "Regulation",
    timestamp: "2 hours ago",
    sentiment: "NEGATIVE",
  },
  {
    id: "6",
    source: "Crypto Briefing",
    title: "DeFi Protocol Launches New Governance Token",
    description:
      "A major decentralized finance protocol has launched its governance token, allowing community members to participate in protocol decisions.",
    impact: "LOW",
    category: "DeFi",
    timestamp: "3 hours ago",
    sentiment: "NEUTRAL",
  },
];

export default function NewsFeed() {
  const [filter, setFilter] = useState<"ALL" | "HIGH" | "MEDIUM" | "LOW">("ALL");

  const filteredNews = newsData.filter((news) =>
    filter === "ALL" ? true : news.impact === filter
  );

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "text-red-500 bg-red-500/10";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-400/10";
      case "LOW":
        return "text-lime-400 bg-lime-400/10";
      default:
        return "text-cyan-400 bg-cyan-400/10";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "POSITIVE":
        return "text-lime-400";
      case "NEGATIVE":
        return "text-red-500";
      case "NEUTRAL":
        return "text-yellow-400";
      default:
        return "text-cyan-400";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          MARKET NEWS FEED
        </h1>
        <p className="text-muted-foreground mb-8">Latest news and updates affecting the markets</p>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["ALL", "HIGH", "MEDIUM", "LOW"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded font-bold text-sm transition-all ${
                filter === f
                  ? "bg-cyan-400 text-background neon-glow"
                  : "border border-border hover:border-cyan-400"
              }`}
            >
              {f === "ALL" ? "All News" : `${f} Impact`}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="cyber-card p-6 hover:neon-glow transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded border border-border flex items-center justify-center bg-card/50 group-hover:border-cyan-400 transition-colors">
                    <span className="text-xs font-bold text-cyan-400">{news.source.substring(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">{news.source}</p>
                    <p className="text-sm text-muted-foreground">{news.timestamp}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded font-bold text-xs ${getImpactColor(news.impact)}`}>
                  {news.impact}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-cyan-400 group-hover:text-purple-400 transition-colors mb-2">
                {news.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-foreground mb-4">{news.description}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${getSentimentColor(news.sentiment)} border-current/30`}>
                    {news.sentiment}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground px-2 py-1 rounded bg-card/50">
                    {news.category}
                  </span>
                </div>
                <button className="p-2 rounded hover:bg-card/50 transition-colors">
                  <ExternalLink size={16} className="text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news found with {filter} impact</p>
          </div>
        )}

        {/* Market Alert */}
        <div className="mt-8 cyber-card p-4 border-cyan-400/30 bg-cyan-400/5">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-cyan-400 mb-1">Market Alert System</p>
              <p className="text-xs text-foreground">
                This news feed is updated in real-time. Enable notifications to receive alerts for high-impact news that may affect your positions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
