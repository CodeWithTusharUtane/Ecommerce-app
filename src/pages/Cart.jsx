import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {FaTrashAlt} from 'react-icons/fa'
import  {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slice/cartSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmout = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();

const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
}
const decreaseCart = (cart) => {
  dispatch(DECREASE_CART(cart))
}
const deleteFromCart = (cart) => {
  dispatch(REMOVE_FROM_CART(cart))
}
const clearCart = () => {
  dispatch(CLEAR_CART())
}

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [dispatch, cartItems])
  

  return (
    <div>
      <div className="">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart has nothing to show</p>
            <div className="">
              <Link to="/#products">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, imageUrl, price, cartQuantity } = cart;
                  return(
                    <tr key={id}>
                        <td>{index + 1}</td>
                        <td><p><b>{name}</b></p></td>
                        <td><img src={imageUrl} alt={name} /></td>
                        <td>{price}</td>
                        <td>
                            <div className="">
                                <button onClick={()=> decreaseCart(cart)}>-</button>
                                    <p><b>{cartQuantity}</b></p>
                                <button onClick={()=> increaseCart(cart)}>+</button>
                            </div>
                        </td>
                        <td>
                            {
                              (price * cartQuantity).toFixed(2)
                            }
                        </td>
                        <td>
                          <FaTrashAlt color="red" onClick={()=>deleteFromCart(cart)}/>
                        </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="">
              <button onClick={()=> clearCart()}>Clear Cart</button>
              <div>
                <Link to='/#products'>
                  <p>&larr; Continue Shopping</p>
                </Link>
              </div>
              <div className="">
                <p><b>{`Cart Items: ${cartTotalQuantity}`}</b></p>
                <h4>
                  subtotal: 
                  <h3>{`₹ ${cartTotalAmout.toFixed(2)}`}</h3>
                </h4>
                <p>Taxes and Shipping Calculated at Checkout</p>
                <button>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
