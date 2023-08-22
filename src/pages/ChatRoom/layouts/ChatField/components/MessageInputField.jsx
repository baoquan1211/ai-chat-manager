//import { useEffect, useRef } from "react";

const MessageInputField = ({ props }) => {
  //const inputRef = useRef(null);
  /* useEffect(() => {
    inputRef.current.addEventListener("keydown", function (event) {
      if (event.key == "Enter") {
        event.preventDefault();
        document.forms[0].submit();
      }
    });
    console.log(inputRef.current);
  });
 */
  const { message, setMessage } = props;
  return (
    <input
      rows={1}
      type="text"
      placeholder="Send a message"
      className="flex flex-grow max-h-[100px] overflow-hidden font-sans resize-none focus-visible:outline-none"
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      value={message}
    />
  );
};

export default MessageInputField;
