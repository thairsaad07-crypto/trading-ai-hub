import { Upload, Zap, AlertCircle } from "lucide-react";
import { useState } from "react";

interface AnalysisResult {
  id: string;
  timestamp: string;
  pattern: string;
  confidence: number;
  signal: "BUY" | "SELL" | "HOLD";
  description: string;
}

export default function ImageAnalysis() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processImage(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      simulateAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        id: `ANALYSIS_${Date.now()}`,
        timestamp: new Date().toLocaleString("ar-SA"),
        pattern: "Head and Shoulders",
        confidence: 87,
        signal: "SELL",
        description:
          "تم اكتشاف نمط رأس وكتفين واضح. المؤشرات الفنية تشير إلى احتمالية انعكاس هبوطي. يُنصح بالبيع عند المقاومة الحالية.",
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          تحليل الصور
        </h1>
        <p className="text-muted-foreground mb-8">رفع صور الشارتات والحصول على تحليل فوري من الذكاء الاصطناعي</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`cyber-card p-8 text-center cursor-pointer transition-all ${
              isDragging ? "neon-glow border-cyan-400" : "neon-border"
            }`}
          >
            {uploadedImage ? (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded chart"
                  className="w-full h-64 object-contain rounded"
                />
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    setAnalysisResult(null);
                  }}
                  className="w-full px-4 py-2 rounded border border-border hover:neon-glow transition-all"
                >
                  تحميل صورة أخرى
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded border-2 border-cyan-400 flex items-center justify-center neon-glow">
                  <Upload size={32} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">اسحب الصورة هنا</h3>
                  <p className="text-sm text-muted-foreground mb-4">أو انقر لاختيار ملف</p>
                </div>
                <label className="cyber-button inline-block cursor-pointer">
                  اختر صورة
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="space-y-4">
            {isAnalyzing && (
              <div className="cyber-card p-6 neon-border-lime text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded border-2 border-lime-400 flex items-center justify-center animate-spin">
                  <Zap size={24} className="text-lime-400" />
                </div>
                <p className="text-lime-400 font-bold">جاري التحليل...</p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-4">
                {/* Signal Card */}
                <div
                  className={`cyber-card p-6 ${
                    analysisResult.signal === "BUY"
                      ? "neon-border-lime"
                      : analysisResult.signal === "SELL"
                      ? "border-red-500"
                      : "neon-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">الإشارة</h3>
                    <span
                      className={`px-4 py-2 rounded font-bold text-sm ${
                        analysisResult.signal === "BUY"
                          ? "bg-lime-400 text-background"
                          : analysisResult.signal === "SELL"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-400 text-background"
                      }`}
                    >
                      {analysisResult.signal === "BUY"
                        ? "شراء"
                        : analysisResult.signal === "SELL"
                        ? "بيع"
                        : "انتظر"}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{analysisResult.description}</p>
                </div>

                {/* Pattern Card */}
                <div className="cyber-card p-6 neon-border">
                  <h3 className="text-sm font-bold text-muted-foreground mb-2">النمط المكتشف</h3>
                  <p className="text-lg font-bold text-cyan-400 mb-4">{analysisResult.pattern}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground">مستوى الثقة</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 rounded bg-card border border-border overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                          style={{ width: `${analysisResult.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-cyan-400">{analysisResult.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="cyber-card p-4 border-yellow-600/50 bg-yellow-600/10">
                  <div className="flex gap-3">
                    <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-yellow-400 mb-1">إخلاء مسؤولية</p>
                      <p className="text-xs text-foreground">
                        هذا التحليل يقدم لأغراض تعليمية فقط. لا يشكل نصيحة استثمارية. يرجى استشارة متخصص مالي قبل اتخاذ أي قرار استثماري.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="mt-8 cyber-card p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            التحليلات الأخيرة
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded bg-card/50 border border-border hover:neon-glow transition-all cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-foreground">تحليل #{i}</p>
                  <p className="text-xs text-muted-foreground">منذ {i * 10} دقائق</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-lime-400">نمط مكتشف</span>
                  <span className="px-3 py-1 rounded bg-lime-400 text-background text-xs font-bold">شراء</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
