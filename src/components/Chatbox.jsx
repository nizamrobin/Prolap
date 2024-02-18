import { auth, db } from "../firebase";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";

export default function Chatbox() {
  const scroll = useRef();
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
    scroll.current.scrollIntoView(true, { behavior: "smooth" });
  };

  return (
    <div className="h-full top-20 relative">
      <Messages currentUser={auth.currentUser} ref={scroll} />
      <SendMessage
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
