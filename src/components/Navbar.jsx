import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {auth} from '../firebase/config'
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "./HiddenLinks";
import { AdminOnlyLink } from "./Admin/AdminOnlyRoute";



const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [uName, setUName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This is to Monitor currently signed in User.
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        // const uid = user.uid;
        // console.log(user.displayName)

        if(user.displayName == null){
          const u1 = user.email.slice(0, -10)
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          // console.log(uName)
          setUName(uName)
        }else{
          setUName(user.displayName)
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : uName,
          userId: user.uid
        }))
      }else{
         setUName("")
         dispatch(REMOVE_ACTIVE_USER())
      }
    })
  }, [dispatch, uName])

  const logoutUser = () => {
    signOut(auth).then(()=>{
      toast.success("Logout successfully")
      navigate("/")
    }).catch((error)=>{
      toast.error(error.message)
    })
  }

  return (
    <div>
      <div className="bg-[#E3DFFD] text-[#2B3467] h-10 flex items-center justify-between font-be md:h-16 lg:hidden">
        <div className="text-xl ml-3 md:text-3xl md:ml-5">
          <span className="font-bold">Eshopping-Hub</span>
        </div>

        <div className="mr-3 md:mr-5">
          <GiHamburgerMenu
            onClick={() => setNav(!nav)}
            className="cursor-pointer text-3xl md:text-4xl"
          />
        </div>

        <div
          className={
            nav
              ? "fixed top-0 left-0 w-screen h-screen bg-[#E3DFFD] z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-[#E3DFFD] z-10 duration-300"
          }
        >
          <RxCross1
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-3 top-2 cursor-pointer md:right-10 md:top-4 "
          />
          <div className="text-xl ml-3 mt-2 md:text-3xl md:ml-5 md:mt-3">
            <span className="font-bold">Headphones-Hub</span>
          </div>
          <div className="text-center mt-8 text-xl md:text-3xl md:mt-14">
            <AdminOnlyLink>
            <div className="mt-5 md:mt-8 bg-[#2b3467] text-[#e3dffd] p-1 px-2 rounded-md"><NavLink to='/Admin/home'>Admin</NavLink></div>
            </AdminOnlyLink>
            <div className="mt-5 md:mt-8"><NavLink to='/'>Home</NavLink></div>
            <div className="mt-5 md:mt-8"><NavLink to='/cart'>Cart</NavLink></div>
            <div className="mt-5 md:mt-8"><ShowOnLogout><NavLink to='/login'>Login</NavLink></ShowOnLogout></div>
            <div className="mt-5 md:mt-8"><ShowOnLogout><NavLink to='/signin'>Sign Up</NavLink></ShowOnLogout></div>
            <div className="mt-5 md:mt-8"><ShowOnLogin><NavLink to='/'  onClick={logoutUser}>Logout</NavLink></ShowOnLogin></div>
            <ShowOnLogin><div className="mt-5 md:mt-8">Hello, {uName}</div></ShowOnLogin>
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden lg:flex h-16">
          <div className=" bg-[#E3DFFD] text-[#2B3467] w-full flex items-center justify-between">
            <div className="text-4xl  ml-7 font-bold">Eshopping-Hub</div>
            <div className="flex items-center text-2xl mr-5 space-x-7 font-semiboldbold">
              <AdminOnlyLink><div className="bg-[#2b3467] text-[#e3dffd] p-1 px-2 rounded-md"> <NavLink to='/Admin/home'>Admin</NavLink></div></AdminOnlyLink>
              <div> <NavLink to='/'>Home</NavLink></div>
              <div className=""><NavLink to='/cart' className='flex items-center '>Cart <AiOutlineShoppingCart className="ml-2"/> </NavLink></div>
              <div><ShowOnLogout><NavLink to='/login'>Login</NavLink></ShowOnLogout></div>
              <div><ShowOnLogout><NavLink to='/signin'>Sign Up</NavLink></ShowOnLogout></div>
              <ShowOnLogin><div>Hello, {uName}</div></ShowOnLogin>
              <ShowOnLogin><div className="bg-[#2B3467] text-[#E3DFFD] p-1 rounded-md px-2"><NavLink to='/' onClick={logoutUser}>Logout</NavLink></div></ShowOnLogin>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
