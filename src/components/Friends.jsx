import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function Friends() {
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

  return (
    <ul className="bg-emerald-100 flex flex-col absolute top-32 bottom-0 left-0 right-0 overflow-y-scroll p-4">
      <li key="chatbox">
        <img src="" alt="user image" />
        <h4>Chatbox</h4>
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
  );
}
