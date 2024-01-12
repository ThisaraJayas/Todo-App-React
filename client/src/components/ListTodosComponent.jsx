import React, { useEffect, useState } from 'react'
import './todoApp.css'
import { deleteTodoApi, retriveAllTodosForUsernameApi } from './api/TodoApiService'
import { useAuth } from './security/AuthContext'
import { useNavigate } from 'react-router-dom'



export default function ListTodosComponent() {

    // const today = new Date()
    // const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    // const todos = [{
    //     id: 1,
    //     description: 'Learn AWS',
    //     done : false,
    //     targetDate:targetDate,
    // },
    // {
    //     id: 2,
    //     description: 'Learn Full Stack',   
    //     done : false,
    //     targetDate:targetDate, 
    // },
    // {
    //     id: 3,
    //     description: 'Learn DevOps',   
    //     done : false,
    //     targetDate:targetDate, 
    // }
    // ]

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const authContext = useAuth()
    const username = authContext.username
    const Navigate = useNavigate()

    useEffect(
        ()=> {
            refreshTodos()
        },[])

    function refreshTodos(){
        retriveAllTodosForUsernameApi(username)
        .then(response => {
                console.log(response.data),
                setTodos(response.data)
            }
        )
        .catch(error => console.log(error))
    }

    function deleteTodo(id){
        
        console.log('Delete Todo ',id);
        deleteTodoApi(username,id)
        .then(
            ()=>{
                refreshTodos()
                setMessage(`Todo of ID ${id} is Deleted`)
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id){
        
        console.log('Update Todo ',id);
        Navigate(`/todo/${id}`)
        
    }
    function addNewTodo(){
        Navigate('/todo/-1')
    }

  return (
    <div className='container'>
        <h1>Things You Want To Do</h1>
        {message && <div className='alert alert-warning'>{message}</div>}
        
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Description</th>
                        <th>Is Done?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // LIKE FOR EACH MAP TO TODO
                        todos.map(todo=>(
                            // BY ADDING KEY WARNING DISAPEAR
                            <tr key={todo.id}> 
                                {/* <td>{todo.id}</td> */}
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                                <td><button className='btn btn-warning' onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                <td><button className='btn btn-success' onClick={()=>updateTodo(todo.id)}>Update</button></td>
                            </tr>                            
                        ))
                    }

                </tbody>
            </table>
        </div>
        <div>
            <button className='btn btn-success m-3' onClick={addNewTodo}>Add New Todo</button>
        </div>
    </div>
  )
}
