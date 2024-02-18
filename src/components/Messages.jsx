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
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      // console.log(sortedMessages);
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <>
      <h3 className="font-bold tracking-wider uppercase bg-emerald-400 p-4 text-center text-white">
        Chatbox-{props.currentUser.displayName}
      </h3>
      <ul className="bg-emerald-100 flex flex-col absolute top-12 bottom-28 left-0 right-0 overflow-y-scroll pt-2 pb-6">
        {messages.map((item) => {
          return (
            <li
              key={item.id}
              className={`px-2 py-1 flex items-end rounded-t-2xl relative max-w-[80%] ${
                item.uid === props.currentUser.uid
                  ? "self-end flex-row-reverse"
                  : "self-start"
              }`}
            >
              <img
                src={item.avatar}
                alt="User Name"
                title={item.name}
                className="rounded-lg w-6"
              />
              <p
                className={`px-4 py-1 mx-4 rounded-t-2xl relative  after:content-[""] after:border after:border-4 after:border-t-transparent  after:absolute  after:bottom-1   ${
                  item.uid === props.currentUser.uid
                    ? "bg-slate-200  rounded-bl-2xl rounded-br-lg after:border-slate-200 after:border-r-transparent after:-right-[5px] "
                    : "bg-emerald-200 rounded-br-2xl rounded-bl-lg after:border-emerald-200 after:border-l-transparent after:-left-[5px]"
                }`}
              >
                {item.text}
              </p>
            </li>
          );
        })}
        <span ref={ref} className="mt-10"></span>
      </ul>
    </>
  );
});

// Problems:
// 1. only scrolls who's writing. not in other end
