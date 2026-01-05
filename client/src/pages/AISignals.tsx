import { TrendingUp, TrendingDown, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";

interface Signal {
  id: string;
  pair: string;
  signal: "BUY" | "SELL" | "HOLD";
  confidence: number;
  entry: number;
  target: number;
  stopLoss: number;
  timeframe: string;
  reason: string;
  timestamp: string;
}

const signalsData: Signal[] = [
  {
    id: "1",
    pair: "BTC/USDT",
    signal: "BUY",
    confidence: 87,
    entry: 48291.50,
    target: 49500,
    stopLoss: 47800,
    timeframe: "4H",
    reason: "Volume divergence and RSI breakout detected",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    pair: "ETH/USDT",
    signal: "BUY",
    confidence: 82,
    entry: 2840.12,
    target: 3100,
    stopLoss: 2700,
    timeframe: "1D",
    reason: "Golden cross on daily chart with bullish momentum",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    pair: "SOL/USDT",
    signal: "SELL",
    confidence: 75,
    entry: 98.45,
    target: 92,
    stopLoss: 102,
    timeframe: "4H",
    reason: "Resistance level rejection and bearish divergence",
    timestamp: "42 minutes ago",
  },
  {
    id: "4",
    pair: "XRP/USDT",
    signal: "BUY",
    confidence: 79,
    entry: 0.62,
    target: 0.72,
    stopLoss: 0.58,
    timeframe: "1H",
    reason: "Breakout from consolidation pattern",
    timestamp: "1 hour ago",
  },
  {
    id: "5",
    pair: "ADA/USDT",
    signal: "HOLD",
    confidence: 68,
    entry: 1.08,
    target: 1.15,
    stopLoss: 1.00,
    timeframe: "4H",
    reason: "Waiting for confirmation at key support level",
    timestamp: "2 hours ago",
  },
  {
    id: "6",
    pair: "DOGE/USDT",
    signal: "BUY",
    confidence: 71,
    entry: 0.42,
    target: 0.48,
    stopLoss: 0.38,
    timeframe: "1D",
    reason: "Bullish trend continuation with strong volume",
    timestamp: "3 hours ago",
  },
];

export default function AISignals() {
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL" | "HOLD">("ALL");

  const filteredSignals = signalsData.filter((signal) =>
    filter === "ALL" ? true : signal.signal === filter
  );

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "lime";
      case "SELL":
        return "red";
      case "HOLD":
        return "yellow";
      default:
        return "cyan";
    }
  };

  const getSignalBg = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-lime-400/10 border-lime-400/30";
      case "SELL":
        return "bg-red-500/10 border-red-500/30";
      case "HOLD":
        return "bg-yellow-400/10 border-yellow-400/30";
      default:
        return "bg-cyan-400/10 border-cyan-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          AI SIGNALS
        </h1>
        <p className="text-muted-foreground mb-8">Real-time trading signals powered by advanced AI analysis</p>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["ALL", "BUY", "SELL", "HOLD"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded font-bold text-sm transition-all ${
                filter === f
                  ? "bg-cyan-400 text-background neon-glow"
                  : "border border-border hover:border-cyan-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Signals List */}
        <div className="space-y-4">
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              className={`cyber-card p-6 border ${getSignalBg(signal.signal)} hover:neon-glow transition-all cursor-pointer group`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Signal Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors mb-1">
                        {signal.pair}
                      </h3>
                      <p className="text-xs text-muted-foreground">{signal.timeframe} Timeframe</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded font-bold text-sm text-white ${
                        signal.signal === "BUY"
                          ? "bg-lime-400"
                          : signal.signal === "SELL"
                          ? "bg-red-500"
                          : "bg-yellow-400"
                      }`}
                    >
                      {signal.signal}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-3">{signal.reason}</p>
                  <p className="text-xs text-muted-foreground">{signal.timestamp}</p>
                </div>

                {/* Price Levels */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">ENTRY</p>
                    <p className="text-lg font-bold text-cyan-400 data-text">${signal.entry.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">TARGET</p>
                    <p className="text-lg font-bold text-lime-400 data-text">${signal.target.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">STOP LOSS</p>
                    <p className="text-lg font-bold text-red-500 data-text">${signal.stopLoss.toFixed(2)}</p>
                  </div>
                </div>

                {/* Confidence & Risk */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-2">CONFIDENCE</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded bg-card border border-border overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-cyan-400">{signal.confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">RISK/REWARD</p>
                    <p className="text-sm font-bold text-lime-400">
                      1:{((signal.target - signal.entry) / (signal.entry - signal.stopLoss)).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end">
                  <button className="cyber-button flex items-center gap-2">
                    <Zap size={16} />
                    EXECUTE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 cyber-card p-4 border-yellow-600/50 bg-yellow-600/10">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-yellow-400 mb-1">Important Disclaimer</p>
              <p className="text-xs text-foreground">
                These signals are generated by AI analysis and are for educational purposes only. They do not constitute financial advice. Always conduct your own research and consult with a financial advisor before making investment decisions. Trading involves substantial risk of loss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
