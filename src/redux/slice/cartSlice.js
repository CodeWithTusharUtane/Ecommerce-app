import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action){
        // console.log(action.payload)
        const productIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if(productIndex >= 0){
            // increaseTheCartQuantityBecauseProductAlreadyExistsInTheCart.
            state.cartItems[productIndex].cartQuantity += 1;
            toast.success(`${action.payload.name} quantity increased to Cart`)

            
        }else{
            // productIsNotPresentSoAddThatInCart.
            const tempProduct = {...action.payload, cartQuantity: 1}
            state.cartItems.push(tempProduct)
            toast.success(`${action.payload.name} Added to Cart`)
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state, action){
      // console.log(action.payload)
      const productIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)
      if(state.cartItems[productIndex].cartQuantity > 1){
        state.cartItems[productIndex].cartQuantity -=1
        toast.success("Decreased by 1")
      }else if(state.cartItems[productIndex].cartQuantity === 1){
        const newCartItem = state.cartItems.filter((item)=> item.id !== action.payload.id)
        state.cartItems = newCartItem
        toast.success("Removed from Cart")
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    REMOVE_FROM_CART(state, action){
      const newCartItem = state.cartItems.filter((item)=> item.id !== action.payload.id)
      state.cartItems = newCartItem;
      toast.success("Product Removed from Cart")
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    CLEAR_CART(state, action){
      // console.log(action.payload)
      state.cartItems = []
      toast.info("Cart has been cleared")
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    CALCULATE_SUBTOTAL(state, action){
      const arr = []
      state.cartItems.map((item)=>{
        const {price, cartQuantity} = item
        const cartItemAmount = price * cartQuantity
        // console.log(cartItemAmount)
        return arr.push(cartItemAmount)
      })
      // console.log(arr)
      const totalAmount = arr.reduce((a, b)=> {
        return a + b;
      }, 0)
      // console.log(totalAmount)
      state.cartTotalAmount = totalAmount
    },
    CALCULATE_TOTAL_QUANTITY(state, action){
      const array = []
      state.cartItems.map((item)=>{
        const {cartQuantity} = item
        const quantity = cartQuantity;
        return array.push(quantity)
      })
      const totalQuantity = array.reduce((a, b)=>{
        return a + b;
      }, 0)
        state.cartTotalQuantity = totalQuantity;
    }
  }
});

export const {ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY} = cartSlice.actions
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount; 
export default cartSlice.reducer