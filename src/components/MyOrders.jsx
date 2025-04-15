import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaBoxOpen } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        fetchOrders(currentUser.uid);
      } else {
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId) => {
    setLoading(true);
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(ordersQuery);
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaBoxOpen className="text-blue-600" />
        My Orders
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center text-lg">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-600">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">Order ID:</p>
                <p className="text-sm font-medium text-gray-700">{order.id}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">Total Amount:</p>
                <p className="text-lg font-semibold text-blue-600">₹{order.total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Placed on:</p>
                <p className="text-sm text-gray-700">{order.date.toDate().toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
