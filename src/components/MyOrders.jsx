import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
        setOrders([]); // No orders if user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId) => {
    setLoading(true);

    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", userId) // ✅ Fetch only this user's orders
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow-md">
          {orders.map((order) => (
            <li key={order.id} className="border-b py-2">
              <p className="font-bold">Order ID: {order.id}</p>
              <p>Total: ₹{order.total}</p>
              <p>Placed on: {order.date.toDate().toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
