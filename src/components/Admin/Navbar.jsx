import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div>

      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/admin/home'>
                Home
            </NavLink>
            <NavLink to='/admin/all-products'>
                Show Products
            </NavLink>
            <NavLink to='/admin/add-products/ADD'>
                Add Product
            </NavLink>
            <NavLink to='/admin/order'>
                Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar