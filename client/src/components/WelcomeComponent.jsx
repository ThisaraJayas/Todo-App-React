import React, { useState } from 'react'
import './todoApp.css'
import {Link, useParams} from 'react-router-dom'
import { retriveHelloWorldBean, retriveHelloWordPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

export default function WelcomeComponent() {
    const {username} = useParams()
    const [message,setMessage] = useState(null)

    const authContext = useAuth()
    const token = authContext.token

    function callHelloWorldRestApi(){
      // axios.get('http://localhost:8080/hello-world')
      // .then((response)=>successfulResponse(response))
      // .catch((error)=>errorResponse(error))
      // .finally(()=>console.log('Cleanup'))

      retriveHelloWorldBean()
        .then((response)=>successfulResponse(response))
        .catch((error)=>errorResponse(error))
        .finally(()=>console.log('Cleanup'))

      retriveHelloWordPathVariable("Thisara",token)
        .then((response)=>successfulResponse(response))
        .catch((error)=>errorResponse(error))
        .finally(()=>console.log('Cleanup'))

    }
    function successfulResponse(response){
      console.log(response);
      // setMessage(response.data)
      setMessage(response.data.message)
    }
    function errorResponse(error){
      console.log(error);
    }
  return (
    <div className='welcomeComponent'>
        <h1>Welcome {username}</h1>
          <div>
              Manage Your Todos - <Link to={'/todos'}>Go Here</Link>
          </div>
        <div>
          <button className='btn btn-success m-5' 
          onClick={callHelloWorldRestApi}>Call HelloWorld Rest API</button>
        </div>
        <div className='text-info'>{message}</div>
    </div>
  )
}
