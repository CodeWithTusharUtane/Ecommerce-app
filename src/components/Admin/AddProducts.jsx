import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { database, storage } from "../../firebase/config";

const categories = [
  { id: 1, name: "Watch" },
  { id: 2, name: "Wireless Earphones" },
  { id: 3, name: "NeckBands" },
  { id: 4, name: "Headphones" },
];

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setProduct({ ...product, imageUrl: downloadURL });
        // toast.success("Image upload successfully");
      });
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log("first:", product);

    try {
      const docRef = addDoc(collection(database, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      toast.success("Product added successfully")
      navigate('/admin/all-products')
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <div>
        <form onSubmit={addProduct}>
          <label>Product Name: </label>
          <input
            type="text"
            placeholder="Product Name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Image: </label>
          <input
            type="file"
            placeholder="Product Image"
            accept="image/*"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            disabled
          />

          <label>Product Price:</label>
          <input
            type="number"
            required
            name="price"
            value={product.price}
            placeholder="Product Price"
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="" disabled>
              --Choose The Product Category--
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <label>Product Brands</label>
          <input
            type="text"
            placeholder="Product Brand"
            name="brand"
            value={product.brand}
            required
            onChange={(e) => handleInputChange(e)}
          />

          <button>Add Product</button>
          <label>Product Description: </label>
          <textarea
            name="desc"
            value={product.desc}
            required
            cols="30"
            rows="10"
            onChange={(e) => handleInputChange(e)}
          ></textarea>

          <button>Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
