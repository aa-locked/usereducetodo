import React from "react";
import { useReducer } from "react";
import {useState } from 'react'


const reducer = (state,action)=>{
    console.log(action)
    switch (action.type) {
        case 'ADD':{
            action.settextvalue("");
            return [
                ...state,
                {
                    id:state.length+1,
                    name: action.payload
                }
            ]
        }
        case 'UPDATE':{
            let data = state.filter((item, i) => item.id === action.payload)
            action.settextvalue(data[0].name);
            action.setbutnval("Update");
            return state
        }
        case 'DELETE':{
           state = state.filter((item, i) => item.id !== action.payload)
             return state
            
        }
        default:
            return state
    }
}
const Form =()=>{
    const initialState =[];
    const [todos,dispatch] = useReducer(reducer,initialState);
    const[textval,setTextVal]= useState("");
    const[buttonval,setbuttonval]= useState("Add Task");


    const getuserdata=(e)=>{
        setTextVal(e.target.value)
    }

    return(
    <>
       <h1>TODO List {todos.length}</h1>
       <input type="text" onChange={getuserdata} placeholder="Enter Task..." value={textval}/>
       <button type="button" onClick={()=>dispatch(
       {type:"ADD",payload:textval,settextvalue:setTextVal})}>{buttonval}</button>
       <hr/>  
       <table>
        <thead>
            <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Action</th>
            </tr>
        </thead>
       
    <tbody>
    {todos.map((todo,index)=> {
          return  <tr id={index}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>
                    <button onClick={()=>dispatch(
                            {type:"UPDATE",payload:todo.id,settextvalue:setTextVal,setbutnval:setbuttonval})}>Update</button>
                    <button onClick={()=>dispatch(
                            {type:"DELETE",payload:todo.id})} >Delete</button>
                </td>
            </tr>
            
        })}
    </tbody>   
    </table>    
    </>
    )
}

export default Form