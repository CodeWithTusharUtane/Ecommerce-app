import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Admin/Navbar'
import Home from '../Admin/Home'
import ShowProduct from '../Admin/ShowProduct'
import AddProducts from '../Admin/AddProducts'
import Orders from '../Admin/Orders'

const Admin = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
        <Routes>
          <Route path='home' element={<Home/>}/>
          <Route path='all-products' element={<ShowProduct/>}/>
          <Route path='add-products' element={<AddProducts/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin