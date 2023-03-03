import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {database, auth} from '../firebase/config'
console.log("Tushar")
const Cart = () => {

const [uid, setUid] = useState(null);
const [cartData, setCartData] = useState([]);
  onAuthStateChanged(auth, (user)=>{
    if(user){
      setUid(user.uid);
    }
})

  const collectionName = "cart"+uid;
  const productReference = collection(database, collectionName );

  useEffect(()=>{
    const getData = async() => {
      const data = await getDocs(productReference);
      console.log(data)
      setCartData(data.docs.map((item)=>({ ...item.data(),
        id: item.id,})))
    }
    getData();
  },[])

  return (
    <div>
      {
        cartData.map((item)=>{
          // console.log(items.Product)
<div className="w-full h-10  text-2xl text-center bg-gray-300 ">
          <h1>Cart Item's</h1>
        </div>          
          return(
            <>
              <div className="capitalize ">
        
        <div className="rounded-xl shadow-lg md:hover:scale-105 duration-300 mt-5 mb-6 md:w-[70%] lg:w-[50%] m-auto md:border-2 border-black/20 ">
          <div className="md:flex items-center gap-10 justify-center   ">
          <img src={item.Product.purl} alt="" className=" w-40 m-auto md:m-2 " />
          <div className="md:ml-5">
          <div className="text-center mt-2 text-xl md:text-2xl font-bold">Product 1</div>
          <div className="text-center mt-2 text-xl md:text-2xl">Price- $5000</div>
          <div className="text-center text-xl mt-2 md:text-2xl">Total- $50000</div>
          <div className="text-center mt-2 text-xl md:text-2xl ">
            <div>
            Quantity <span  className="border-2 px-2 bg-gray-500 text-xl">+</span> <span>1</span> <span className="border-2 px-2 bg-gray-500 text-xl">-</span>
            </div>
            <button className="bg-gray-500 text-white p-1 px-16 ml-5 mt-5 mb-5">Delete</button>
          </div>
          </div>
          </div>
        </div>
        



</div>
            </>
          )
        })
      }
              <div className="mt-5  text-center bg-gray-300/50 p-2">
          <span className="text-2xl font-bold">
          Cart Total
          </span>
          <div className="mt-5 mb-5 text-2xl text-center ml-3">Sub Total- $55000</div>
          <div className="m-2 p-2 text-2xl mt-3 bg-blue-500 text-white">Proceed to Checkout</div>   
</div>
    </div>
  )
}

export default Cart