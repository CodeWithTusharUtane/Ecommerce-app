import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_CATEGORY, FILTER_BY_PRICE,  } from '../../redux/slice/filterSlice'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../redux/slice/productSlice'

const ProductFilter = () => {

  const [category, setCategory] = useState("All")
  const [price, setPrice] = useState(9999)
  const products = useSelector(selectProducts)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  const dispatch = useDispatch();
  const allCategories = [
    "All",
    ...new Set(products.map((product)=> product.category))
  ]
  // console.log(allCategories)

  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({products, price}));
  },[dispatch, products, price])

  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({products, category: cat}))
    
  }

  const clearFilters = () => {
    setCategory("All")
    setPrice(maxPrice)
  }

  return (
    <div>
      <h2>Categories</h2>
      <div>
        {allCategories.map((cat, index)=>{
          return (
            <button key={index} type="button" onClick={()=> filterProducts(cat)}>{cat}</button>
          )
        })}
      </div>
      <h4>Price</h4>
      <p>{`₹ ${price}`}</p>
      <div>
        <input type="range" name='price' min={minPrice} max={maxPrice} value={price} onChange={(e)=> setPrice(e.target.value)}/>
      </div>
      <br />
      <button onClick={clearFilters}>Clear Filter</button>
    </div>
  )
}

export default ProductFilter