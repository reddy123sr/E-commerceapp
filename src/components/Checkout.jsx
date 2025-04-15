import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    payment: "Card",
  });

  const buyNowProduct = location.state?.buyNowProduct || null;
  const productsToBuy = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1, price: buyNowProduct.price }]
    : cartItems;

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const totalAmount = productsToBuy.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    if (!userDetails.name.trim() || !userDetails.address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const orderData = {
      userId: user.uid,
      userDetails,
      products: productsToBuy,
      total: totalAmount,
      date: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      alert("Order placed successfully! 🎉");

      if (!buyNowProduct) {
        dispatch(clearCart()); // Only if cart order
      }

      setOrderPlaced(true);
      setLoading(false);

      setTimeout(() => {
        navigate("/myorders");
      }, 2000);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-19">
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>

      {orderPlaced ? (
        <div className="text-center p-4 bg-green-200 text-green-800 rounded">
          <h3 className="text-xl font-bold">Order Placed Successfully! 🎉</h3>
          <p>Redirecting to "My Orders"...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Order Summary:</h3>
            {productsToBuy.length === 0 ? (
              <p className="text-red-500">No items in cart!</p>
            ) : (
              <ul className="bg-white p-4 rounded shadow-md">
                {productsToBuy.map((item) => (
                  <li key={item.id} className="flex justify-between py-2 border-b">
                    <span>{item.title} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">User Details:</h3>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="w-full p-2 border rounded mb-2"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              className="w-full p-2 border rounded mb-2"
              onChange={handleInputChange}
              required
            />
            <select
              name="payment"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            >
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
