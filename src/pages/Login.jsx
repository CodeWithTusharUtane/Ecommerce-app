import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {auth} from '../firebase/config'
import { toast } from "react-toastify";
import Loader from '../components/Loader'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      // const user = userCredential.user;
      setLoading(false);
      toast.success("Login Successful")
      navigate('/')
    })
    .catch((error)=>{
      setLoading(false);
      toast.error(error.message);
    })
  }

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
    .then((result)=>{
      // const user = result.user;
      toast.success("Login Successful")
      navigate('/')
    })
    .catch((error)=>{
      toast.error(error.message)
    })

  }
  return (
    <>
      <div className="w-full h-screen pb-10 md:pb-36 flex items-center font-be justify-center bg-[#E3DFFD] text-[#2B3467]">
        {loading && <Loader/>}
        <div className=" text-center  md:mt-16 lg:mt-24 md:border-2 border-black md:p-5 md:rounded-xl">
          <h2 className="text-2xl text-[#2B3467] ">Login</h2>
          <form onSubmit={loginUser} className="text-black ">
            <div className="">
              <input
                type="email"
                placeholder="Enter your email"
                className="text-center rounded-sm mt-3 h-9 w-[250px]"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-center rounded-sm mt-3 h-9 w-[250px]"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="bg-blue-600 text-white w-[250px] mt-3 h-8 rounded-sm">
                Login
              </button>
            </div>
            <div className="mt-3 mb-2">
              <NavLink to="/reset">
                <span className="text-[#2B3467] ">Forgot Password</span>
              </NavLink>
            </div>
            <span className="text-[#2B3467] ">--or--</span>
            <div className="flex justify-center">
              <button className="bg-orange-400 text-white w-[250px] h-8 rounded-sm flex items-center justify-center" onClick={signInWithGoogle}>
                <GrGoogle className="mr-3" /> Login With Google
              </button>
            </div>
            <div className="text-[#2B3467] mt-3">
              <span>
                Don't have an account?
                <NavLink to="/signin">
                  <span className="text-blue-500 ml-1">Register</span>
                </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
