import React, { useState } from 'react'
import './todoApp.css'
import {useNavigate} from 'react-router-dom'

export default function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const Navigate = useNavigate()

    function handleUsenameChange(e){
        setUsername(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }
    function handleLogin(){
        if(username==='Thisara' && password==='dummy'){
            setSuccessMessage(true)
            setErrorMessage(false)
            Navigate(`/welcome/${username}`)

        }else{
            setSuccessMessage(false)
            setErrorMessage(true)
        }
    }
    //THIS IS ALTERNATIVE(LONG) METHOD OF USER AUTHENTNTICATION
    // function SuccessMessageComponent(){
    //     if(successMessage){
    //         return <div className='successMessage'>Successfuly Logedin</div>
    //     }
    // }
    // function ErrorMessageComponent(){
    //     if(errorMessage){
    //         return <div className='errorMessage'>Invalid Credentials</div>
    //     }
    // }
  return (
    <div className='Login'>
        <h1>Time To Login</h1>
        {/* SHORTCUT AUTH */}
        {successMessage && <div className='successMessage'>Successfuly Logedin</div>}
        {errorMessage && <div className='errorMessage'>Invalid Credentials</div>}
        
        <div className='LoginForm'>
            <div>
                <label>Username</label>
                <input type='text' name='username' value={username}
                onChange={handleUsenameChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type='password' name='password' value={password}
                onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type='button' onClick={handleLogin} name='login'>Login</button>
            </div>
        </div>

    </div>
  )
}
