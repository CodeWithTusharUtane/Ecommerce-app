import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { database } from '../../firebase/config'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../redux/slice/cartSlice'


const ProductDetails = () => {

  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)

  const cart = cartItems.find((cart)=> cart.id === id)
  const isAdded = cartItems.findIndex((cart)=>{
    return cart.id === id;
  })

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

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  const decreaseCart = () => {
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }



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
                  {isAdded < 0 ? null : (
                    <>
                    <button onClick={()=> decreaseCart(product)}>-</button>
                    <p><b>{cart.cartQuantity}</b></p>
                    <button onClick={()=> addToCart(product)}>+</button>
                    </>
                  )}
                </div>
                <button onClick={()=> addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  )
}


export default ProductDetails