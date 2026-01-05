import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-400 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          404
        </h1>
        <p className="text-2xl font-bold text-foreground mb-2">الصفحة غير موجودة</p>
        <p className="text-muted-foreground mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم حذفها.</p>
        <Link href="/">
          <a className="cyber-button inline-flex items-center gap-2">
            <Home size={20} />
            العودة إلى الرئيسية
          </a>
        </Link>
      </div>
    </div>
  );
}
