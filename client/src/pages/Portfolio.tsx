import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";

interface Asset {
  symbol: string;
  amount: number;
  value: number;
  change: number;
  percentage: number;
}

interface Transaction {
  id: string;
  type: "BUY" | "SELL";
  pair: string;
  amount: number;
  price: number;
  total: number;
  date: string;
}

const assetsData: Asset[] = [
  { symbol: "BTC", amount: 0.5, value: 24145.75, change: 1.24, percentage: 45 },
  { symbol: "ETH", amount: 10, value: 28401.20, change: 2.15, percentage: 30 },
  { symbol: "SOL", amount: 250, value: 9862.50, change: -0.85, percentage: 15 },
  { symbol: "USDT", amount: 5000, value: 5000, change: 0, percentage: 10 },
];

const portfolioChartData = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 15 },
  { name: "USDT", value: 10 },
];

const performanceData = [
  { month: "Jan", value: 85000 },
  { month: "Feb", value: 92000 },
  { month: "Mar", value: 88000 },
  { month: "Apr", value: 105000 },
  { month: "May", value: 118000 },
  { month: "Jun", value: 124592 },
];

const transactionsData: Transaction[] = [
  {
    id: "1",
    type: "BUY",
    pair: "BTC/USDT",
    amount: 0.1,
    price: 48291.50,
    total: 4829.15,
    date: "2024-01-05",
  },
  {
    id: "2",
    type: "SELL",
    pair: "ETH/USDT",
    amount: 5,
    price: 2840.12,
    total: 14200.60,
    date: "2024-01-04",
  },
  {
    id: "3",
    type: "BUY",
    pair: "SOL/USDT",
    amount: 50,
    price: 98.45,
    total: 4922.50,
    date: "2024-01-03",
  },
];

const COLORS = ["#00d9ff", "#ff006e", "#39ff14", "#ff9500"];

export default function Portfolio() {
  const totalValue = assetsData.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assetsData.reduce((sum, asset) => sum + asset.change * asset.value / 100, 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          PORTFOLIO
        </h1>
        <p className="text-muted-foreground mb-8">Your investment portfolio and asset allocation</p>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="cyber-card p-6">
            <p className="text-xs font-bold text-muted-foreground mb-2">TOTAL VALUE</p>
            <h2 className="text-3xl font-bold text-cyan-400 data-text mb-2">${totalValue.toFixed(2)}</h2>
            <div className={`flex items-center gap-2 text-sm font-bold ${totalChange > 0 ? "text-lime-400" : "text-red-500"}`}>
              {totalChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {totalChange > 0 ? "+" : ""}{totalChange.toFixed(2)} ({totalChangePercent.toFixed(2)}%)
            </div>
          </div>

          <div className="cyber-card p-6">
            <p className="text-xs font-bold text-muted-foreground mb-2">24H CHANGE</p>
            <h2 className="text-3xl font-bold text-purple-400 data-text mb-2">${totalChange.toFixed(2)}</h2>
            <p className="text-xs text-muted-foreground">Based on current market prices</p>
          </div>

          <div className="cyber-card p-6">
            <p className="text-xs font-bold text-muted-foreground mb-2">ASSETS</p>
            <h2 className="text-3xl font-bold text-lime-400 data-text mb-2">{assetsData.length}</h2>
            <p className="text-xs text-muted-foreground">Diversified across {assetsData.length} assets</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Allocation Pie Chart */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ASSET ALLOCATION
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={portfolioChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Chart */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              PORTFOLIO PERFORMANCE
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2847" />
                <XAxis dataKey="month" stroke="#7a8fa0" />
                <YAxis stroke="#7a8fa0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f1629",
                    border: "1px solid #00d9ff",
                    borderRadius: "4px",
                  }}
                />
                <Bar dataKey="value" fill="#00d9ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assets Table */}
        <div className="cyber-card p-6 mb-8">
          <h3 className="text-lg font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            HOLDINGS
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-muted-foreground">ASSET</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">AMOUNT</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">VALUE</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">24H CHANGE</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">ALLOCATION</th>
                </tr>
              </thead>
              <tbody>
                {assetsData.map((asset) => (
                  <tr key={asset.symbol} className="border-b border-border hover:bg-card/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-cyan-400">{asset.symbol}</td>
                    <td className="text-right py-3 px-4 text-foreground">{asset.amount.toFixed(4)}</td>
                    <td className="text-right py-3 px-4 font-bold text-cyan-400 data-text">${asset.value.toFixed(2)}</td>
                    <td className={`text-right py-3 px-4 font-bold ${asset.change > 0 ? "text-lime-400" : "text-red-500"}`}>
                      {asset.change > 0 ? "+" : ""}{asset.change}%
                    </td>
                    <td className="text-right py-3 px-4 text-muted-foreground">{asset.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="cyber-card p-6">
          <h3 className="text-lg font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            RECENT TRANSACTIONS
          </h3>
          <div className="space-y-3">
            {transactionsData.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded bg-card/50 border border-border hover:border-cyan-400 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded flex items-center justify-center ${tx.type === "BUY" ? "bg-lime-400/10" : "bg-red-500/10"}`}>
                    {tx.type === "BUY" ? (
                      <Plus size={20} className="text-lime-400" />
                    ) : (
                      <Minus size={20} className="text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{tx.pair}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === "BUY" ? "text-lime-400" : "text-red-500"}`}>
                    {tx.type === "BUY" ? "+" : "-"}{tx.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">${tx.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
