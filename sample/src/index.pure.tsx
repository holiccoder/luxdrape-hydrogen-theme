import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import RoutesComponent from "./app.tsx";
import { CartProvider } from './contexts/cart-context';
import './index.css';

const MainApp = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <RoutesComponent />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(<MainApp />);
