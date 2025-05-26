import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Pages/API/ApiConfig";
import { data } from "react-router-dom";
const BASE_URL = `${baseUrl}/api`;

// واجهة القيم داخل الـ context

// إنشاء السياق بقيم مبدئية
export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

// مزود السياق (المكون الرئيسي)
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  // تحقق من صلاحية التوكن عند أول تحميل للتطبيق
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    const verifyToken = async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/verify-token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        // فحص هل الرد HTML بدل JSON (لمنع الخطأ SyntaxError)
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON");
        }

        const data = await res.json();

        if (res.ok && data.valid) {
          // لو الرد فيه valid = true، نسجل الدخول
          login(storedToken, data.user.id.toString());
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    if (storedToken && storedUserId) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        userId,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
