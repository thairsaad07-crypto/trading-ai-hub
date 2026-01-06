import { Bell, Settings } from "lucide-react";
import Clock from "./Clock";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-background border-b neon-border z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Side - Title & Clock */}
        <div className="hidden lg:flex items-center gap-6 flex-1">
          <div>
            <h2 className="text-lg font-bold text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              MARKET OVERVIEW
            </h2>
            <p className="text-xs text-muted-foreground">AI ANALYSIS MODULE: ACTIVE</p>
          </div>
          <Clock />
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notification Bell */}
          <button className="p-2 rounded hover:neon-glow transition-all duration-200 relative">
            <Bell size={20} className="text-cyan-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded hover:neon-glow transition-all duration-200">
            <Settings size={20} className="text-cyan-400" />
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded border-2 border-purple-400 flex items-center justify-center hover:neon-glow-purple transition-all duration-200 cursor-pointer">
            <span className="text-sm font-bold text-purple-400">AI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
