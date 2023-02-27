import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
// import { neckband } from '../data/neckbandData'
// import { headphones } from '../data/headphonesData'
// import { buds } from '../data/budsData'
// import { watch } from '../data/watchData'
import { all } from "../data/allData";
import { database,  } from "../firebase/config";
// import { v4 } from "uuid";
const Products = () => {
  // const [newItemName, setNewItemName ] = useState("");
  // const [newItemPrice, setNewItemPrice ] = useState("");
  const itemListRef = collection(database, "CartItems");
  const setItemToCart = async (name, price, ) => {
    try {
      await addDoc(itemListRef, {
        nameOfTheProduct: name,
        priceOfTheProduct: price,
      });
      toast.success("Added to Cart!!");
    } catch (err) {
      console.error(err);
    }
    
  };

  

  return (
    <div className="bg-[#E3DFFD] w-full h-full relative pb-5 text-[#2B3467]">
      {/* Filter */}
      <div className="text-center p-4   mx-2 rounded-lg lg:hidden">
        <label htmlFor="category" className="text-xl">
          Category:
        </label>
        <select className="rounded-sm ml-2 text-center p-1 bg-[#2b3467] text-[#e3dffd] ">
          <option value="">All</option>
          <option value="">Watches</option>
          <option value="">Wireless Buds</option>
          <option value="">Neckband</option>
          <option value="">Headphones</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 ">
        {all.map((item) => {
          const { name, price, image, id } = item;

          return (
            <div
              className="border-4 border-black/10 m-5 text-center rounded-md p-2"
              key={id}
            >
              <img src={image} alt="" />
              <div className="h-1 w-full bg-black/10"></div>
              <div className="pt-3 text-2xl">{name}</div>
              <div className="pt-2">{price}</div>
              <div className="pt-2 ">
                <button
                  className="bg-[#2b3467] text-[#e3dffd] p-1 px-2 rounded-md"
                  onClick={() => setItemToCart(name, price)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className='grid md:grid-cols-3 lg:grid-cols-4 '>
            {
              neckband.map((item)=>{
                return(
                  <div className='border-2 border-black mb-5'>
                    <img src={item.image} alt="" className='w-72'/>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                )
              })
            }
          </div>

          <div className='grid md:grid-cols-3 lg:grid-cols-4 '>
            {
              watch.map((item)=>{
                return(
                  <div className='border-2 border-black mb-5'>
                    <img src={item.image} alt="" className='w-72'/>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                )
              })
            }
          </div>

          <div className='grid md:grid-cols-3 lg:grid-cols-4 '>
            {
              buds.map((item)=>{
                return(
                  <div className='border-2 border-black mb-5'>
                    <img src={item.image} alt="" className='w-72'/>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                )
              })
            }
          </div>

          <div className='grid md:grid-cols-3 lg:grid-cols-4 '>
            {
              headphones.map((item)=>{
                return(
                  <div className='border-2 border-black mb-5'>
                    <img src={item.image} alt="" className='w-72'/>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                )
              })
            }
          </div> */}
    </div>
  );
};

export default Products;
