import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_TO_CART } from '../../redux/slice/cartSlice'

const ProductItem = ({product, id, name, price, desc, imageUrl, brand}) => {

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
  }

  return (
    <div>
      <Link to={`/singleproductpage/${id}`}>
        <div>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
        <div>
          <div>
            {`$ ${price}`}  
            <h4>{name}</h4>
          </div>  
          <button onClick={()=> addToCart(product)}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductItem