import React, { useContext } from 'react'
import './todoApp.css'
import {AuthContext, useAuth} from './security/AuthContext'

export default function FooterComponent() {
    //CAN USE IN ANY COMPONENT
    // const authContext = useContext(AuthContext)
    const authContext = useAuth()
    console.log(authContext.number);
  return (
    <footer className='footer'>
        <div className='container'>
            Your Footer
        </div>
    </footer>
  )
}
