import { auth, db } from "../../firebase";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

export default function Chatbox({ dbCol }) {
  const [msgId, setMsgId] = useState(null);
  // console.log(dbCol);

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
  const deleteMsgHandler = (id, userId) => {
    console.log(id, userId)
    let dbURL;
    dbCol === "messages"? dbURL = "messages" : auth.currentUser.uid === userId? dbURL = "chats/chat/" + auth.currentUser.uid + dbCol : dbURL = "chats/chat/" + dbCol + auth.currentUser.uid; 
    deleteDoc(doc(db, dbURL, id));
    setMsgId("");
  };

  return (
    <div className="h-full top-32 relative">
      <Messages
        dbCol={dbCol}
        currentUser={auth.currentUser}
        scrollHandler={scrollHandler}
        msgModifer={msgModifer}
        deleteMsgHandler={deleteMsgHandler}
        msgId={msgId}
      />
      <SendMessage dbCol={dbCol} />
    </div>
  );
}
