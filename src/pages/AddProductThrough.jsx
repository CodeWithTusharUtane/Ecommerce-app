import { database, storage } from "../firebase/config";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection,  } from "firebase/firestore";
import { toast } from "react-toastify";



const AddProductThrough = () => {
  const [imageUpload, setImageUpload] = useState(null);
  // const [imageList, setImageList] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // const imageListRef = ref(storage, "images");
  const productRef = collection(database, "products");
  
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imgRef = ref(storage, imageUpload.name);
    uploadBytes(imgRef, imageUpload).then((response) => {});
    getDownloadURL(ref(storage, imageUpload.name)).then(url=>{
      addDoc(productRef, {pname: name, pprice: price, pcat: category, purl: url})
      toast.success("added successfully")
    })

  };
  
  return (
    <div>
      AddProductThrough
      <form onSubmit={handleSubmit}>
        <input
          className="w-2/3 h-14"
          type="text"
          placeholder="Enter the name of the product"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          className="w-2/3 h-14"
          type="text"
          placeholder="Enter the price of the product"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input
          className="w-2/3 h-14"
          type="text"
          placeholder="Enter the category of the product"
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <br />
        <button
          className="bg-black text-white p-3"
          type="submit"
        >
          Add product
        </button>
      </form>
    </div>
  );
};

export default AddProductThrough;
