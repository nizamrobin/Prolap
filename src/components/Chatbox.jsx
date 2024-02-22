import { auth, db } from "../firebase";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const [msgId, setMsgId] = useState(null);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Type your text");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    // setmsgModiferOptions(false);
    setMessage("");
  };

  // Method controls scrolling
  const scrollHandler = (scroll) => {
    scroll.current?.lastElementChild?.scrollIntoView(true, {
      behavior: "smooth",
      block: "end",
    });
  };

  // Message Modifier Handler
  // ***PROBLEM: not hide the options when clicked second time => RESOLVED
  const msgModifer = (e) => {
    setMsgId(msgId === e.currentTarget.id ? "" : e.currentTarget.id);
  };

  // Delete a message
  const deleteMsgHandler = (e) => {
    deleteDoc(doc(db, "messages", e.currentTarget.id));
    setMsgId("");
  };

  return (
    <div className="h-full top-20 relative">
      <Messages
        currentUser={auth.currentUser}
        scrollHandler={scrollHandler}
        msgModifer={msgModifer}
        deleteMsgHandler={deleteMsgHandler}
        msgId={msgId}
      />
      <SendMessage
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
      />
    </div>
  );
}
