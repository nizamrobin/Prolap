import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import GoogleAuth from "../../GoogleAuth";
import Signout from "../../Signout";
import { collection, setDoc, doc } from "firebase/firestore";

export default function Navbar() {
  const [user, setUser] = useState(null);

  // Create New Users Info in db
   const addUser = async () => {
    const { displayName, photoURL, uid } = auth.currentUser;
    await setDoc(doc(db, "users", uid), {
      name: displayName,
      avatar: photoURL,
      uid,
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <nav className="flex justify-between px-4 py-2 bg-emerald-300 border-b-4 border-[#D9196B]">
      <h1 className="font-bold text-2xl">
        <img src="assets/prolap8png.png" alt=""  className="w-32"/>
      </h1>
      {user ? (
        <Signout auth={auth} />
      ) : (
        <GoogleAuth auth={auth} addUser={addUser} content={<img className="w-8" src="assets/login-svgrepo-com.svg" alt="Sign In" />} />
      )}
    </nav>
  );
}
