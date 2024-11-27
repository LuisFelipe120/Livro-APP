import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  useEffect(() => {
    AsyncStorage.getItem('localToken').then((token) =>
    {
        if(token)
            setIsAuthenticated(true)
        setIsAuthenticated(false)
    }
    ).catch((error) =>
        setIsAuthenticated(false)
    ).finally()
  }, []);
 
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export default AuthContext;