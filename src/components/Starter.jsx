import { useState, useEffect } from "react";
import GoogleAuth from "../GoogleAuth";
// import { db, auth } from "../firebase";
import {auth, db} from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";



export default function Starter() {
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
    <div className="bg-hero-full bg-cover bg-center w-full h-full flex justify-center items-end">
    {/* <img className="absolute h-full" src="assets/prolap10.PNG" alt="app big logo" /> */}
    <GoogleAuth auth={auth} addUser={addUser}  content={<img className="w-60 ring-4 ring-emerald-300 mb-20" src="assets/google-signin.png" alt= "Google Sign In"/>} />
    </div >
  );
}
