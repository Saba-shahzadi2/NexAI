import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logoutUser } from "../api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [loading, setLoading] = useState(true);

  // =========================================================
  // GET CURRENT LOGGED-IN USER
  // =========================================================

  const fetchCurrentUser = async () => {
    try {
      const data = await getMe();

      if (data.success) {
        setUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth verification error:", error);

      logoutUser();

      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CHECK AUTHENTICATION ON APP LOAD
  // =========================================================

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  const login = (authToken, authUser) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(authUser));

    setToken(authToken);
    setUser(authUser);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    logoutUser();

    setToken(null);
    setUser(null);
  };

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =========================================================
// USE AUTH
// =========================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
