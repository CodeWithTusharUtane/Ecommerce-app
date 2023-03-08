import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({product, id, name, price, desc, imageUrl, brand}) => {
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
          <button>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductItem