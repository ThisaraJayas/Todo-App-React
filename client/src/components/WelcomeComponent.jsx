import React from 'react'
import './todoApp.css'
import {Link, useParams} from 'react-router-dom'

export default function WelcomeComponent() {
    const {username} = useParams()
  return (
    <div className='welcomeComponent'>
        <h1>Welcome {username}</h1>
        <div>
            Manage Your Todos - <Link to={'/todos'}>Go Here</Link>
        </div>
    </div>
  )
}
