import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/config'
import Loader from '../components/Loader'
import { ToastContainer, toast } from "react-toastify";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (event) => {
      event.preventDefault()
      if (password !== cPassword){
        toast.error("Passwords are not matching")
      }
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        toast.success("Registered Successfully");
        navigate('/login');
      })
      .catch((error)=>{
        toast.error(error.message)
        setLoading(false);
      })
      
    }
  return (
    <div>
      <ToastContainer/>
      {
        loading && <Loader/>
      } 
      <div className="w-full h-screen pb-10 md:pb-36 flex items-center font-be justify-center bg-[#E3DFFD] text-white">
        <div className=" text-center mt-9 md:mt-16 lg:mt-24 border-2 border-black p-5 md:rounded-xl ">
          <h2 className="text-2xl text-[#2B3467] ">Register</h2>
          <form onSubmit={registerUser} className="text-black ">
            <div className="">
              <input
                type="email"
                placeholder="Enter your email"
                className="text-center rounded-sm mt-3 h-9 w-[250px]"
                required
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-center rounded-sm mt-3 h-9 w-[250px]"
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm your password"
                className="text-center rounded-sm mt-3 h-9 w-[250px]"
                required
                value={cPassword}
                onChange={(e)=> setCPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="bg-blue-600 text-white w-[250px] mt-3 h-8 rounded-sm">
                Register
              </button>
            </div>

            <div className="text-[#2B3467] mt-3">
              <span>
                Already have an account?
                <NavLink to="/login">
                  <span className="text-blue-500 ml-1">Login</span>
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  ); 
};

export default Signin;
