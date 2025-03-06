import React from 'react'
import { useCart } from './CartContext'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
const Cart = () => {
    const {cart,removeItem,DecreaseQuantity}=useCart();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => unsubscribe();
    }, []);
  
  
    if (cart.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty!</h2>
            <Link to="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Continue Shopping
            </Link>
          </div>
        );
      }
    
      return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
          
          <ul className="divide-y divide-gray-300">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <p className="text-lg font-semibold">{item.title}-₹{item.price}</p>
                  <div className='flex items-center'>
                    
                    <button onClick={() => DecreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 cursor-pointer">-</button>
                        <span className="px-4">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="px-2 py-1 bg-gray-200">+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
    
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <Link to="/checkout">
            {user ? (
            <Link to="/checkout" className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded text-center">
              Go to Checkout
            </Link>
          ) : (
            <button
              className="block mt-4 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Login to Checkout
            </button>
          )}
            </Link>
          </div>
        </div>
      );
    };

export default Cart;