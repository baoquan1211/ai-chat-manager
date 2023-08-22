import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ConversationCard = ({ currentConversation, conversations }) => {
  return (
    <div className="mr-[5px]">
      {conversations &&
        conversations?.map((conversation) => (
          <div key={conversation.id} className="relative">
            <Link
              className={`font-sans text-[16px] p-5 ct-transition
            rounded-[6px] cursor-pointer truncate max-h-8
            flex items-center gap-3 focus-visible:outline-none w-full ${
              currentConversation == conversation.id
                ? "bg-[#2c2e3c]"
                : "hover:bg-[#2A2B32]"
            }`}
              to={`/c/${conversation.id}`}
            >
              <div>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              {conversation.name}
            </Link>

            {currentConversation == conversation.id ? (
              <div className="absolute right-1 top-[20%] flex gap-0.5">
                <button className="hover:bg-[#525565] p-1 rounded ct-transition bg-[#2c2e3c] bg-opacity-90">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#687792" }}
                  />
                </button>
                <button className="hover:bg-[#525565] p-1 rounded ct-transition bg-[#2c2e3c] bg-opacity-90">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "#687792" }}
                  />
                </button>
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default ConversationCard;
