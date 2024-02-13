import { useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import GoogleAuth from "../GoogleAuth";
import Signout from "../Signout";

export default function Navbar() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return (
    <nav className="flex justify-between p-6">
      <h1>Bondhu</h1>
      {user ? <Signout auth={auth} /> : <GoogleAuth auth={auth} />}
    </nav>
  );
}
