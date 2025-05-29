import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Pages/API/ApiConfig";
import { set } from "react-hook-form";
const BASE_URL = `${baseUrl}/api`;

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
  error: "",
  user: {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const isAuthenticated = !!localStorage.getItem("token");

  const login = (newToken, newUserId, user) => {
    setToken(newToken);
    setUserId(newUserId);
    setUser(user);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    let userData = null;
    try {
      const raw = localStorage.getItem("userData");
      if (raw && raw !== "undefined") {
        userData = JSON.parse(raw);
      }
    } catch (err) {
      console.error("Failed to parse userData from localStorage", err);
    }

    const verifyToken = async () => {
      let res;
      try {
        res = await fetch(`${BASE_URL}/auth/verify-token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON");
        }

        const data = await res.json();

        if (res.ok && data.valid) {
          console.log(res.status);
          login(storedToken, data.user.id.toString(), data.user);
        } else if (res.status === 401 && !data.valid) {
          console.log(res.status);
          logout();
        } else {
          setError("Server Faild Please try Another Time");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setUser(userData);
        setError("Server Faild Please try Another Time");
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
        isAuthenticated,
        token,
        userId,
        login,
        logout,
        isLoading,
        user,
        setUser,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
