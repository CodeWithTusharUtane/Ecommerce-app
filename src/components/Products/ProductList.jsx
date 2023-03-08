import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilterProduct } from '../../redux/slice/filterSlice'
import Search from '../Search'
import ProductItem from './ProductItem'


const ProductList = ({products}) => {

  const [search, setSearch] = useState("")
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilterProduct)
  
  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products, search}))  
  },[dispatch, products, search])

  return (
    <>
    <div>
        <div>
           <p>
            <b>{filteredProducts.length} </b> Products Found
           </p>
        </div>
        <div>
          <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        <div>
          <label>Sort by: </label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
    </div>
    <div>
      {products.length === 0 ? (
        <p>No Products Found!!</p>
      ) : (
        <>
          {filteredProducts.map((item)=>{
            return(
              <div key={item.id}>
                <ProductItem {...item} product={item}/>
              </div>
            )
          })}
        </>
      )}
    </div>
    </>
  )
}

export default ProductList