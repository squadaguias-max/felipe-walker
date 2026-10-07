import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppShell({ children }) { return <div className="min-h-screen"><Header /><main>{children}</main><Footer /></div>; }
