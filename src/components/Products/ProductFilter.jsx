import React from 'react'

const ProductFilter = () => {
  return (
    <div>
      <h2>Categories</h2>
      <div>
        <button>All</button>
      </div>
      <h4>Brand</h4>
      <div>
        <select name="brand">
          <option value="all">All</option>
        </select>
      </div>
      <h4>Price</h4>
      <p>$1500</p>
      <div>
        <input type="range" name='price' min="100" max="1000" />
      </div>
      <br />
      <button>Clear Filter</button>
    </div>
  )
}

export default ProductFilter