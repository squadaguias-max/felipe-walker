import { renderToString } from "react-dom/server";
import { AppShell } from "./shared/layout/AppShell";
import { HomePage } from "./modules/home/pages/HomePage";
export function render(){return renderToString(<AppShell><HomePage/></AppShell>)}
