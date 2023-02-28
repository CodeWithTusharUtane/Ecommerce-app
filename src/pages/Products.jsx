import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {database} from '../firebase/config'
const Products = () => {

  const [productD, setProductD] = useState([]);
  const productRef = collection(database, "products")

  useEffect(()=>{
    const getData = async () => {
      const data = await getDocs(productRef);
      setProductD(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getData();
  },[])

  return (
    <>
      <div className="">
        {productD.map((item)=>{
          console.log(item)
          return(
            
              <div key={item.id}>
                <img src={item.purl} alt="" />
                <div>{item.pname}</div>
                <div>{item.pprice}</div>
              </div>
            
          )
        })}
      </div>
    </>
  )
}

export default Products