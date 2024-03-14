import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Chatbox from "./components/Chatbox";
import Starter from "./components/Starter";
import Friends from "./components/Friends";
import F1 from "./components/F1";
import Welcome from "./components/Welcome";
import Tabs from "./components/Tabs";

function App() {
  const [user, setUser] = useState(null);
  const reducer = (selectedTab, action) => {
    switch (action) {
      case "friends": {
        return (selectedTab = <Friends />);
      }
      case "f1": {
        return (selectedTab = <F1 />);
      }
    }
  };

  const [selectedTab, dispatch] = useReducer(reducer, "");
  // console.log(selectedTab.type.name.toLowerCase());

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // console.log(selectedTab.type.name.toLowerCase());
  }, [selectedTab]);

  return (
    <div className="h-dvh overflow-y-clip relative">
      <Nav />
      <div className="h-4/5 overflow-y-clip">
        {user && <Tabs dispatch={dispatch} selectedTab={selectedTab} />}

        {!user ? <Starter /> : selectedTab ? selectedTab : <Welcome />}
        {/* {!user ? <Starter /> : <Chatbox />} */}
      </div>
    </div>
  );
}

export default App;

// Todo:
// 1. Welcome page design
//
