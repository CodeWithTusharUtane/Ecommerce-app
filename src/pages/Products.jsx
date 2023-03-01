import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, database } from "../firebase/config";
const Products = () => {
  const [productD, setProductD] = useState([]);
  const productRef = collection(database, "products");

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
  const AddToCart = (item) => {
    if(uid!=null){
      // console.log(item.pname);
      Product = item;
      Product['qty'] = 1;
      
      const prices = Product.pprice.slice(2)
      Product["TotalProductPrice"] = Product.qty*prices;
      const productRef = collection(database, "cart"+uid);
      
      addDoc(productRef, {Product}).then(()=>{
        toast.success("Added to Cart")
      })
    }else{
      navigate("/login")
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 ">
        {productD.map((item) => {
          
          return (
            <div
              key={item.id}
              className="border-4 border-black/10 m-5 text-center  p-2 shadow-lg rounded-lg hover:scale-105 duration-300"
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
        })}
      </div>
    </>
  );
};

export default Products;
