import { BarChart3, TrendingUp, AlertCircle, Zap } from "lucide-react";
import StatCard from "@/components/StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Mock data for charts
const chartData = [
  { time: "00:00", price: 48100, volume: 1200 },
  { time: "04:00", price: 48200, volume: 1400 },
  { time: "08:00", price: 48050, volume: 1300 },
  { time: "12:00", price: 48300, volume: 1500 },
  { time: "16:00", price: 48291, volume: 1400 },
  { time: "20:00", price: 48400, volume: 1600 },
];

const signalsData = [
  { pair: "ETH/USDT", signal: "BUY", price: "$2,840.12", change: "+12.5%", time: "2m ago" },
  { pair: "SOL/USDT", signal: "SELL", price: "$98.45", change: "+5.2%", time: "15m ago" },
  { pair: "XRP/USDT", signal: "BUY", price: "$0.62", change: "+1.8%", time: "42m ago" },
];

const newsData = [
  { source: "Bloomberg", title: "SEC Approves New Bitcoin ETF Regulations" },
  { source: "Reuters", title: "Global Markets Rally on Tech Earnings" },
  { source: "CNBC", title: "Inflation Data Concerns Investors" },
];

const alertsData = [
  { type: "warning", title: "High Volatility Detected: BTC" },
  { type: "danger", title: "Stop Loss Triggered: ADA/USDT" },
  { type: "info", title: "New Resistance Level: 48,500" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Balance"
            value="$124,592.45"
            change={2.4}
            borderColor="cyan"
            icon={<BarChart3 size={24} />}
          />
          <StatCard
            title="AI Confidence"
            value="87.4%"
            change={5.1}
            borderColor="purple"
            icon={<Zap size={24} />}
          />
          <StatCard
            title="Active Trades"
            value="12"
            change={-2}
            borderColor="lime"
            icon={<TrendingUp size={24} />}
          />
          <StatCard
            title="Market Sentiment"
            value="BULLISH"
            borderColor="lime"
            unit="STRONG"
          />
        </div>

        {/* Main Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  BTC/USDT ANALYSIS
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Real-time price movement</p>
              </div>
              <div className="flex gap-2">
                {["15M", "1H", "4H", "1D"].map((tf) => (
                  <button
                    key={tf}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      tf === "1D"
                        ? "bg-yellow-400 text-background"
                        : "bg-card border border-border hover:border-cyan-400"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <h2 className="text-4xl font-bold text-cyan-400 data-text">$48,291.50</h2>
                <span className="text-sm text-lime-400">LONG SIGNAL</span>
                <span className="text-sm text-lime-400">+1.24% (24h)</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2847" />
                <XAxis dataKey="time" stroke="#7a8fa0" />
                <YAxis stroke="#7a8fa0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f1629",
                    border: "1px solid #00d9ff",
                    borderRadius: "4px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#00d9ff"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Advisor */}
          <div className="cyber-card p-6 neon-border-purple">
            <h3 className="text-lg font-bold text-purple-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              AI ADVISOR
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-foreground leading-relaxed">
                Based on current volatility, I recommend increasing stop-loss margins by 2.5%. Market sentiment is shifting towards risk-on assets.
              </p>
              <button className="w-full cyber-button">
                GENERATE NEW REPORT
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Prediction */}
          <div className="cyber-card p-6 neon-border-lime">
            <h3 className="text-lg font-bold text-lime-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              AI PREDICTION
            </h3>
            <p className="text-sm text-foreground mb-4">
              Strong buy signal detected based on volume divergence and RSI breakout. Target: $49,500.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">CONFIDENCE</span>
              <span className="text-2xl font-bold text-lime-400 data-text">85%</span>
            </div>
          </div>

          {/* Latest Signals */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              LATEST SIGNALS
            </h3>
            <div className="space-y-3">
              {signalsData.map((signal) => (
                <div key={signal.pair} className="flex items-center justify-between p-2 rounded bg-card/50 border border-border">
                  <div>
                    <p className="text-xs font-bold text-foreground">{signal.pair}</p>
                    <p className={`text-xs font-bold ${signal.signal === "BUY" ? "text-lime-400" : "text-red-500"}`}>
                      {signal.signal} @ {signal.price}
                    </p>
                  </div>
                  <span className={`text-xs font-bold ${signal.signal === "BUY" ? "text-lime-400" : "text-red-500"}`}>
                    {signal.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Market News */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              MARKET NEWS
            </h3>
            <div className="space-y-3">
              {newsData.map((news) => (
                <div key={news.title} className="pb-3 border-b border-border last:border-b-0">
                  <p className="text-xs font-bold text-purple-400 mb-1">{news.source}</p>
                  <p className="text-xs text-foreground line-clamp-2">{news.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="mt-6 cyber-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-red-500" />
            <h3 className="text-lg font-bold text-red-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              SYSTEM ALERTS
            </h3>
            <span className="ml-auto px-2 py-1 rounded bg-red-500 text-background text-xs font-bold">
              3 NEW
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alertsData.map((alert) => (
              <div key={alert.title} className="flex items-start gap-3 p-3 rounded bg-card/50 border border-border">
                <AlertCircle size={16} className={`mt-1 ${alert.type === "danger" ? "text-red-500" : alert.type === "warning" ? "text-yellow-400" : "text-cyan-400"}`} />
                <p className="text-xs text-foreground">{alert.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
