import React from 'react'
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromwishlist } from '../redux/wishlistSlice';
import { addtoCart } from '../redux/cartSlice';

const Wishlist = () => {
  const wishlist=useSelector((state)=>state.wishlist)
  const dispatch=useDispatch()
    //const {wishlist,toggleWishlist,addToCart}=useCart()
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
          {wishlist.map((item) => (
            <div key={item.id} className="p-6 bg-white shadow-lg rounded-md text-center">
              <div className="w-full h-30 flex justify-center items-center mb-4 overflow-hidden">
  <img src={item.image} alt="img" className="max-h-full object-contain" />
</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">₹{item.price}</p>
          

              {/* Remove from Wishlist Button */}
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => dispatch(removeFromwishlist(item))}
              >
                Remove from Wishlist
              </button>

              {/* Move to Cart Button */}
              <button
                className="mt-4 px-4 py-2 cursor-pointer bg-green-500 text-white rounded-lg m-4"
                onClick={() => {
                  dispatch(addtoCart(item));
                  dispatch(removeFromwishlist(item)); // Remove from wishlist after adding to cart
                }}
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">
          No items in wishlist.<br></br>
        <Link to='/'>
        <button className='bg-blue-600 px-4 mx-1 rounded text-white my-4 hover:bg-green-600 cursor-pointer'>Go Home</button></Link></p>
      )}
    </div>
  )
}

export default Wishlist;