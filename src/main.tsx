import '@/styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from "@/components/app-routes.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
