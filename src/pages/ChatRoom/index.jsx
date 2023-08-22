import SideBar from "./layouts/SideBar";
import ChatField from "./layouts/ChatField";
import "./index.css";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import Button from "./layouts/SideBar/components/SidebarButton";
import Header from "./layouts/Header";
import { useParams } from "react-router-dom";

const UserModel = {
  ID: 1,
  Username: "baoquan1211",
  Name: "Quach Bao Quan",
  Email: "quachbaoquan123@gmmail.com",
  Role_ID: 5,
  Status: "active",
  Password: undefined,
  createdAt: undefined,
  updateAt: undefined,
};

const ChatRoom = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const sideBarRef = useRef(null);
  const chatFieldRef = useRef(null);
  const conversationID = useParams().id;

  return (
    <>
      <Header props={{ UserModel }} />
      <div className="relative flex ct-transition mt-[60px] overflow-hidden">
        {!showSideBar && (
          <Button
            className="absolute z-10 ml-2 bg-gray-100 border-none w-11 h-11 hover:bg-white top-2"
            onClick={() => {
              setShowSideBar((currentState) => {
                return !currentState;
              });
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-black dark:text-white"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </Button>
        )}
        <CSSTransition
          in={showSideBar}
          nodeRef={sideBarRef}
          timeout={200}
          classNames="side-bar"
          mountOnEnter={true}
        >
          <SideBar
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            sideBarRef={sideBarRef}
          />
        </CSSTransition>
        <CSSTransition
          in={showSideBar}
          nodeRef={chatFieldRef}
          timeout={200}
          classNames="chat-field"
        >
          <ChatField
            UserModel={UserModel}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            chatFieldRef={chatFieldRef}
            conversationID={conversationID}
          />
        </CSSTransition>
      </div>
    </>
  );
};

export default ChatRoom;
