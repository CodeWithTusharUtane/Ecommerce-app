import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true)
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      setLoading(false)
      toast.success("Check your email for the reset link")
    })
    .catch((error)=>{
      setLoading(false)
      toast.error(error.message)
    })
  }

  return (
    <>
       <div className='w-full h-screen pb-10 md:pb-36 flex items-center font-be justify-center bg-black text-white'>
        {loading && <Loader/>}
        <div className=" text-center  md:mt-16 lg:mt-24 md:border-2 md:p-5 md:rounded-xl border-2 p-3 rounded-lg">
          <h2 className='text-2xl text-orange-400 '>Reset Password</h2>
          <form onSubmit={resetPassword} className='text-black '>
            <div className=''>
            <input type="email" placeholder='Enter your email' className='text-center rounded-sm mt-3 h-9 w-[250px]' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
            <button type='submit' className='bg-blue-600 text-white w-[250px] mt-3 h-8 rounded-sm'>Reset Password</button>
            </div>
            <div className='mt-3 flex items-center justify-between'>
              <NavLink to='/login'>
              <span className='text-blue-600'>Login</span>
              </NavLink>
              <NavLink to='/register'>
              <span className='text-blue-600'>Register</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
