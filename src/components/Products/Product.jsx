import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import {GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS} from '../../redux/slice/productSlice'
import useFetchCollection from '../../customizedHooks/useFetchCollection'

const Product = () => {

  const {data, isLoading} = useFetchCollection("products")
  const [showFilter, setShowFilter] = useState(false)
  const products = useSelector(selectProducts);
  // console.log(products)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )
    dispatch(GET_PRICE_RANGE({
      products: data
    }))
  },[dispatch, data])

  return(
    <section>
        <div>
            <aside className="">
              {isLoading ? null : <ProductFilter/>}
            </aside>
            <div>
              {isLoading ? 
              ("spinnerhere")
            : (
              <ProductList products={products}/>
            )
            }
            </div>
        </div>
    </section>
  ) 
};

export default Product;
