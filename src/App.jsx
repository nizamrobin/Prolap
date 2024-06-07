import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Chatbox from "./components/message/Chatbox";
import Starter from "./components/Starter";
import Friends from "./components/tab/Friends";
import F1 from "./components/tab/F1";
import Welcome from "./components/Welcome";
import Tabs from "./components/tab/Tabs";

export const TabPanelContext = createContext(null);

// Reducer function that determine which component to show based on the selected tab on Tab Panel
const tabReducer = (tabPanel, action) => {
  switch (action) {
    case "friends": {
      return (tabPanel = <Friends />);
    }
    case "f1": {
      return (tabPanel = <F1 />);
    }
    case "chatbox": {
      return (tabPanel = <Chatbox dbCol="messages" />);
    }
    default: {
      return (tabPanel = <Chatbox dbCol={action} />);
    }
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [tabPanel, tabDispatch] = useReducer(tabReducer, "");

  // Changes the user state based on login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  // UI's showed in screen
  return (
    <div className="h-dvh overflow-y-clip relative">
      {/* Under development Notice. Need to remove when build is completed */}
      <h2 className="absolute top-0 right-0 left-0 bg-red-300 text-white text-center font-bold">
        This is under-development
      </h2>

      {/* Nav Component */}
      <Nav />

      {/* Main area where components are showed */}
      <div className="h-4/5 overflow-y-clip">
        <TabPanelContext.Provider value={tabDispatch}>
          {/* Will be displayed only user is logged in */}
          {user && <Tabs />}

          {/* user not logged in: Starter page will be showed. 
              user logged in: tabpanel and welcome page will be showed.
              user logged in & any tab button clicked: tabpanel and that clicked tab correspondent panel will be showed.
            */}
          {!user ? <Starter /> : tabPanel ? tabPanel : <Welcome />}
        </TabPanelContext.Provider>
      </div>
    </div>
  );
}

export default App;

// Todo:
// 1. Welcome page design
//
