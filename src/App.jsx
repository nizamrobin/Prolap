import { useEffect, useState } from "react";
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
  const [tab, setTab] = useState("");

  const sTabb = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    setTab({ e });
  };

  // useEffect(() => {
  //   console.log(tab);
  // }, [tab]);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return (
    <div className="h-dvh overflow-y-clip relative">
      <Nav />
      <div className="h-4/5 overflow-y-clip">
        {/* <Tabs setTab={setTab} /> */}
        <ul className="bg-slate-100 flex gap-4 p-2 absolute top-20">
          <li key="1">
            <button
              onClick={(e) => setTab(e.target.value)}
              type="button"
              value="friends"
              className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
            >
              Friends
            </button>
          </li>
          {/* <li key="2">
            <button
              onClick={(e) => setTab(e.target.value)}
              type="button"
              value="f1"
              className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
            >
              f1
            </button>
          </li>
          <li key="3">
            <button
              onClick={(e) => setTab(e.target.value)}
              type="button"
              value="f2"
              className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
            >
              F2
            </button>
          </li>
          <li key="4">
            <button
              onClick={(e) => setTab(e.target.value)}
              type="button"
              value="f3"
              className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
            >
              F3
            </button> */}
          {/* </li> */}
        </ul>
        {/* {!user ? <Starter /> : tab ? <Friends /> : <Welcome />} */}
        {/* {!user ? <Starter /> : <Chatbox />} */}
      </div>
    </div>
  );
}

export default App;

// Todo:
// 1. Welcome page design
//
