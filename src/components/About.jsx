import { FaShippingFast, FaLock, FaTags, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-white py-16 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">
          About MyKart
        </h2>

        <p className="text-lg text-center mb-12 text-gray-600">
          We’re on a mission to deliver quality products with unmatched service. From fashion to electronics, MyKart is your trusted online marketplace.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h3>
            <p className="text-gray-600">
              To be the most customer-centric e-commerce platform, where people can find and discover anything they want to buy — with confidence and convenience.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Promise</h3>
            <p className="text-gray-600">
              We ensure a seamless shopping experience with genuine products, secure transactions, and timely deliveries. Our commitment is to serve you better every day.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <FaShippingFast className="text-3xl text-blue-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-1">Fast Delivery</h4>
            <p className="text-sm text-gray-500">Quick shipping across the country</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <FaLock className="text-3xl text-green-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-1">Secure Payments</h4>
            <p className="text-sm text-gray-500">100% safe & encrypted checkout</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <FaTags className="text-3xl text-pink-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-1">Great Deals</h4>
            <p className="text-sm text-gray-500">Exclusive offers every season</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <FaUsers className="text-3xl text-yellow-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold mb-1">Happy Customers</h4>
            <p className="text-sm text-gray-500">Trusted by thousands daily</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-xl font-medium text-gray-700">
            Thank you for choosing <span className="text-blue-600 font-bold">MyKart</span> — where your satisfaction comes first.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
