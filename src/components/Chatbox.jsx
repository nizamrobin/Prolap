import { auth, db } from "../firebase";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function Chatbox() {
  const [message, setMessage] = useState("");

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
    setMessage("");
  };

  // Method controls scrolling
  const scrollHandler = (scroll) => {
    scroll.current?.lastElementChild?.scrollIntoView(true, {
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <div className="h-full top-20 relative">
      <Messages currentUser={auth.currentUser} scrollHandler={scrollHandler} />
      <SendMessage
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
      />
    </div>
  );
}
