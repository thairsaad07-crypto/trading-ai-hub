import { Link } from "wouter";
import { BarChart3, TrendingUp, Newspaper, Wallet, Settings, Image, History, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: <BarChart3 size={20} /> },
  { label: "Markets", href: "/markets", icon: <TrendingUp size={20} /> },
  { label: "AI Signals", href: "/signals", icon: <TrendingUp size={20} /> },
  { label: "News Feed", href: "/news", icon: <Newspaper size={20} /> },
  { label: "Portfolio", href: "/portfolio", icon: <Wallet size={20} /> },
  { label: "تحليل الصور", href: "/image-analysis", icon: <Image size={20} /> },
  { label: "سجل التحليلات", href: "/analysis-history", icon: <History size={20} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded neon-border hover:neon-glow"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-background border-r neon-border transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded border-2 border-cyan-400 flex items-center justify-center neon-glow">
              <span className="text-xs font-bold text-cyan-400">AI</span>
            </div>
            <h1 className="text-lg font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              TRADING.AI
            </h1>
          </div>

          {/* System Status */}
          <div className="mb-8 p-3 rounded neon-border bg-card/50">
            <p className="text-xs text-muted-foreground mb-1">SYSTEM STATUS</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
              <span className="text-sm font-bold text-lime-400">OPTIMAL</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-all duration-200 hover:neon-glow hover:bg-card/50 group"
                >
                  <span className="text-cyan-400 group-hover:text-purple-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-foreground group-hover:text-cyan-400 transition-colors">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto text-xs px-2 py-1 rounded bg-lime-400 text-background font-bold">
                      {item.badge}
                    </span>
                  )}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
