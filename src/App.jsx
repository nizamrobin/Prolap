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
    <div className="h-dvh overflow-y-clip relative">
      <Navbar />
      {user ? <Chatbox /> : <Welcome />}
    </div>
  );
}

export default App;


// Todo: 
// 1. Welcome page design
// 