import React, { useContext } from 'react'
import './todoApp.css'
import { Link } from 'react-router-dom'
import {AuthContext, useAuth} from './security/AuthContext'

export default function HeaderComponent() {
    //can use in any COMPONENTS
    // const authContext = useContext(AuthContext)
    // console.log(authContext.number);
    //IMPORRT NEWLY CREATED HOOK useAuth()
    const authContext = useAuth()
    //To enable and disable nav items
    const isAuthenticated = authContext.isAuthenticated

    function logout(){
        authContext.logout()
    }
  return (
           <header className="border-bottom border-light border-5 mb-5 p-2">
           <div className="container">
               <div className="row">
                   <nav className="navbar navbar-expand-lg">
                       <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href='https://github.com/ThisaraJayas'>Thisara</a>
                       <div className="collapse navbar-collapse">
                           <ul className="navbar-nav">
                               <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link" to="/welcome/Thisara">Home</Link>}
                                    
                                </li>
                               <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                                    
                                </li>
                           </ul>
                       </div>
                       <ul className="navbar-nav">
                           <li className="nav-item fs-5">
                            {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                                
                            </li>
                           <li className="nav-item fs-5">
                            {isAuthenticated && <Link className="nav-link" onClick={logout} to="/logout">Logout</Link>}
                                
                            </li>
                       </ul>
                   </nav>
               </div>
           </div>
       </header>

  )
}
