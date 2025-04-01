import { Switch, Route } from "wouter";
import Dashboard from "@/pages/dashboard";
import Reports from "@/pages/reports";
import Departments from "@/pages/departments";
import Budgets from "@/pages/budgets";
import Performance from "@/pages/performance";
import SpendingAnalysis from "@/pages/spending-analysis";
import Comparison from "@/pages/comparison";
import WasteAnalysis from "@/pages/waste-analysis";
import Help from "@/pages/help";
import Documentation from "@/pages/documentation";
import NotFound from "@/pages/not-found";
import { AIAssistantProvider } from "@/components/ai-assistant";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/reports" component={Reports} />
      <Route path="/departments" component={Departments} />
      <Route path="/budgets" component={Budgets} />
      <Route path="/performance" component={Performance} />
      <Route path="/spending-analysis" component={SpendingAnalysis} />
      <Route path="/comparison" component={Comparison} />
      <Route path="/waste-analysis" component={WasteAnalysis} />
      <Route path="/help" component={Help} />
      <Route path="/documentation" component={Documentation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AIAssistantProvider>
      <Router />
    </AIAssistantProvider>
  );
}

export default App;
