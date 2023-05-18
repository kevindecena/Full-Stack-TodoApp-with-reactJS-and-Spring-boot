import { createContext, useState, useContext } from "react";

//: Create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }){

    //3:put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    //setInterval( () => setNumber(number+1), 10000)

    //const valueToBeShared = {number, isAuthenticated, setAuthenticated}

    function login(username, password){
        if(username==='kevin' && password==='dummy'){
            setAuthenticated(true)
            return true            
        } else{
            setAuthenticated(false)
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    

    return(
        <AuthContext.Provider value={ {isAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}