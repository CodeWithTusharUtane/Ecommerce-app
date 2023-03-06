import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {selectEmail} from '../../redux/slice/authSlice'
const AdminOnlyRoute = ({children}) => {

  const userEmail = useSelector(selectEmail)
  // console.log(userEmail)// Prints the current user email.
  if(userEmail === "tusharutane2@gmail.com"){
    return children
  } 
  return(
    <>
      <div className='h-[80vh]'>
        <h2>Permission Denied</h2>
        <p>This page can only be viewed by Admin.</p>
        <NavLink to='/'>
        <button> &larr; Go back to Home</button>
        </NavLink>

      </div>
    </>
  )
  
}
export const AdminOnlyLink = ({children}) => {

  const userEmail = useSelector(selectEmail)
  // console.log(userEmail)// Prints the current user email.
  if(userEmail === "tusharutane2@gmail.com"){
    return children
  } 
    return null
  
}

export default AdminOnlyRoute