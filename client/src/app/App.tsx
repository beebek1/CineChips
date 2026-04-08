import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../shared/components/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <div className="bg-[#080808] min-h-screen text-white">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;