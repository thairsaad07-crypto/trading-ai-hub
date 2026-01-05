import { Download, Eye, Trash2, Calendar } from "lucide-react";
import { useState } from "react";

interface Analysis {
  id: string;
  date: string;
  pair: string;
  pattern: string;
  signal: "BUY" | "SELL" | "HOLD";
  confidence: number;
  accuracy: number;
  thumbnail: string;
}

const analysisHistory: Analysis[] = [
  {
    id: "1",
    date: "2024-01-05 14:32",
    pair: "BTC/USDT",
    pattern: "Head and Shoulders",
    signal: "SELL",
    confidence: 87,
    accuracy: 92,
    thumbnail: "📊",
  },
  {
    id: "2",
    date: "2024-01-05 12:15",
    pair: "ETH/USDT",
    pattern: "Double Bottom",
    signal: "BUY",
    confidence: 82,
    accuracy: 88,
    thumbnail: "📈",
  },
  {
    id: "3",
    date: "2024-01-05 10:45",
    pair: "SOL/USDT",
    pattern: "Triangle Breakout",
    signal: "BUY",
    confidence: 75,
    accuracy: 80,
    thumbnail: "📊",
  },
  {
    id: "4",
    date: "2024-01-04 16:20",
    pair: "XRP/USDT",
    pattern: "Ascending Triangle",
    signal: "BUY",
    confidence: 79,
    accuracy: 85,
    thumbnail: "📈",
  },
  {
    id: "5",
    date: "2024-01-04 13:50",
    pair: "ADA/USDT",
    pattern: "Wedge Pattern",
    signal: "HOLD",
    confidence: 68,
    accuracy: 72,
    thumbnail: "📊",
  },
  {
    id: "6",
    date: "2024-01-04 11:30",
    pair: "DOGE/USDT",
    pattern: "Cup and Handle",
    signal: "BUY",
    confidence: 71,
    accuracy: 78,
    thumbnail: "📈",
  },
];

export default function AnalysisHistory() {
  const [sortBy, setSortBy] = useState<"date" | "confidence" | "accuracy">("date");
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  const sortedAnalysis = [...analysisHistory].sort((a, b) => {
    switch (sortBy) {
      case "confidence":
        return b.confidence - a.confidence;
      case "accuracy":
        return b.accuracy - a.accuracy;
      case "date":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-lime-400 text-background";
      case "SELL":
        return "bg-red-500 text-white";
      case "HOLD":
        return "bg-yellow-400 text-background";
      default:
        return "bg-cyan-400 text-background";
    }
  };

  const getSignalLabel = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "شراء";
      case "SELL":
        return "بيع";
      case "HOLD":
        return "انتظر";
      default:
        return signal;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          سجل التحليلات
        </h1>
        <p className="text-muted-foreground mb-8">عرض جميع التحليلات السابقة والإحصائيات</p>

        {/* Sort Controls */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["date", "confidence", "accuracy"].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort as any)}
              className={`px-4 py-2 rounded font-bold text-sm transition-all ${
                sortBy === sort
                  ? "bg-cyan-400 text-background neon-glow"
                  : "border border-border hover:border-cyan-400"
              }`}
            >
              {sort === "date"
                ? "التاريخ"
                : sort === "confidence"
                ? "الثقة"
                : "الدقة"}
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="cyber-card p-4">
            <p className="text-xs font-bold text-muted-foreground mb-1">إجمالي التحليلات</p>
            <p className="text-2xl font-bold text-cyan-400 data-text">{analysisHistory.length}</p>
          </div>
          <div className="cyber-card p-4">
            <p className="text-xs font-bold text-muted-foreground mb-1">متوسط الثقة</p>
            <p className="text-2xl font-bold text-purple-400 data-text">
              {(analysisHistory.reduce((sum, a) => sum + a.confidence, 0) / analysisHistory.length).toFixed(1)}%
            </p>
          </div>
          <div className="cyber-card p-4">
            <p className="text-xs font-bold text-muted-foreground mb-1">متوسط الدقة</p>
            <p className="text-2xl font-bold text-lime-400 data-text">
              {(analysisHistory.reduce((sum, a) => sum + a.accuracy, 0) / analysisHistory.length).toFixed(1)}%
            </p>
          </div>
          <div className="cyber-card p-4">
            <p className="text-xs font-bold text-muted-foreground mb-1">إشارات شراء</p>
            <p className="text-2xl font-bold text-lime-400 data-text">
              {analysisHistory.filter((a) => a.signal === "BUY").length}
            </p>
          </div>
        </div>

        {/* Analysis List */}
        <div className="space-y-4">
          {sortedAnalysis.map((analysis) => (
            <div
              key={analysis.id}
              className="cyber-card p-6 hover:neon-glow transition-all cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                {/* Thumbnail & Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded border border-border flex items-center justify-center bg-card/50 text-2xl">
                      {analysis.thumbnail}
                    </div>
                    <div>
                      <h3 className="font-bold text-cyan-400 group-hover:text-purple-400 transition-colors">
                        {analysis.pair}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar size={12} />
                        {analysis.date}
                      </p>
                      <p className="text-xs text-foreground mt-1">{analysis.pattern}</p>
                    </div>
                  </div>
                </div>

                {/* Signal */}
                <div className="flex items-center justify-center">
                  <span className={`px-3 py-1 rounded font-bold text-sm ${getSignalColor(analysis.signal)}`}>
                    {getSignalLabel(analysis.signal)}
                  </span>
                </div>

                {/* Confidence */}
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-muted-foreground mb-1">الثقة</p>
                  <p className="text-lg font-bold text-cyan-400 data-text">{analysis.confidence}%</p>
                </div>

                {/* Accuracy */}
                <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-muted-foreground mb-1">الدقة</p>
                  <p className="text-lg font-bold text-lime-400 data-text">{analysis.accuracy}%</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedAnalysis(analysis)}
                    className="p-2 rounded hover:bg-card/50 transition-colors"
                    title="عرض التفاصيل"
                  >
                    <Eye size={16} className="text-cyan-400" />
                  </button>
                  <button className="p-2 rounded hover:bg-card/50 transition-colors" title="تحميل">
                    <Download size={16} className="text-cyan-400" />
                  </button>
                  <button className="p-2 rounded hover:bg-card/50 transition-colors" title="حذف">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedAnalysis && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="cyber-card p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">{selectedAnalysis.pair}</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-muted-foreground mb-1">النمط</p>
                  <p className="text-foreground">{selectedAnalysis.pattern}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground mb-1">التاريخ</p>
                  <p className="text-foreground">{selectedAnalysis.date}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">الإشارة</p>
                    <span className={`px-2 py-1 rounded font-bold text-xs ${getSignalColor(selectedAnalysis.signal)}`}>
                      {getSignalLabel(selectedAnalysis.signal)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">الثقة</p>
                    <p className="text-sm font-bold text-cyan-400">{selectedAnalysis.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">الدقة</p>
                    <p className="text-sm font-bold text-lime-400">{selectedAnalysis.accuracy}%</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="w-full px-4 py-2 rounded border border-border hover:neon-glow transition-all font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
