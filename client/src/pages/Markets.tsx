import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Market {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  chart: Array<{ value: number }>;
}

const marketsData: Market[] = [
  {
    symbol: "BTC/USDT",
    price: 95234.50,
    change: 1.87,
    volume: "$42.8B",
    marketCap: "$1.9T",
    chart: [
      { value: 48100 },
      { value: 48200 },
      { value: 48050 },
      { value: 48300 },
      { value: 48291 },
    ],
  },
  {
    symbol: "ETH/USDT",
    price: 3542.80,
    change: 2.89,
    volume: "$18.5B",
    marketCap: "$425B",
    chart: [
      { value: 2800 },
      { value: 2820 },
      { value: 2810 },
      { value: 2835 },
      { value: 2840 },
    ],
  },
  {
    symbol: "SOL/USDT",
    price: 198.75,
    change: 5.23,
    volume: "$4.2B",
    marketCap: "$85B",
    chart: [
      { value: 99 },
      { value: 98.8 },
      { value: 98.5 },
      { value: 98.6 },
      { value: 198.75 },
    ],
  },
  {
    symbol: "XRP/USDT",
    price: 2.45,
    change: 1.87,
    volume: "$3.1B",
    marketCap: "$130B",
    chart: [
      { value: 0.60 },
      { value: 0.61 },
      { value: 0.60 },
      { value: 2.45 },
      { value: 2.45 },
    ],
  },
  {
    symbol: "ADA/USDT",
    price: 1.08,
    change: -1.23,
    volume: "$0.9B",
    marketCap: "$38B",
    chart: [
      { value: 1.10 },
      { value: 1.09 },
      { value: 1.08 },
      { value: 1.07 },
      { value: 1.08 },
    ],
  },
  {
    symbol: "DOGE/USDT",
    price: 0.38,
    change: 5.67,
    volume: "$0.8B",
    marketCap: "$62B",
    chart: [
      { value: 0.40 },
      { value: 0.41 },
      { value: 0.40 },
      { value: 0.38 },
      { value: 0.38 },
    ],
  },
];

export default function Markets() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkets = marketsData.filter((market) =>
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          GLOBAL MARKETS
        </h1>
        <p className="text-muted-foreground mb-8">Real-time cryptocurrency market data and analysis</p>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-3 text-cyan-400" size={20} />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded bg-card border border-border focus:outline-none focus:border-cyan-400 focus:neon-glow text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <div
              key={market.symbol}
              className="cyber-card p-6 hover:neon-glow transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-cyan-400 group-hover:text-purple-400 transition-colors">
                    {market.symbol}
                  </h3>
                  <p className="text-xs text-muted-foreground">Market Cap: {market.marketCap}</p>
                </div>
                <div className={`text-sm font-bold flex items-center gap-1 ${market.change > 0 ? "text-lime-400" : "text-red-500"}`}>
                  {market.change > 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {market.change > 0 ? "+" : ""}{market.change}%
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-cyan-400 data-text">
                  ${market.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Volume: {market.volume}</p>
              </div>

              {/* Chart */}
              <div className="h-16 -mx-2 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={market.chart}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={market.change > 0 ? "#39ff14" : "#ff0055"}
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-2 rounded border border-border hover:neon-glow transition-all text-sm font-bold text-cyan-400 hover:text-purple-400">
                VIEW DETAILS
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No markets found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-cyan-400 hover:text-purple-400 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
