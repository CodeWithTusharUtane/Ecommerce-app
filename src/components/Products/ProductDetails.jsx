import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { database } from '../../firebase/config'


const ProductDetails = () => {

  const {id} = useParams()
  const [product, setProduct] = useState(null)

  const getProduct = async() => {
    const docRef = doc(database, "products", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      // console.log(docSnap.data())
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    }else{
      // console.log("first")
      toast.error("No Product exists")
    }
  }

  useEffect(()=>{
    getProduct()
  },[])

  return (
    <div>
      <div>
      <h2>Product Detail</h2>
      <div>
        <Link to='/#products'>&larr; Back to Products</Link>
      </div>
      {product === null ? (
          // <img src={"loaderhere"} alt="" />
          "loaderhere"
      ):(
        <>
          <div>
            <div>
            <img src={product.imageUrl} alt={product.name} />
            </div>
            <div>
              <h3>{product.name}</h3>
              <p>{`$ ${product.price}`}</p>
              <p>{product.desc}</p>
              <p><b>
                Brand:
                </b>{product.brand}</p>
                <div>
                  <button>-</button>
                  <p><b>1</b></p>
                  <button>+</button>
                </div>
                <button>Add to Cart</button>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  )
}


export default ProductDetails