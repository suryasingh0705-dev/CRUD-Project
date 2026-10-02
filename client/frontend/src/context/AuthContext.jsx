import { createContext, useEffect, useState } from "react";
import api from "../api/api.jsx";

export const MyStore = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

const getCurrentUser = async (token) => {
  try {
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(response.data.data.user);
  } catch (error) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/auth/refresh");

      const newAccessToken = response.data.data.accessToken;

      setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      setAccessToken(null);
      setUser(null);

      return null;
    }
  };

  const logout = async () => {
  try {
    await api.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    setAccessToken(null);
    setUser(null);
    setEditingProduct(null);
  }
};

 useEffect(() => {
  const initializeAuth = async () => {
    const justRegistered = sessionStorage.getItem("justRegistered");

    if (justRegistered) {
      sessionStorage.removeItem("justRegistered");
      setLoading(false);
      return;
    }

    if (!accessToken) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        setLoading(false);
      }

      return;
    }

    await getCurrentUser(accessToken);
  };

  initializeAuth();
}, [accessToken]);

  return (
    <MyStore.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        loading,
        setLoading,
        editingProduct,
        setEditingProduct,
        logout,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};

export default AuthContextProvider;
