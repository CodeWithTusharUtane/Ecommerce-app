import { createSlice } from "@reduxjs/toolkit";
import ProductFilter from "../../components/Products/ProductFilter";

const initialState = {
  filteredProduct: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      // console.log(action.payload)
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProduct = tempProducts
    },
    SORT_PRODUCTS(state, action){
      // console.log(action.payload)
      const {products, sort} = action.payload;
      let tempProduct = []
      if (sort === "latest") {
        tempProduct = products;
      }

      if(sort === "lowest-price"){
        tempProduct = products.slice().sort((a, b)=>{
          return a.price - b.price;
        })
      }
      if(sort === "highest-price"){
        tempProduct = products.slice().sort((a, b)=>{
          return b.price - a.price;
        })
      }
      if(sort === "a-z"){
        tempProduct = products.slice().sort((a, b)=>{
          return a.name.localeCompare(b.name)
        })
      }
      if(sort === "z-a"){
        tempProduct = products.slice().sort((a, b)=>{
          return b.name.localeCompare(a.name)
        })
      }


      state.filteredProduct = tempProduct
    },
    FILTER_BY_CATEGORY (state, action){
      // console.log("first")
      const {products, category } = action.payload
      let tempProducts = []
      if(category === "All"){
        tempProducts = products
      }else{
        tempProducts = products.filter((product)=> product.category === category)
      }
     state.filteredProduct = tempProducts
    },
    FILTER_BY_PRICE(state, action){
      // console.log(action.payload)
      const {products, price} = action.payload
      let tempProducts = []
      tempProducts = products.filter((product)=>product.price <= price)

      state.filteredProduct = tempProducts
    }
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_CATEGORY, FILTER_BY_PRICE } = filterSlice.actions;

export const selectFilterProduct = (state) => state.filter.filteredProduct;

export default filterSlice.reducer;
