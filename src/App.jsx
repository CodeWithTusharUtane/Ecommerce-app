import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleProductPage from './pages/SingleProductPage'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import Header from './constants/Header'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './components/Admin/Admin'
import AdminOnlyRoute from './components/Admin/AdminOnlyRoute'
import ProductDetails from './components/Products/ProductDetails'


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
        <Route path='/reset' element={<ResetPassword/>}/>
        
        <Route path='/admin/*' element={
          <AdminOnlyRoute>
            <Admin/>
          </AdminOnlyRoute>
        }/>
        
        <Route path='/singleproductpage/:id' element={<ProductDetails/>}/>

      </Routes>
    </BrowserRouter>

  )
}

export default App