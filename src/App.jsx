import { createContext, useEffect, useReducer, useState } from "react";
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

export const TabPanelContext = createContext(null);
function App() {
  const [user, setUser] = useState(null);

  const tabReducer = (tabPanel, action) => {
    switch (action) {
      case "friends": {
        return (tabPanel = <Friends />);
      }
      case "f1": {
        return (tabPanel = <F1 />);
      }
      case "chatbox": {
        return (tabPanel = <Chatbox />);
      }
    }
  };

  const [tabPanel, tabDispatch] = useReducer(tabReducer, "");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="h-dvh overflow-y-clip relative">
      <h2 className="absolute top-0 right-0 left-0 bg-red-300 text-white text-center font-bold">
        This is under-development
      </h2>
      <Nav />
      <div className="h-4/5 overflow-y-clip">
        <TabPanelContext.Provider value={tabDispatch}>
          {user && <Tabs />}
          {!user ? <Starter /> : tabPanel ? tabPanel : <Welcome />}
        </TabPanelContext.Provider>
        {/* {!user ? <Starter /> : <Chatbox />} */}
      </div>
    </div>
  );
}

export default App;

// Todo:
// 1. Welcome page design
//
