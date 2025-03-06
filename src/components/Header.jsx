import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
function Header(){
    const {cart,cartCount}=useCart();
    const [user, setUser] = useState(null);

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
        <header className="Header bg-gray-200 text-black p-4 text-sm
        flex justify-between">
        <Link to='/'><h1 className="flex gap-2 font-mono text-3xl cursor-pointer">
            <img className="w-12 rounded-4xl"
            src="https://mir-s3-cdn-cf.behance.net/projects/404/c5ce3f121576489.Y3JvcCwxMDgwLDg0NCwwLDExNw.jpg"/>
            MyKart
        </h1></Link>
        <nav className="my-auto">
        {user ? (
          <>
            <Link to="/profile" className="mx-3 hover:text-orange-400 border  rounded-full px-2 ">
              {/* <img src={"https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"} alt="User" className="w-8 h-8 rounded-full" /> */}
              
              👤{user.displayName}
            </Link>
            
          </>
        ) : (
          <Link to='/profile'><button onClick={handleGoogleLogin} className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
            Login
          </button></Link>
        )}
            <Link className="mx-3 hover:text-orange-400 border  rounded-full px-2 " to="/about">About</Link>
            <Link className="mx-3 hover:text-orange-400 border  rounded-full px-2 " to="/contact">Contact</Link>
            <Link className="mx-3 hover:text-orange-400 border  rounded-full px-2 " to="/cart">
            🛒Cart
            <button className="align-top bg-red-600 text-black rounded-full px-2 -my-3">{cartCount}</button>
            </Link>
            <Link className="mx-3 hover:text-orange-400 border  rounded-full px-2 " to="/myorders">Orders</Link>
        </nav>
        </header>
    )
};
export default Header;