import SendMessageButton from "./components/SendMessageButton";
import { useState, useEffect, useRef } from "react";
import MessageCard from "./components/MessageCard";
import { socket } from "../../../../socket/index.js";
import MessageInputField from "./components/MessageInputField";
import MarkdownToHtml from "./components/MarkdownToHtml";
import LoadingIcons from "react-loading-icons";
import { getConversation } from "../../../../services/Chat/ConversationService";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
//import useConversation from "../../hooks/useConversation";

const ChatField = ({ chatFieldRef, UserModel, conversationID }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loadingRef = useRef(conversationID);
  const fetchData = (id) => {
    if (id === undefined) return;
    getConversation(id).then((data) => {
      if (data.data === "Conversation is not found") {
        navigate("/");
        return;
      }
      if (data.messages === null) return;
      setConversation(JSON.parse(data.messages));
    });
  };

  useEffect(() => {
    fetchData(conversationID);
  }, [conversationID]);

  /* const getConversation1 = useConversation(conversationID);
  const conversations1 = JSON.parse(getConversation1.data); 

  console.log(conversations);*/
  useEffect(() => {
    try {
      socket.on("answer_request", (data) => {
        if (data.error) {
          window.location.reload;
        }
        console.log(data);
        setLoading(false);
        setConversation([...conversation, data.response]);
        if (conversationID === undefined) {
          navigate(`/c/${data.conversation}`);
          queryClient.invalidateQueries(["get-conversation"]);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [conversation]);

  const submitHandle = (event) => {
    event.preventDefault();
    if (loading) return;

    setConversation([...conversation, { role: "user", content: message }]);
    socket.emit("ask_request", {
      user: UserModel.Username,
      conversation: conversationID,
      message: { role: "user", content: message },
    });
    setMessage("");
    loadingRef.current = conversationID;
    setLoading(true);
  };

  return (
    <div
      className={`h-[calc(100dvh-60px)] relative flex-grow chat-field-enter-done`}
      ref={chatFieldRef}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full ct-transition overflow-hidden">
        <div className="chat-field flex-grow w-full justify-center pt-16 pb-32 overflow-y-auto overflow-x-hidden">
          {conversation?.map((item, index) => (
            <MessageCard
              key={index}
              role={item?.role}
              blocked={item?.blocked}
              UserModel={UserModel}
            >
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
        </div>
        <div className="absolute left-0 z-40 w-full bottom-9">
          <div className="flex items-center justify-center">
            <form
              onSubmit={submitHandle}
              className="py-[8px] px-[16px] border-[1px] w-[700px] flex justify-center items-center shadow-2xl rounded-[12px] 
              shadow-slate-500 bg-white overflow-auto ct-transition"
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
