import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50 text-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="flex gap-2 font-bold text-2xl items-center text-blue-700 hover:text-blue-900 transition-all">
            <img
              className="w-10 h-10 object-cover rounded-full shadow"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/c5ce3f121576489.Y3JvcCwxMDgwLDg0NCwwLDExNw.jpg"
              alt="logo"
            />
            MyKart
          </h1>
        </Link>

        {/* Hamburger icon */}
        <div className="md:hidden text-3xl text-gray-700 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Nav Menu */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full right-4 w-[40%] bg-white/90 shadow-lg rounded-lg p-6 text-center md:static md:flex md:items-center md:gap-6 md:p-0 md:bg-transparent md:shadow-none md:rounded-none md:w-auto`}
        >
          {user ? (
            <>
              <Link className="block md:inline hover:text-blue-600 font-medium py-2 transition-all" to="/profile">
                👤 {user.displayName || "User"}
              </Link>
              
            </>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="block md:inline bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1 rounded-full transition-all mt-2 md:mt-0 mx-auto"
            >
              Login
            </button>
          )}

          <Link className="block md:inline hover:text-blue-600 font-medium py-2 transition-all" to="/about">
            About
          </Link>
          <Link className="block md:inline hover:text-blue-600 font-medium py-2 transition-all" to="/contact">
            Contact
          </Link>
          <Link className="block md:inline hover:text-blue-600 font-medium py-2 transition-all flex items-center justify-center" to="/cart">
            🛒 Cart
            <span className="bg-red-600 text-white text-xs rounded-full px-2 ml-1">
              {cartCount}
            </span>
          </Link>
          <Link className="block md:inline hover:text-blue-600 font-medium py-2 transition-all" to="/myorders">
            Orders
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
