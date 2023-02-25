import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <div>
      <div className="bg-[#E3DFFD] text-[#2B3467] h-10 flex items-center justify-between font-be md:h-16 lg:hidden">
        <div className="text-xl ml-3 md:text-3xl md:ml-5">
          <span className="font-bold">Headphones-Hub</span>
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
            <div className="mt-5 md:mt-8">Home</div>
            <div className="mt-5 md:mt-8">Products</div>
            <div className="mt-5 md:mt-8">Cart</div>
            <div className="mt-5 md:mt-8">Login</div>
            <div className="mt-5 md:mt-8">Sign Up</div>
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden lg:flex h-16">
          <div className=" bg-[#E3DFFD] text-[#2B3467] w-full flex items-center justify-between">
            <div className="text-4xl  ml-7 font-bold">Headphones-Hub</div>
            <div className="flex items-center text-2xl mr-5 space-x-7 font-semiboldbold">
              <div>Home</div>
              <div>Products</div>
              <div>Cart</div>
              <div>Login</div>
              <div>Sign Up</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
