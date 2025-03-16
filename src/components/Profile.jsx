import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "./Logout.";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        
        {user ? (
          <div>
            <img
              src={"https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-semibold">{user.displayName}</p>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex flex-col gap-2">
                <LogoutButton/>
                <Link to='/wishlist'><button className="cursor-pointer bg-blue-600 p-3 rounded hover:bg-blue-800 text-white w-sm">Your wishlist{`>>`}</button></Link>
            </div>
          </div>
        ) : (
          <p>Please <a href="/login" className="text-blue-500">Login</a> to view your profile.
          <span> or <a href="/signup" className="text-red-800">Signup</a></span></p>
        )}
      </div>
    </div>
  );
};

export default Profile;
