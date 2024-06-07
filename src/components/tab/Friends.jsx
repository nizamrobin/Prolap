import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { TabPanelContext } from "../../App";
// import { auth } from "firebase/auth";

export default function Friends() {
  const [userList, setUserList] = useState([]);
  // console.log(auth.currentUser.uid);

  // Fetch user info from db and creates a user array that being used to update userList State
  useEffect(() => {
    const q = query(collection(db, "users"));
    const userSnapshot = onSnapshot(q, (item) => {
      const usersArr = [];
      item.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUserList(usersArr);
    });
    return () => userSnapshot;
  }, []);

  return (
    // tabDispatch is used in context consumer that returns data to tabReducer function of App.js. This data helps to identify which panel to show
    <TabPanelContext.Consumer>
      {(tabDispatch) => (
        <ul className="bg-emerald-100 flex flex-col absolute top-32 bottom-0 left-0 right-0 overflow-y-scroll p-4">
          {/* chatbox is the default chat option where every user has access to */}
          <li key="chatbox">
            <button
              value="chatbox"
              onClick={() => tabDispatch("chatbox")}
              type="button"
            >
              <img src="" alt="user image" />
              <h4>Chatbox</h4>
            </button>
          </li>

          {/* return the list of users stored in db. */}
          {userList.map((user) => {
            return (
              auth.currentUser.uid !== user.id && (
                <li key={user.id}>
                  <button
                    value={user.name}
                    onClick={() => tabDispatch(`${user.id}`)}
                    type="button"
                  >
                    <img src={user.avatar} alt="user image" />
                    <h4>{user.name}</h4>
                  </button>
                </li>
              )
            );
          })}
        </ul>
      )}
    </TabPanelContext.Consumer>
  );
}
