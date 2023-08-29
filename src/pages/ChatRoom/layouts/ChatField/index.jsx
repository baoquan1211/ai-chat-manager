import SendMessageButton from "./components/SendMessageButton";
import { useState, useEffect, useRef } from "react";
import MessageCard from "./components/MessageCard";
import { socket } from "../../../../socket/index.js";
import MessageInputField from "./components/MessageInputField";
import MarkdownToHtml from "./components/MarkdownToHtml";
import LoadingIcons from "react-loading-icons";
import { getConversation } from "../../../../services/Chat";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
//import useConversation from "../../hooks/useConversation";
import { useSelector } from "react-redux";
import AssistantAvartar from "./components/AssistantAvartar";

import BARD from "../../../../assets/gif/bard-icon.gif";

const ChatField = ({ chatFieldRef, conversationID }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatProvider, setChatProvider] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loadingRef = useRef(conversationID);
  const scrollRef = useRef(null);
  const user = useSelector((state) => state.auth);

  const fetchData = (id) => {
    if (id === undefined) return;
    getConversation(id, user.access).then((data) => {
      if (data.data === "Conversation is not found") {
        navigate("/");
        return;
      }
      if (data.messages === null) return;
      setConversation(JSON.parse(data.messages));
    });
  };

  useEffect(() => {
    if (conversationID === undefined) {
      setConversation([]);
      return;
    }
    fetchData(conversationID);
  }, [conversationID]);

  /* const getConversation1 = useConversation(conversationID);
  const conversations1 = JSON.parse(getConversation1.data); 

  console.log(conversations);*/
  useEffect(() => {
    try {
      socket.on("connect_error", (reason) => {
        console.error("test", reason);
        if (reason === "io server disconnect") {
          socket.connect();
        }
        toast.error("Can not connect to server");
        return;
      });

      socket.on("answer_request", (data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
          navigate("/");
        }
        if (
          conversationID === undefined ||
          conversationID == data.conversation
        ) {
          setConversation([...conversation, data.response]);
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        if (conversationID === undefined) {
          navigate(`/c/${data.conversation}`);
          conversationID = data.conversation;
          queryClient.invalidateQueries(["get-conversation"]);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }, [conversation]);

  const submitHandle = (event) => {
    event.preventDefault();

    if (loading) return;

    setConversation([...conversation, { role: "user", content: message }]);
    socket.emit("ask_request", {
      user: user.username,
      conversation: conversationID,
      message: { role: "user", content: message },
    });
    setMessage("");
    loadingRef.current = conversationID;
    setLoading(true);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`h-[calc(100dvh-60px)] relative flex-grow chat-field-enter-done`}
      ref={chatFieldRef}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full ct-transition overflow-hidden">
        <div className="chat-field flex-grow w-full justify-center pt-16 pb-32 overflow-y-auto overflow-x-hidden dark:text-gray-200">
          {conversation?.map((item, index) => (
            <MessageCard key={index} role={item?.role} blocked={item?.blocked}>
              <MarkdownToHtml value={item?.content} />
            </MessageCard>
          ))}
          {loading === true && loadingRef.current === conversationID ? (
            <MessageCard role="assistant">
              <LoadingIcons.ThreeDots
                stroke="black"
                fill="gray"
                className="w-8 h-8 ml-[15px]"
              />
            </MessageCard>
          ) : null}
          <div ref={scrollRef} />
        </div>
        <div className="absolute left-0 z-40 w-full bottom-2 flex flex-col md:items-center">
          <div className="w-[700px] flex gap-x-3 p-3 select-none">
            <button
              onClick={() => {
                setChatProvider(1);
              }}
              className={`w-10 h-10 flex items-center justify-center ${
                chatProvider === 1 ? "border-green-600 border-2" : ""
              }`}
            >
              <AssistantAvartar className="w-8 h-8" />
            </button>
            <button
              onClick={() => {
                setChatProvider(2);
              }}
              className={`w-10 h-10 flex items-center justify-center ${
                chatProvider === 2 ? "border-green-600 border-2" : ""
              }`}
            >
              <img src={BARD} alt="bard" className="w-8 h-8" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <form
              name="message_input_form"
              onSubmit={submitHandle}
              className="py-[8px] px-[16px] border-[1px] w-[700px] flex justify-center items-center shadow-2xl rounded-[12px] 
              shadow-slate-500 overflow-auto ct-transition bg-background"
            >
              <MessageInputField props={{ message, setMessage }} />
              {loading ? (
                <LoadingIcons.BallTriangle
                  stroke="black"
                  fill="gray"
                  className="w-8 h-8"
                />
              ) : (
                <SendMessageButton disabled={message === "" ? true : false} />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
