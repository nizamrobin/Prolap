import { db } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export default function Messages({
  currentUser,
  scrollHandler,
  msgModifer,
  deleteMsgHandler,
  msgId,
}) {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

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
      setMessages(sortedMessages);
    });

    return () => unsubscribe;
  }, []);

  // Scroll to down on both end after the dom is loaded and when users send any messages
  useEffect(() => {
    scrollHandler(scroll);
  }, [messages]);

  return (
    <>
      <h3 className="font-bold tracking-wider uppercase bg-emerald-400 p-4 text-center text-white">
        Chatbox-{currentUser.displayName}
      </h3>

      <ul
        className="bg-emerald-100 flex flex-col absolute top-12 bottom-28 left-0 right-0 overflow-y-scroll pt-2 pb-8"
        ref={scroll}
      >
        {messages.map((item) => {
          return (
            <li
              id={item.id}
              key={item.id}
              onClick={(e) => msgModifer(e)}
              className={`px-2 py-1 flex items-end rounded-t-2xl relative max-w-[80%] ${
                item.uid === currentUser.uid
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
                  item.uid === currentUser.uid
                    ? "bg-slate-200  rounded-bl-2xl rounded-br-lg after:border-slate-200 after:border-r-transparent after:-right-[5px] "
                    : "bg-emerald-200 rounded-br-2xl rounded-bl-lg after:border-emerald-200 after:border-l-transparent after:-left-[5px]"
                }`}
              >
                {item.text}
              </p>
              {msgId === item.id && (
                <aside>
                  <button id={item.id} onClick={(e) => deleteMsgHandler(e)}>
                    Remove
                  </button>
                </aside>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

// Problems:
// 1. only scrolls who's writing. not in other end ==> Resolved
