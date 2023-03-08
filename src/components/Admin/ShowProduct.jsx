import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {database, storage} from '../../firebase/config'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import Loader from '../Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
import {STORE_PRODUCTS} from '../../redux/slice/productSlice'

const ShowProduct = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
  }, [])
  

  const getProducts = () => {
    setIsLoading(true);

    try{
      const productsRef = collection(database, "products")
      const q = query(productsRef, orderBy("createdAt", "desc"))

      onSnapshot(q, (snapshot)=>{
        // console.log(snapshot)

        const allProductsData = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        })) 
        // console.log("products: ", allProductsData)
        setProducts(allProductsData)
        dispatch(STORE_PRODUCTS({
          products: allProductsData
        }))
        setIsLoading(false)
      })

    }catch(error){
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      'Delete Product',
      'Do you really want to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageUrl)
      },
      {
        width: '320px',
        borderRadius: '3px',
        // etc...
      },
    );
  }

  const deleteProduct = async(id, imageUrl) => {
    try { 
      await deleteDoc(doc(database, "products", id));
      const storageRef = ref(storage, imageUrl)
      await deleteObject(storageRef);
      toast.success("Successfully Deleted Product")

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className='w-full'>
      <h2>All Products</h2> 
      {products.length === 0 ? (
        <p>
          There is no product in Database.
        </p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>Sr/no</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price </th>
            <th className='ml-9'>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            products.map((item, index)=>{
              const {id, name, price, category, imageUrl} = item;
              return (
                
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td><img src={imageUrl} alt="" style={{width: "100px"}}/></td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`₹ ${price}`}</td>
                    <td className='flex ml-9'>
                      <Link to={`/admin/add-products/${id}`}><FaEdit size={20} color="green"/></Link>
                      &nbsp;
                        <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageUrl)}/>
                    </td>
                  </tr>
                
              )
            })
          }
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default ShowProduct