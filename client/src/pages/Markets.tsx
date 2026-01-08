import { useBinancePrices } from '@/hooks/useBinancePrices';
import { TrendingUp, TrendingDown, RefreshCw, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function Markets() {
  const { prices, loading, error, lastUpdate } = useBinancePrices();
  const [searchTerm, setSearchTerm] = useState('');

  // تصفية الأسعار بناءً على البحث
  const filteredPrices = Object.values(prices).filter((p) =>
    p.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          GLOBAL MARKETS
        </h1>
        <p className="text-muted-foreground">Real-time cryptocurrency market data from Binance</p>
        {lastUpdate && (
          <p className="text-sm text-green-400 mt-2">
            Last Update: {new Date(lastUpdate).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-3 text-cyan-400" size={20} />
        <input
          type="text"
          placeholder="Search markets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded bg-card border-2 border-cyan-400/30 focus:outline-none focus:border-cyan-400 text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-cyan-400" />
            <p className="text-cyan-400">جاري تحميل البيانات الحية...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-400">خطأ: {error}</p>
        </div>
      )}

      {/* Markets Grid */}
      {!loading && filteredPrices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrices.map((market) => {
            const isPositive = parseFloat(market.change24h.toString()) >= 0;
            const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
            const changeIcon = isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;

            return (
              <div
                key={market.symbol}
                className="border-2 border-cyan-400/50 rounded-lg p-6 bg-slate-900/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 cursor-pointer group"
              >
                {/* Symbol */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors">
                    {market.symbol}
                  </h3>
                  <div className={`flex items-center gap-1 ${changeColor}`}>
                    {changeIcon}
                    <span className="text-sm">{market.change24h.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-3xl font-bold text-cyan-300">${market.price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Qty: {market.quantity.toFixed(8)}
                  </p>
                </div>

                {/* High/Low */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="bg-slate-800/50 rounded p-2">
                    <p className="text-muted-foreground text-xs">24h High</p>
                    <p className="text-green-400 font-semibold">${market.high24h.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2">
                    <p className="text-muted-foreground text-xs">24h Low</p>
                    <p className="text-red-400 font-semibold">${market.low24h.toFixed(2)}</p>
                  </div>
                </div>

                {/* Updated Time */}
                <p className="text-xs text-muted-foreground">
                  Updated: {new Date(market.timestamp).toLocaleTimeString()}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPrices.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {searchTerm ? `No markets found matching "${searchTerm}"` : 'No market data available'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-cyan-400 hover:text-purple-400 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
