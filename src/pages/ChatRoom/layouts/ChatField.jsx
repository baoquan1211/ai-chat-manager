import SendMessageButton from "../components/SendMessageButton";
import { useState, useEffect } from "react";
import MessageCard from "../components/MessageCard";
import { socket } from "../../../socket/index.js";
import markdownIt from "markdown-it";
import "./ChatField.css";
import hljs from "highlight.js";

const Component = ({ value }) => {
  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            `<pre language="${lang}"><code>` +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (error) {
          console.log(error);
        }
      }

      return ""; // use external default escaping
    },
  });
  const html = md.render(value);

  return (
    <div
      className="chat-container"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

const ChatField = ({ chatFieldRef }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    try {
      socket.on("answer_request", (data) => {
        console.log(data);
        setConversation([...conversation, data]);
      });
    } catch (e) {
      console.error(e);
    }
  }, [conversation]);

  return (
    <div
      className={`h-[100dvh] relative ct-transition flex-grow`}
      ref={chatFieldRef}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="flex-grow w-full pt-16 pb-32 overflow-auto">
          {conversation.map((item, index) => (
            <MessageCard key={index} role={item.role}>
              <Component value={item.content}></Component>
            </MessageCard>
          ))}
        </div>
        <div className="absolute left-0 z-40 w-full bottom-9">
          <div className="flex items-center justify-center">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setConversation([
                  ...conversation,
                  { role: "user", content: message },
                ]);
                console.log(conversation);
                socket.emit("ask_request", { message: message });
                setMessage("");
              }}
              className="py-[8px] px-[16px] border-[1px] w-[700px] flex justify-center items-center shadow-2xl rounded-[12px] 
              shadow-slate-500 bg-white overflow-auto"
            >
              <textarea
                rows={1}
                type="text"
                placeholder="Send a message"
                className="flex flex-grow max-h-[100px] overflow-hidden font-sans resize-none focus-visible:outline-none"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                value={message}
              />

              <SendMessageButton disabled={message === "" ? true : false} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
