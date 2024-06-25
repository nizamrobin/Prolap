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
    await setDoc(doc(collection(db, "users"), uid), {
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
    <nav className="flex justify-between p-4 bg-emerald-200 tracking-[0.25rem] uppercase">
      <h1 className="font-bold text-2xl">Bondhu</h1>
      {user ? (
        <Signout auth={auth} />
      ) : (
        <GoogleAuth auth={auth} addUser={addUser} content="sign in" />
      )}
    </nav>
  );
}
