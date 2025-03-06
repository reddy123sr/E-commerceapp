import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Success:", result.user);
      
      // ✅ Redirect to Profile page after successful login
      navigate("/profile");
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(`Google Login Failed: ${error.message}`);
    }
  };


  return (
    <button
  className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 active:scale-95 transition-transform duration-200"
  onClick={handleGoogleLogin} // Make sure you have this function
>
  <img src="https://www.svgrepo.com/show/475656/google-color.svg" 
       alt="Google Logo" className="w-5" />
  <span className="font-medium">Sign in with Google</span>
</button>
  );
};

export default GoogleLoginButton;