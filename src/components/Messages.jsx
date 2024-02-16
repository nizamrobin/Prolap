import { db } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { forwardRef, useEffect, useState } from "react";

export default forwardRef(function Messages(props, ref) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    // console.log(props);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    // messages.length > 0 && console.log(messages);
    return () => unsubscribe;
    // unsubscribe();
  }, []);

  return (
    <>
      {/* {messages.length > 0 && ( */}
      <ul className="bg-emerald-100 flex flex-col absolute top-12 bottom-28 left-0 right-0 overflow-y-scroll pt-2 px-4 mb-2">
        {messages.map((item) => {
          return (
            <li
              key={item.id}
              className={`px-4 py-1 m-1 flex rounded-t-2xl relative max-w-[75%] after:content-[""] after:border after:border-4 after:border-t-transparent  after:absolute  after:bottom-0   ${
                item.uid === props.currentUserId
                  ? "self-end bg-slate-200 rounded-bl-2xl after:border-slate-200 after:border-r-transparent after:left-[100%]"
                  : "self-start bg-emerald-200 rounded-br-2xl after:border-emerald-200 after:border-l-transparent after:right-[100%]"
              }`}
            >
              {item.text}
            </li>
          );
        })}
        <span ref={ref} className="mt-10"></span>
      </ul>
      {/* )} */}
    </>
  );
});
