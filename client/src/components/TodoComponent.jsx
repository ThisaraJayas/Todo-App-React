import './todoApp.css'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTodoApi, retriveTodoApi, updateTodoApi } from './api/TodoApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'

export default function TodoComponent() {
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const Navigate = useNavigate()

    useEffect(
        ()=> {
            retriveTodo()
        },[id]) //when id value changes

    
    function retriveTodo(){
        if(id != -1){
            retriveTodoApi(username, id)
            .then((response) => {
                console.log(response)
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            }
        )
        .catch(error => console.log(error))
        }
        
    }

    function onSubmit(values){
        console.log(values);
        const todo ={
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false,
        }
        console.log(todo);

        if(id== -1){
            
            createTodoApi(username, todo)
            .then((response) => {
            console.log(response)
            Navigate('/todos')
        }
        )
        .catch(error => console.log(error))
        }else{
            updateTodoApi(username, id, todo)
            .then((response) => {
                console.log(response)
                Navigate('/todos')
            }
            )
            .catch(error => console.log(error))
        }
        
    }
    function validate(values){
        let errors ={
            
            // targetDate: 'Enter a valid target date',
        }
        if(values.description.length<5){
            errors.description= 'Enter atleat 5 Characters'
        }
        if(values.targetDate==null || values.targetDate==''){
            errors.targetDate= 'Enter date'
        }
        return errors
    }

  return (
    <div className='todoComponent'>
        <div className='container'>
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                 enableReinitialize={true} onSubmit={onSubmit} validate={validate}
                 validateOnChange={false} validateOnBlur={false}>
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage 
                                    name='description'
                                    component='div'
                                    className='alert alert-warning'

                                />
                                 <ErrorMessage 
                                    name='targetDate'
                                    component='div'
                                    className='alert alert-warning'
                                />
                                <fieldset className='form-group'>
                                    <label>Description</label>
                                    <Field type="text" className='form-control' name="description"/>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Target Date</label>
                                    <Field type="date" className='form-control' name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className='btn btn-success m-5' type='submit'>Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
        
    </div>
  )
}
