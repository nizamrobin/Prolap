import { auth, db } from "../firebase";
import Messages from "./Messages";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const scroll = useRef();
  // useEffect(() => {
  //   console.log(scroll);
  //   // scroll.current.scrollIntoView({ behavior: "smooth" });
  // }, [scroll]);

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
    console.log(scroll.current.value);
  };

  return (
    <div className="h-full top-20 relative">
      <h3 className="font-bold tracking-wider uppercase bg-emerald-400 p-4 text-center text-white">
        Chatbox-{auth.currentUser.displayName}
      </h3>
      <Messages currentUserId={auth.currentUser.uid} ref={scroll} />
      <form
        action="#"
        onSubmit={(event) => sendMessage(event)}
        className="absolute bottom-20 w-screen flex justify-around"
      >
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input
          type="text"
          id="messageInput"
          name="messageInput"
          value={message}
          placeholder="Type message . . ."
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-4 focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-inset"
        />
        <button type="submit" className="p-4 bg-emerald-400 text-white">
          Send
        </button>
      </form>
    </div>
  );
}
