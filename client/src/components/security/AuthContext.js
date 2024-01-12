import React, { useContext, useState } from 'react'
import { createContext } from "react";
import { executeBasicAuthenticationService, executeJwtAuthenticationService } from '../api/AuthenticationApiService';
import { apiClient } from '../api/ApiClient';

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
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    //or const valueToBeShared = {number, isAuthenticated, setAuthenticated}

    // setInterval(()=>setNumber(number+1),10000) //increase every 10sec

    // function login(username, password){
    //     if(username==='Thisaras' && password==='dummy'){
    //        setAuthenticated(true)
    //        setUsername(username)
    //        return true

    //     }else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }
    // async function login(username, password){
    //     const baToken = 'Basic ' + window.btoa(username+":"+password)
    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status==200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             //this will add header TOKEN to all header
    //             apiClient.interceptors.request.use(
    //                 (config)=>{
    //                     console.log('Intercepting and adding a token');
    //                     config.headers.Authorization=baToken
    //                     return config
    //                 }
    //             )

    //             return true
     
    //          }else{
    //              setAuthenticated(false)
    //              setUsername(null)
    //              setToken(null)
    //              return false
    //          }
    //     }catch(error){
    //         setAuthenticated(false)
    //              setUsername(null)
    //              setToken(null)
    //              return false
    //     }
        
    // }


    async function login(username, password){
        try{
            const response = await executeJwtAuthenticationService(username,password)
            const jwtToken = 'Bearer '+response.data.token

            if(response.status==200){
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                //this will add header TOKEN to all header
                apiClient.interceptors.request.use(
                    (config)=>{
                        console.log('Intercepting and adding a token');
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )

                return true
     
             }else{
                 setAuthenticated(false)
                 setUsername(null)
                 setToken(null)
                 return false
             }
        }catch(error){
            setAuthenticated(false)
                 setUsername(null)
                 setToken(null)
                 return false
        }
        
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }
  return (
    //so this (number,..) or valueToBeShared is accessible from other components
    <AuthContext.Provider value={{/*number,*/ isAuthenticated, setAuthenticated, login,logout,username,token}}>
        {children}
    </AuthContext.Provider>
  )
}

