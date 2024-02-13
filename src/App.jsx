import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Chatbox from "./components/Chatbox";
import Welcome from "./components/Welcome";

function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return (
    <>
      <Navbar />
      {user ? <Chatbox /> : <Welcome />}
    </>
  );
}

export default App;
