import AssistantAvartar from "./AssistantAvartar";
import UserAvartar from "./UserAvartar";

const MessageCard = ({ children, role = "assistant" }) => {
  return (
    <div
      className={`border-y-[1px] py-3 w-full flex justify-center ${
        role === "assistant" ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="w-[80%] flex gap-4">
        {role === "assistant" ? <AssistantAvartar /> : <UserAvartar />}
        {children}
      </div>
    </div>
  );
};

export default MessageCard;
