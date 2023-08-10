import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      className={twMerge(
        `flex p-[12px] max-h-11 items-center justify-center text-white bg-transparent border-[0.5px] border-gray-600 rounded-[6px] font-sans text-sm hover:bg-[#2B2C2F]
         ct-transition ${className}`
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
