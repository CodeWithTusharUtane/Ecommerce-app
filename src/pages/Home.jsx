import Admin from "../components/Admin/AdminOnlyRoute"
import Product from "../components/Products/Product"
import Slider from "../components/Slider"

const Home = () => {

  // here add window object and an arrow function to Scroll directly to the products section. after styling

  return (
    <div>
      <div className='w-full'>
        {/* <Slider/> */}
        <Product/>
      </div>
    </div>
  )
}

export default Home