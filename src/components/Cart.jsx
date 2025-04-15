import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  decreaseQuantity,
  removefromCart,
} from "../redux/cartSlice";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold text-gray-700">Your Cart is Empty!</h2>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Shopping Cart 🛒
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center border-b pb-4"
              >
                <div className="flex items-center w-full md:w-2/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center mt-4 md:mt-0 gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addtoCart(item))}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => dispatch(removefromCart(item))}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Summary</h3>
          <p className="mb-2 text-gray-700">Total Items: {totalItems}</p>
          <p className="mb-6 text-gray-700 text-lg font-medium">
            Total Price: ₹{totalPrice.toFixed(2)}
          </p>

          {user ? (
            <Link
              to="/checkout"
              className="w-full block text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Login to Checkout
            </button>
          )}

          <Link
            to="/"
            className="block mt-4 text-center text-blue-600 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
