import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import './TodoApp.css'

export function TodoApp(){
    return(
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginComponent />}></Route>
                    <Route path='/welcome' element={<WelcomeComponent />}></Route>     
                </Routes>            
            </BrowserRouter>
        </div>
    )
}

export function LoginComponent(){

    const[username, setUsername] = useState('in28minutes')
    const[password, setPassword] = useState('dummy')
    const[showSuccessMessage, setShowSuccessMessage] = useState(false)
    const[showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate();

    function handleUsernameChange(event){
        setUsername(event.target.value)
        
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleSubmit(){
        if(username==='in28minutes' && password==='dummy'){
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate('/welcome')
        } else{
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }




    return(
        <div className="Login">

            {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
            
            {showErrorMessage && <div className="errorMessage">Authentication Failed. Please check your credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                    
                </div>

            </div>
        </div>
    )

}



export function WelcomeComponent(){
    return(
        <div className="Welcome">
                Welcome Component
        </div>
    )
}