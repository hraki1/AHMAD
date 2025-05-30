import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// استيراد ملفات التنسيق الإضافية
import "./assets/css/plugins.css";
import "./assets/css/style-min.css";
import "./assets/css/mainar.css";
import "./assets/css/responsive.css";

// مزودي السياق
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { AuthProvider } from "./Context/AuthContext";

// i18n
import i18n from "./i18n";
i18n.on("languageChanged", (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// إنشاء الجذر
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
