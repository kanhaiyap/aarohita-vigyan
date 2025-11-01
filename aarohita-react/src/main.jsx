import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; 
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// TEMP: remove HelmetProvider while debugging to avoid any peer-dep issues

const rootEl = document.getElementById("root");
if (!rootEl) {
  // If this logs, your index.html doesn't have #root
  console.error("No #root element found in index.html");
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
    <HelmetProvider>
      <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
