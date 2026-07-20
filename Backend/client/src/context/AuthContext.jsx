import { createContext, useState, useEffect, useContext } from "react";
import api from "../config/connect";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");

      setUser(res.data.data);
      setIsLogin(true);

      return res.data.data;
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLogin(false);
      return null;
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    getProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);