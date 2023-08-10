import Button from "../components/SidebarButton";

const ChatList = [
  {
    time: "Today",
    item: [
      {
        id: 1,
        title: "Lorem Ipsum ",
      },
      {
        id: 2,
        title: "Lorem Ipsum ",
      },
      {
        id: 3,
        title: "Lorem Ipsum ",
      },
    ],
  },
  {
    time: "Yesterday",
    item: [
      {
        id: 4,
        title: "Lorem Ipsum",
      },
      {
        id: 5,
        title: "Lorem Ipsum",
      },
      {
        id: 6,
        title: "Lorem Ipsum ",
      },
    ],
  },
  {
    time: "Previous 7 Days",
    item: [
      {
        id: 7,
        title: "Lorem Ipsum",
      },
      {
        id: 8,
        title:
          "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      },
      {
        id: 9,
        title: "Lorem Ipsum",
      },
      {
        id: 10,
        title: "Lorem Ipsum",
      },
      {
        id: 11,
        title: "Lorem Ipsum",
      },
      {
        id: 12,
        title: "Lorem Ipsum",
      },
      {
        id: 13,
        title: "Lorem Ipsum",
      },
      {
        id: 14,
        title: "Lorem Ipsum",
      },
      {
        id: 15,
        title: "Lorem Ipsum",
      },
      {
        id: 16,
        title: "Lorem Ipsum",
      },
      {
        id: 17,
        title: "Lorem Ipsum",
      },
      {
        id: 18,
        title: "Lorem Ipsum",
      },
      {
        id: 19,
        title: "Lorem Ipsum",
      },
      {
        id: 20,
        title: "Lorem Ipsum",
      },
      {
        id: 21,
        title: "Lorem Ipsum",
      },
      {
        id: 22,
        title: "Lorem Ipsum",
      },
      {
        id: 23,
        title: "Lorem Ipsum",
      },
      {
        id: 24,
        title: "Lorem Ipsum",
      },
      {
        id: 25,
        title: "Lorem Ipsum",
      },
      {
        id: 26,
        title: "Lorem Ipsum",
      },
      {
        id: 27,
        title: "Lorem Ipsum",
      },
    ],
  },
];

const SideBar = ({ setShowSideBar, sideBarRef }) => {
  return (
    <div className="bg-[#202123] w-[260px] relative z-50" ref={sideBarRef}>
      <div className="flex flex-col p-2 h-[100vh]">
        <div className="flex flex-row gap-2">
          <Button className="justify-start flex-grow ">
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>{" "}
            &nbsp; New chat
          </Button>
          <div>
            <Button
              className="w-11 h-11"
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
                className="w-4 h-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </Button>
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-3  side-bar overflow-y-hidden hover:overflow-y-auto">
          <div>
            {ChatList.map((timeList) => (
              <div
                key={timeList.time}
                className="font-sans text-xs flex flex-col gap-y-2 text-white overflow-y-auto"
              >
                <h2 className="p-3 text-gray-400">{timeList.time}</h2>
                {timeList.item.map((chatItem) => (
                  <a
                    key={chatItem.id}
                    className="font-sans text-[16px] p-3 hover:bg-[#2A2B32] ct-transition
                  rounded-[6px] cursor-pointer truncate max-h-8
                  flex items-center gap-3 "
                    href="#"
                  >
                    <div>
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    {chatItem.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
