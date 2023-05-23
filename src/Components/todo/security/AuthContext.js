import { createContext, useState, useContext } from "react";
import { apiClient } from "../api/ApiClient";
import { executeBasicAuthenticationService } from "../api/AuthenticationApiService";

//: Create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }){

    //3:put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    // function login(username, password){
    //     if(username==='in28minutes' && password==='dummy'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true            
    //     } else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    async function login(username, password){

        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try{
        
        const response = await executeBasicAuthenticationService(baToken)

            if(response.status===200){
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)

                apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = baToken

                    return config
                }
                )

                return true            
            } else{
                logout()
                return false
            }
        } catch(error){
            logout()
                return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    

    return(
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}