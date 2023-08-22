import AssistantAvartar from "./AssistantAvartar";
import UserAvartar from "./UserAvartar";
import { twMerge } from "tailwind-merge";

const MessageCard = ({
  children,
  role = "server",
  blocked = false,
  UserModel,
}) => {
  return (
    <div
      className={twMerge(
        `border-y-[1px] py-3 w-full flex justify-center ${
          blocked === true ? "bg-red-100 border-red-400" : "bg-blue-100"
        } ${role === "assistant" ? "bg-gray-100" : ""} 
          ${role === "user" ? "bg-white" : ""}`
      )}
    >
      <div className="w-[80%] flex gap-4">
        {role === "assistant" ? (
          <AssistantAvartar />
        ) : role === "user" ? (
          <UserAvartar userName={UserModel.Name} />
        ) : (
          <div className="relative p-1 rounded-sm h-[30px] w-[30px] text-white flex items-center justify-center bg-blue-300 select-none">
            FJN
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default MessageCard;
