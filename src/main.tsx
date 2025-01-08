import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./errors/errorFallback.tsx";
import { Toaster } from "@/components/ui/sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
      <Toaster richColors position="top-center" />
    </ErrorBoundary>
  </StrictMode>
);
