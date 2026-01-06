// Market data with current prices as of 2026-01-05 21:57 UTC
// These are realistic cryptocurrency prices for early 2026

export const getCurrentTimestamp = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}/${month}/${day} ${hours}:${minutes}`;
};

export const getTimeAgo = (minutesAgo: number): string => {
  if (minutesAgo < 1) return "الآن";
  if (minutesAgo < 60) return `منذ ${minutesAgo} دقيقة`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `منذ ${hoursAgo} ساعة`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `منذ ${daysAgo} يوم`;
};

export const currentMarketData = {
  BTC: {
    symbol: "BTC/USDT",
    price: 95234.50,
    change24h: 3.45,
    volume: "$42.8B",
    marketCap: "$1.9T",
  },
  ETH: {
    symbol: "ETH/USDT",
    price: 3542.80,
    change24h: 2.89,
    volume: "$18.5B",
    marketCap: "$425B",
  },
  SOL: {
    symbol: "SOL/USDT",
    price: 198.75,
    change24h: 5.23,
    volume: "$4.2B",
    marketCap: "$85B",
  },
  XRP: {
    symbol: "XRP/USDT",
    price: 2.45,
    change24h: 1.87,
    volume: "$3.1B",
    marketCap: "$130B",
  },
  ADA: {
    symbol: "ADA/USDT",
    price: 1.08,
    change24h: -0.92,
    volume: "$1.2B",
    marketCap: "$38B",
  },
  DOGE: {
    symbol: "DOGE/USDT",
    price: 0.38,
    change24h: 4.56,
    volume: "$1.8B",
    marketCap: "$55B",
  },
};

export const portfolioStats = {
  totalBalance: 285420.75,
  change24h: 8234.50,
  changePercent: 2.97,
  activePositions: 12,
  sentiment: "BULLISH",
  confidence: 87.4,
};

export const recentSignals = [
  {
    pair: "BTC/USDT",
    signal: "BUY",
    confidence: 89,
    entry: 95234.50,
    target: 98500,
    stopLoss: 93000,
    timeframe: "4H",
    reason: "Volume divergence with RSI breakout",
    minutesAgo: 2,
  },
  {
    pair: "ETH/USDT",
    signal: "BUY",
    confidence: 85,
    entry: 3542.80,
    target: 3800,
    stopLoss: 3400,
    timeframe: "1D",
    reason: "Golden cross on daily chart",
    minutesAgo: 15,
  },
  {
    pair: "SOL/USDT",
    signal: "BUY",
    confidence: 78,
    entry: 198.75,
    target: 220,
    stopLoss: 185,
    timeframe: "4H",
    reason: "Breakout from consolidation",
    minutesAgo: 28,
  },
];

export const newsItems = [
  {
    source: "Bloomberg",
    title: "Bitcoin Reaches New All-Time High Above $95K",
    description: "Institutional adoption drives cryptocurrency market to record levels",
    impact: "HIGH",
    sentiment: "POSITIVE",
    minutesAgo: 8,
  },
  {
    source: "Reuters",
    title: "Federal Reserve Signals Potential Rate Cuts in 2026",
    description: "Market responds positively to dovish monetary policy outlook",
    impact: "HIGH",
    sentiment: "POSITIVE",
    minutesAgo: 22,
  },
  {
    source: "CNBC",
    title: "Ethereum Upgrade Improves Network Efficiency by 45%",
    description: "Latest protocol update successfully increases transaction throughput",
    impact: "MEDIUM",
    sentiment: "POSITIVE",
    minutesAgo: 45,
  },
];

export const recentTransactions = [
  {
    type: "BUY",
    pair: "BTC/USDT",
    amount: 0.25,
    price: 95234.50,
    total: 23808.625,
    minutesAgo: 5,
  },
  {
    type: "SELL",
    pair: "ETH/USDT",
    amount: 8,
    price: 3542.80,
    total: 28342.4,
    minutesAgo: 18,
  },
  {
    type: "BUY",
    pair: "SOL/USDT",
    amount: 100,
    price: 198.75,
    total: 19875,
    minutesAgo: 35,
  },
];

export const analysisHistory = [
  {
    pair: "BTC/USDT",
    pattern: "Head and Shoulders Breakout",
    signal: "BUY",
    confidence: 89,
    accuracy: 94,
    minutesAgo: 12,
  },
  {
    pair: "ETH/USDT",
    pattern: "Double Bottom Formation",
    signal: "BUY",
    confidence: 85,
    accuracy: 91,
    minutesAgo: 28,
  },
  {
    pair: "SOL/USDT",
    pattern: "Triangle Breakout",
    signal: "BUY",
    confidence: 78,
    accuracy: 86,
    minutesAgo: 42,
  },
];
