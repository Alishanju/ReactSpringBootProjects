import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./auth/AuthContext"; // adjust path as needed
import "./index.css"; // your global styles

// Create a query client instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide React Query globally */}
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
      {/* Provide Auth context globally */}
      <AuthProvider>
        <App />
      </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
