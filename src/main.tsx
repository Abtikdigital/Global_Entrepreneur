import { createRoot } from "react-dom/client";
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { DialogProvider } from "./contexts/DialogContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <section >
    <BrowserRouter>
      <DialogProvider>
        <App />
      </DialogProvider>
    </BrowserRouter>
  </section>
);
