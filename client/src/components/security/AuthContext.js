import React, { useContext, useState } from 'react'
import { createContext } from "react";

//to Enable and Disable NAV items like(login,logout buttons)
//create a context 
export const AuthContext = createContext()

//CREATE NEW HOOK
export const useAuth =() => useContext(AuthContext)
//put some state in the context
//share the created context with othert components

//In App.jsx we wrap all from <AuthProvider> so inside things are Children
export default function AuthProvider({children}) {

    //put some state in context
    // const [number,setNumber] = useState(10)
    const [isAuthenticated, setAuthenticated] = useState(false)

    //or const valueToBeShared = {number, isAuthenticated, setAuthenticated}

    // setInterval(()=>setNumber(number+1),10000) //increase every 10sec

    function login(username, password){
        if(username==='Thisara' && password==='dummy'){
           setAuthenticated(true)
           return true

        }else{
            setAuthenticated(false)
            return false
        }
    }
    function logout(){
        setAuthenticated(false)
    }
  return (
    //so this (number,..) or valueToBeShared is accessible from other components
    <AuthContext.Provider value={{/*number,*/ isAuthenticated, setAuthenticated, login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

