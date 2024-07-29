import React, { createContext, useState, useEffect } from 'react';
import Cookies  from 'js-cookie'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      // Check if JWT token exists in cookies
      const uid = Cookies.get('uid');
      if (uid) {
        setIsAuthenticated(true);
      }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
          {children}
        </AuthContext.Provider>
      );
}