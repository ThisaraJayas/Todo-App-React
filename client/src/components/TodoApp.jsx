import React from 'react'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './todoApp.css'
import ErrorComponent from './ErrorComponent'
import ListTodosComponent from './ListTodosComponent'

export default function TodoApp() {
  return (
    <div className='TodoApp'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginComponent/>} />
                <Route path='/login' element={<LoginComponent/>} />
                <Route path='/welcome/:username' element={<WelcomeComponent/>}/>
                <Route path='*' element={<ErrorComponent/>}/> {/* if url not match */}
                <Route path='/todos' element={<ListTodosComponent/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
