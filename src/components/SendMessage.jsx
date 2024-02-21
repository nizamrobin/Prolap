export default function SendMessage({ sendMessage, message, setMessage }) {
  return (
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
  );
}
