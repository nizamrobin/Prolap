import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  doc,
  addDoc,
  setDoc,
  collection,
  orderBy,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";

export default function SendMessage({ dbCol }) {
  // console.log(dbCol);

  const [message, setMessage] = useState("");
  const [dbCollection, setDbCollection] = useState(dbCol);

  useEffect(() => {
    if (dbCol === "messages") {
      setDbCollection(dbCol);
    } else {
      setDbCollection("chats/chat/" + auth.currentUser.uid + dbCol);
    }
  }, []);

  // Function for sending message. This fn only updates the db
  const sendMessage = async (event) => {
    // console.log(chatIds);
    const { uid, displayName, photoURL } = auth.currentUser;
    event.preventDefault();

    if (message.trim() === "") {
      alert("Type your text");
      return;
    }

    // 'dbCollection' is the name of collection to where message need to update in db
    await addDoc(collection(db, `${dbCollection}`), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
  };

  return (
    <form
      action="#"
      onSubmit={(event) => sendMessage(event)}
      className="absolute bottom-12 w-full flex justify-around"
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
        className="flex-1 p-4 focus:outline-none focus:ring focus:ring-[#D9196B] focus:ring-inset"
      />
      <button type="submit" className="p-4 bg-[#D9196B] w-16">
        <img src="public\assets\send-svgrepo-com.svg" alt="Send Message" />
      </button>
    </form>
  );
}
