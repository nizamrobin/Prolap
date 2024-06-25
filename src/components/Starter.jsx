import { useState, useEffect } from "react";
import GoogleAuth from "../GoogleAuth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc } from "firebase/firestore";



export default function Starter() {
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
    <>
    <h1 className="text-6xl text-emerald-500 mb-8">
      Hi !
    </h1>
    <GoogleAuth auth={auth} addUser={addUser}  content={<img className="w-60 ring-4 ring ring-emerald-300" src="assets/google-signin.png" alt= "Google Sign In"/>} />
    </>
  );
}
