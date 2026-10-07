import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { AppShell } from "./shared/layout/AppShell";
import { HomePage } from "./modules/home/pages/HomePage";
import { applyBrand } from "./core/theme/applyBrand";
import { appConfig } from "./config/app.config";
import { projectData } from "./config/project.data";
import "./styles/index.css";

applyBrand({
  ...appConfig.brand,
  colors: {
    ...appConfig.brand.colors,
    primary: projectData.theme.primary,
    primaryStrong: projectData.theme.primary,
    accent: projectData.theme.secondary,
  },
});
document.documentElement.style.setProperty("--gold", projectData.theme.primary);
document.documentElement.style.setProperty("--dark", projectData.theme.secondary);
document.documentElement.style.setProperty("--ink", projectData.theme.secondary);
document.documentElement.style.setProperty("--black", projectData.theme.secondary);

const root=document.getElementById("root");
const app=<StrictMode><AppShell><HomePage/></AppShell></StrictMode>;
if(root.hasChildNodes()) hydrateRoot(root,app); else createRoot(root).render(app);
