import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-orange-800 cursor-pointer">
      Logout
    </button>
  );
};

export default LogoutButton;
