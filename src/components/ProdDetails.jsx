import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../redux/cartSlice';

const ProdDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="text-center mt-10 text-lg">Loading Product...</h2>;
  if (!product) return <h2 className="text-center mt-10 text-lg text-red-600">Product not found</h2>;

  const handleBuyNow = () => {
    navigate("/checkout", { state: { buyNowProduct: product } });
  };

  const { title, price, description, category, image, rating } = product;
  const { rate, count } = rating;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back to Products</Link>

      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-center items-center md:w-1/2">
          <img src={image} alt={title} className="w-60 h-60 object-contain" />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 capitalize mb-1">{category}</p>
          <p className="text-yellow-700 font-medium mb-1">⭐ {rate} ({count} reviews)</p>
          <p className="text-gray-800 text-xl font-bold mb-3">₹{price}</p>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => dispatch(addtoCart(product))}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDetails;
