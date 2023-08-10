import SideBar from "./layouts/SideBar";
import ChatField from "./layouts/ChatField";
import "./index.css";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import Button from "./components/SidebarButton";

const UserModel = {
  ID: 1,
  Username: "baoquan",
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

  return (
    <div className="relative flex ct-transition">
      {!showSideBar && (
        <Button
          className="absolute z-10 bg-gray-100 border-none w-11 h-11 hover:bg-white top-2"
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
        timeout={300}
        unmountOnExit
        classNames="side-bar"
      >
        <SideBar
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          sideBarRef={sideBarRef}
        />
      </CSSTransition>
      {/* <CSSTransition
        in={showSideBar}
        nodeRef={chatFieldRef}
        timeout={500}
        classNames="chat-field"
      > */}
      <ChatField
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        chatFieldRef={chatFieldRef}
      />
      {/* </CSSTransition> */}
    </div>
  );
};

export default ChatRoom;
