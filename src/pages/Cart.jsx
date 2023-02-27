import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
// import { getDownloadURL, listAll, ref } from "firebase/storage";storage
import React, { useEffect, useState } from "react";
import { database,  } from "../firebase/config";
const Cart = () => {
  const [itemList, setItemList] = useState([]);
  // const [imageList, setImageList] = useState([]);
  const itemListRef = collection(database, "CartItems");

  const deletingTheItem = async(id) => {
    const itemDoc = doc(database, "CartItems", id)
    await deleteDoc(itemDoc)
    getItemList();
  }
  const getItemList = async () => {
    //Reading the Data from Database.
    try {
      const data = await getDocs(itemListRef);
      const filteredData = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setItemList(filteredData)
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getItemList();
  }, []);

  // const imageListRef = ref(storage, "images/")
  // useEffect(()=>{
  //   listAll(imageListRef).then((response)=>{
  //     response.items.forEach((item)=>{
  //       getDownloadURL(item).then((url)=>{
  //         setImageList((prev)=>[...prev, url])
  //       })
  //     })
  //   })
  // },[])

  return <div>This your cart Data.
    <div>{itemList.map((item)=>{
      return(
        <div key={item.id}>
          <div>name: {item.nameOfTheProduct}</div>
          <div>price: {item.priceOfTheProduct}</div>  
          <div>id: {item.id}</div>
          <div className="">
            {/* <img src="" alt="" /> */}
          </div>          
          <span className="border-2 border-black"><button onClick={()=>deletingTheItem(item.id)}>Delete</button> </span>
        </div>
      )
    })}</div>
  </div>;
};

export default Cart;
