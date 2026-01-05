import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Markets from "@/pages/Markets";
import AISignals from "@/pages/AISignals";
import NewsFeed from "@/pages/NewsFeed";
import Portfolio from "@/pages/Portfolio";
import ImageAnalysis from "@/pages/ImageAnalysis";
import AnalysisHistory from "@/pages/AnalysisHistory";
import Settings from "@/pages/Settings";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/markets"} component={Markets} />
      <Route path={"/signals"} component={AISignals} />
      <Route path={"/news"} component={NewsFeed} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/image-analysis"} component={ImageAnalysis} />
      <Route path={"/analysis-history"} component={AnalysisHistory} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 lg:ml-64">
              <Header />
              <Router />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
