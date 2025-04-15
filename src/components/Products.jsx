import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";

const Products = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [prs, setPrs] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setPrs(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">🛒 Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {prs.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 group"
          >
            <button
              className="top-4 right-4 text-xl"
              onClick={() => dispatch(toggleWishlist(product))}
            >
              <FaHeart
                className={`transition-colors duration-300 ${
                  wishlist.some((item) => item.id === product.id)
                    ? "text-red-500"
                    : "text-gray-400 group-hover:text-red-300"
                }`}
              />
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mx-auto mb-4 group-hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3">₹{product.price}</p>

            <Link
              to={`/product/${product.id}`}
              className="inline-block text-center w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium py-2 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
            >
              View Details &raquo;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
