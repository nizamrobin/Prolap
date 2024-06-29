import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function Messages({
  dbCol,
  currentUser,
  scrollHandler,
  msgModifer,
  deleteMsgHandler,
  msgId,
}) {
  const [messages, setMessages] = useState([]);
  const [messages1, setMessages1] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const [otherEndUser, setOtherEndUser] = useState("Group Chat");

  const scroll = useRef();

  // Fetch messages from the db(Collection is dbCollection) and stored in 'messages' state.
  useEffect(() => {
    // Function for fetching messages only for chatbox
    const fetchChatboxMsgHandler = async () => {
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
              };
              
              // Function for fetching messages only for personal inbox
              const fetchPersonalMsgHandler = async () => {
                // set Other End user name to otherEndUser state
      const getOtherEndUserData = await getDoc(doc(db, "users", dbCol));
    setOtherEndUser(getOtherEndUserData.data().name);
      const q1 = query(
        collection(db, "chats/chat/" + auth.currentUser.uid + dbCol),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const q2 = query(
        collection(db, "chats/chat/" + dbCol + auth.currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const unsubscribe1 = onSnapshot(q1, (QuerySnapshot) => {
        const fetchedMessages = [];
        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages1(fetchedMessages);
      });
      const unsubscribe2 = onSnapshot(q2, (QuerySnapshot) => {
        const fetchedMessages = [];

        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages2(fetchedMessages);
      });
      return () => {
        unsubscribe1();
        unsubscribe2();
      };
    };

    // depending on the dbCol(dbCol comes from tabDispatch of TabDispatchContext provider from App.jsx and consumes in Tab.jsx and Friends.jsx), msgHandler functions run
    dbCol === "messages" ? fetchChatboxMsgHandler() : fetchPersonalMsgHandler();
  }, [dbCol]);

  // This useEffect runs only for personal msgs that stored in messages1 and messages2 which are combinedly create personalMsg array and setSate to messages
  useEffect(() => {
    const personalMsg = [];
    personalMsg.push(...messages1, ...messages2)
    const sortedPersonalMsg = personalMsg.sort(
        (a, b) => a.createdAt - b.createdAt
      );
    setMessages(sortedPersonalMsg)
  }, [messages1, messages2])

  // Scroll to down on both end after the dom is loaded and when users send any messages
  useEffect(() => {
    scrollHandler(scroll);
  }, [messages, scrollHandler]);

  return (
    <>
      <h3 className="font-bold tracking-wider bg-[#D9196B] p-1 text-center text-white">
        {otherEndUser}
      </h3>

      <ul
        className="bg-[emerald]-100 flex flex-col absolute top-10 bottom-20 left-0 right-0 overflow-y-scroll pt-2 pb-10"
        ref={scroll}
      >
        {/* Iterate through 'messages' state and populate message box */}
        {messages.map((item) => {
          return (
            <li
              id={item.id}
              user = {item.uid}
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
                  <button id={item.id} user = {item.uid} onClick={(e) => deleteMsgHandler(item.id, item.uid)}>
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
