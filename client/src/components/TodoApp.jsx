import React from 'react'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './todoApp.css'
import ErrorComponent from './ErrorComponent'
import ListTodosComponent from './ListTodosComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent'
import AuthProvider from './security/AuthContext'
import AuthenticatedRoute from './AuthenticatedRoute'

export default function TodoApp() {
  return (
    <div className='TodoApp'>
        <AuthProvider> 
        <BrowserRouter>
        <HeaderComponent/>
            <Routes>
                <Route path='/' element={<LoginComponent/>} />
                <Route path='/login' element={<LoginComponent/>} />
                <Route path='/welcome/:username' element={<AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>}/>
                <Route path='*' element={<ErrorComponent/>}/> {/* if url not match */}
                <Route path='/todos' element={<AuthenticatedRoute><ListTodosComponent/></AuthenticatedRoute>}/>
                <Route path='/logout' element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}/>
            </Routes>
            <FooterComponent/>
        </BrowserRouter>
        </AuthProvider>
    </div>
  )
}
