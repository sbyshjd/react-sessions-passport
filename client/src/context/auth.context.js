import React, { createContext, useState } from 'react';
import api from '../services/api';
export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const makeLogin = async (loginData) => {
    let result = await api.login(loginData);
    setUser(result.data);
    console.log('inside context', result);
  };

  const googleLogin = async (loginData) => {
    let result = await api.googleLogin(loginData);
    console.log('inside google login', result);
    setUser(result);
  };

  const logout = async () => {
    let result = await api.logout();
    console.log('after logout', result);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, makeLogin, googleLogin, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
