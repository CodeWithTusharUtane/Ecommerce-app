import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState,  } from 'react'
import { auth, database } from '../firebase/config';

const Cart = () => {

  const [cartD, setCartD] = useState([])
  const [uid, setUid] = useState(null)
  onAuthStateChanged(auth, (user)=>{
    if(user){
      setUid(user.uid);
    }
})

  
    const cartRef = collection(database, "cart"+uid);
    const getData = async () => {
      const data = await getDocs(cartRef);
      setCartD(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  

  return (
    <div className="flex items-center justify-center h-screen">
    <div className=''>
      {
        cartD.map((item)=>{
          return(
            <div className="flex border-2 border-black items-center gap-5 w-[34rem]">
              <img src={item.Product.purl} alt="" className='w-28' />
              <div>
              <div> {item.Product.pname}</div>
              <div>Quantity: {item.Product.qty}</div>
              <div> Price: {item.Product.pprice}</div>
              <div>Total Price: {item.Product.TotalProductPrice}</div>
              </div>
            </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default Cart