/*import { io } from "socket.io-client";
import { useRef, useEffect } from "react";

 const App = () => {
  const socket = io("http://localhost:3001");
  const messageRef = useRef(null);
  const sendMessageHandle = (event) => {
    event.preventDefault();

    socket.emit("ask_request", { message: messageRef.current.value });
  };

  useEffect(() => {
    socket.on("answer_request", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <form
      onSubmit={sendMessageHandle}
      className="flex flex-col items-center justify-center "
    >
      <input type="text" className="w-[100px] border-[2px]" ref={messageRef} />
      <button type="submit" className="p-1">
        Send
      </button>
    </form>
  );
};

export default App; */

/* import { useState, useEffect } from "react";
import io from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("ws://localhost:8000");
  const socket = new WebSocket("")

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Đã kết nối đến server.");
    });

    socket.on("ask_request", (event) => {
      setMessages((messages) => [...messages, event.data]);
    });

    socket.on("disconnect", () => {
      console.log("Đã ngắt kết nối với server.");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập tin nhắn"
        onChange={(e) => setMessage(e.target.value)}
        id="message"
        name="message"
      />
      <button onClick={() => socket.emit("ask_request", { message: message })}>
        Gửi
      </button>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App; */

import ChatRoom from "./pages/ChatRoom";

const App = () => {
  return (
    <>
      <ChatRoom />
    </>
  );
};

export default App;
