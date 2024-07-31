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

    const login = (uid) => {
      Cookies.set('uid', uid, { expires: 7, secure: true, sameSite: 'strict' })
      setIsAuthenticated(true);
    };

    const logout = () => {
      Cookies.remove('uid');
      setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}