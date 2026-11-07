import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext({ user: null, role: null });

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("truthnuke-user");
    if (stored) return JSON.parse(stored);
    return { user: null, role: null };
  });

  const [role, setRole] = useState(() => {
    const stored = localStorage.getItem("truthnuke-role");
    if (stored) return stored;
    return { user: null, role: null };
  });

  const login = (userId, userRole) => {
    setUser({ id: userId, name: getNameForRole(userRole), role: userRole });
    setRole(userRole);
    localStorage.setItem("truthnuke-user", JSON.stringify({ id: userId, name: getNameForRole(userRole), role: userRole }));
    localStorage.setItem("truthnuke-role", userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("truthnuke-user");
    localStorage.removeItem("truthnuke-role");
  };

  const getNameForRole = (role) => {
    switch (role) {
      case "creator":
        return "Alex Chen";
      case "manager":
        return "Sarah Johnson";
      case "reviewer":
        return "Michael Zhang";
      default:
        return "Guest";
    }
  };

  return (
    <AppContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContext;