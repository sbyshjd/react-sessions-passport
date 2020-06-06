import React, { createContext, useState } from "react";
import api from "../services/api";
  export const AuthContext = createContext()
  export const AuthProvider = props => {

    const [user, setUser] = useState(null)

    const makeLogin = async(loginData)=>{
      let result = await api.login(loginData);
      setUser(result.data.user)
      console.log("inside context", result)
    }
  
    const logout = async()=>{
      let result = await api.logout();
      setUser(null)

    }
    return (
      <AuthContext.Provider value={{ user, makeLogin, logout}}>
        {props.children}
      </AuthContext.Provider>
    );
  };