import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleProductPage from './pages/SingleProductPage'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Products from './pages/Products'
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/singleproductpage/:id' element={<SingleProductPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App