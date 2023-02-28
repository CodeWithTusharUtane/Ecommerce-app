import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleProductPage from './pages/SingleProductPage'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ResetPassword from './pages/ResetPassword'
import Header from './constants/Header'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProductThrough from './pages/AddProductThrough'


const App = () => {
  return (

    <BrowserRouter>
    <ToastContainer/>
      <Header/>
      <div className="w-full bg-black h-1"></div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
        <Route path='/addProductPage' element={<AddProductThrough/>}/>
        <Route path='/singleproductpage/:id' element={<SingleProductPage/>}/>
        
      </Routes>
    </BrowserRouter>

  )
}

export default App