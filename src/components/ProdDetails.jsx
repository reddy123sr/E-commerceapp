import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from './CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProdDetails = () => {
    const {id}=useParams();
    const { addToCart,buyNow } = useCart();
    const [product,setProduct]=useState();
    const navigate = useNavigate();

    // const {addToCart}= useCart();
    //const prod=products.find((p)=>p.id===parseInt(id))
    //const {name,description,price,image}=prod;
    
  

    useEffect(()=>{
      axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
    },[id])

    if (!product) return <h2>Product not found</h2>;
    const handleBuyNow=()=>{
      navigate("/checkout", { state: { buyNowProduct: product } })
    }
    const handleAddToCart = () => {
      // console.log("Product:", prod); // Check if product data exists
      // console.log("Adding to Cart..."); 
      addToCart(product);
    };
    const { title, price, description, category, image, rating } = product;
    const { rate, count } = rating;
    //const {title,description,price,image}=product?.data;
    return (
      <div className="p-4 border rounded-lg shadow-md">
      <img src={image} alt={title} className="w-32 h-32 object-contain" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500">{category}</p>
      <p className="text-gray-700">₹{price}</p>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-yellow-700">⭐ {rate} ({count} reviews)</p>
      <button onClick={handleAddToCart}
    className="mt-4 bg-green-500 text-white px-4 py-2 rounded active:scale-95 transition-transform duration-200">
    Add to cart
  </button>
  <button onClick={handleBuyNow}
    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer active:scale-95 transition-transform duration-200">
    Buy Now
  </button>  
    </div>
    
  )
}

export default ProdDetails;