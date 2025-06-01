import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./assets/css/plugins.css";
import "./assets/css/style-min.css";
import "./assets/css/mainar.css";
import "./assets/css/responsive.css";

import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { AuthProvider } from "./Context/AuthContext";

// i18n
import i18n from "./i18n";
import { SearchProvider } from "./Context/SearchContext";
i18n.on("languageChanged", (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// إنشاء الجذر
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
