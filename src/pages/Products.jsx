import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, database } from "../firebase/config";
const Products = () => {
  const [productD, setProductD] = useState([]);
  const productRef = collection(database, "products");
  const [select, setSelect] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(productRef);
      setProductD(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  //getting current user uid: to check wheather authenticated or not!!
  function GetUserUid (){
    const [uid, setUid] = useState(null);
    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setUid(user.uid);
        }
  })},[])
  return uid;
  }

  const uid = GetUserUid();
  // console.log(uid)

  let Product;
  const AddToCart = async(item) => {
    if(uid!=null){
      // console.log(item.pname);
      Product = item;
      Product['qty'] = 1;
      
      const prices = Product.pprice.slice(2)
      Product["TotalProductPrice"] = Product.qty*prices;
      const productRef = collection(database, "cart"+uid);
      const citem = item.id;
        toast.success("Added to Cart")
      // await addDoc(productRef, citem , {Product}).then(()=>{
      //   // toast.success(item.id)
      // })
      
      await setDoc(doc(database, "cart"+uid , item.id), {Product});
    }else{
      navigate("/login")
    }
  }

  

  return (
    <>

    <div className="bg-[#E3DFFD] text-[#2B3467] text-center p-3">
      <label htmlFor="category" className="font-bold text-xl mr-2">Category: </label>
      <select name="cat" id="" value={select} onChange={(e)=>setSelect(e.target.value)} className="bg-[#2b3467] text-[#e3dffd] p-1 rounded-md text-center">
        <option value="all">All</option>
        <option value="watch">Watch</option>
        <option value="headphone">Headphone</option>
        <option value="neckband">Neckband</option>
        <option value="buds">Wireless Buds</option>
      </select>
    </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 bg-[#e3dffd] text-center">
        {productD.map((item) => {
          if(select === "all"){
            return (
              <div
              key={item.id}
              className="border-4 border-black/10 m-5 text-center  p-2 shadow-lg rounded-lg hover:scale-105 duration-300 "
              >
              <img src={item.purl} alt="" />
              <div className="h-1 w-full bg-black/10"></div>
              <div className="pt-3 text-2xl">{item.pname}</div>
              <div className="pt-2">{item.pprice}</div>
              <div className="pt-2 ">
              <button className="bg-[#2b3467] text-[#e3dffd] p-1 mb-2 px-2 rounded-md" onClick={()=>AddToCart(item)}>
                Add to Cart
              </button>
              </div>
            </div>
          );
        }else if(select === "watch" && item.pcat === "watch"){
          return (
            <div
            key={item.id}
            className="border-4 border-black/10 m-5 text-center  p-2 shadow-lg rounded-lg hover:scale-105 duration-300 "
            >
            <img src={item.purl} alt="" />
            <div className="h-1 w-full bg-black/10"></div>
            <div className="pt-3 text-2xl">{item.pname}</div>
            <div className="pt-2">{item.pprice}</div>
            <div className="pt-2 ">
            <button className="bg-[#2b3467] text-[#e3dffd] p-1 mb-2 px-2 rounded-md" onClick={()=>AddToCart(item)}>
              Add to Cart
            </button>
            </div>
          </div>
        );
        }else if(select === "headphone" && item.pcat === "headphone"){
          return (
            <div
            key={item.id}
            className="border-4 border-black/10 m-5 text-center  p-2 shadow-lg rounded-lg hover:scale-105 duration-300 "
            >
            <img src={item.purl} alt="" />
            <div className="h-1 w-full bg-black/10"></div>
            <div className="pt-3 text-2xl">{item.pname}</div>
            <div className="pt-2">{item.pprice}</div>
            <div className="pt-2 ">
            <button className="bg-[#2b3467] text-[#e3dffd] p-1 mb-2 px-2 rounded-md" onClick={()=>AddToCart(item)}>
              Add to Cart
            </button>
            </div>
          </div>
        );
        }else if(select === "neckband" && item.pcat === "neckband"){
          return (
            <div
            key={item.id}
            className="border-4 border-black/10 m-5 text-center  p-2 shadow-lg rounded-lg hover:scale-105 duration-300 "
            >
            <img src={item.purl} alt="" />
            <div className="h-1 w-full bg-black/10"></div>
            <div className="pt-3 text-2xl">{item.pname}</div>
            <div className="pt-2">{item.pprice}</div>
            <div className="pt-2 ">
            <button className="bg-[#2b3467] text-[#e3dffd] p-1 mb-2 px-2 rounded-md" onClick={()=>AddToCart(item)}>
              Add to Cart
            </button>
            </div>
          </div>
        );
        }else if(select === "buds" && item.pcat === "bud"){
          return (
            <div
            key={item.id}
            className="border-4 border-black/10 m-5 text-center  p-2 shadow-lg rounded-lg hover:scale-105 duration-300 "
            >
            <img src={item.purl} alt="" />
            <div className="h-1 w-full bg-black/10"></div>
            <div className="pt-3 text-2xl">{item.pname}</div>
            <div className="pt-2">{item.pprice}</div>
            <div className="pt-2 ">
            <button className="bg-[#2b3467] text-[#e3dffd] p-1 mb-2 px-2 rounded-md" onClick={()=>AddToCart(item)}>
              Add to Cart
            </button>
            </div>
          </div>
        );
        }


        })}
      </div>
    </>
  );
};

export default Products;
