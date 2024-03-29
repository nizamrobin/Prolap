import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { TabPanelContext } from "../App";

export default function Friends() {
  // const tabContext = useContext(TabPanelContext);
  // console.log(tabContext);
  const [userList, setUserList] = useState([]);
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

  // const handleOnClick = () => {};

  return (
    <TabPanelContext.Consumer>
      {(tabDispatch) => (
        <ul className="bg-emerald-100 flex flex-col absolute top-32 bottom-0 left-0 right-0 overflow-y-scroll p-4">
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
          {userList.map((user) => {
            return (
              <li key={user.id}>
                <img src={user.avatar} alt="user image" />
                <h4>{user.name}</h4>
              </li>
            );
          })}
        </ul>
      )}
    </TabPanelContext.Consumer>
  );
}
