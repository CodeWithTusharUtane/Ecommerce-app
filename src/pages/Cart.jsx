import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database, auth } from "../firebase/config";

console.log("Tushar");
const Cart = () => {
  const [count, setCount] = useState(1);
  const [uid, setUid] = useState(null);
  const [cartData, setCartData] = useState([]);
  // console.log("first")
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    }
  });

  const collectionName = "cart" + uid;
  const productReference = collection(database, collectionName);

  const getData = async () => {
    const data = await getDocs(productReference);
    // console.log(data)
    setCartData(data.docs.map((item) => ({ ...item.data(), id: item.id })));
  };
  getData();

  // const increaseCounter = () => {
  //   setCount(count+1);

  // }
  // const reduceCounter = () => {
  //   if(count < 1){
  //     toast.error("Item cannot be 0")
  //   }else{
  //     setCount(count-1);
  //   }
  // }
// console.log("first")
  return (
    <div className="bg-[#e3dffd] text-[#2b3467]">
    <div className="w-full h-10  text-2xl text-center  ">
      <h1 className="pt-2 md:text-3xl">Cart Item's</h1>
    </div>
    {cartData.map((item) => {
      // console.log(items.Product)
      return (
        <div className="capitalize ">
          <div className="rounded-xl shadow-lg md:hover:scale-105 duration-300 mt-5 mb-6 md:w-[70%] lg:w-[50%] m-auto md:border-2 border-black/20 ">
            <div
              className="md:flex items-center gap-10 justify-center   "
              key={item.Product.id}
            >
              <img
                src={item.Product.purl}
                alt=""
                className=" w-40 m-auto md:m-2 "
              />
              <div className="md:ml-5">
                <div className="text-center mt-2 text-xl md:text-2xl font-bold">
                  {item.Product.pname}
                </div>
                <div className="text-center mt-2 text-xl md:text-2xl">
                  Price- {item.Product.pprice}
                </div>
                <div className="text-center text-xl mt-2 md:text-2xl">
                  Total- {item.Product.TotalProductPrice}
                </div>
                <div className="text-center mt-2 text-xl md:text-2xl ">
                  <div>
                    Quantity
                    <button className="border-2 px-2 bg-[#2b3467] text-[#e3dffd] text-xl">
                      +
                    </button>
                    <span>{count}</span>
                    <button className="border-2 px-2 bg-[#2b3467] text-[#e3dffd] text-xl">
                      -
                    </button>
                  </div>
                  <button className="text-[#e3dffd] bg-[#2b3467] p-1 px-16 ml-5 mt-5 mb-5">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
    <div className="mt-5  text-center  p-2">
      <span className="text-2xl font-bold">Cart Total</span>
      <div className="mt-5 mb-5 text-2xl text-center ml-3">
        Sub Total- $55000
      </div>
      <div className="m-2 p-2 text-2xl mt-3 bg-blue-500 text-white">
        Proceed to Checkout
      </div>
    </div>
  </div>
  );
};

export default Cart;
