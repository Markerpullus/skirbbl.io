import React from "react";

function Message({ name, content, disconnect }) {
  return (
    <div
      className={
        "w-full p-1 bg-yellow-200 text-left " +
        (disconnect ? "italic text-black-100" : "")
      }
    >
      <b>{name}</b>
      <br />
      {content}
    </div>
  );
}

export default function Chat({ sendMessage, messageList }) {
  const msgRef = React.useRef("");

  return (
    <div className="w-screen h-screen justify-center">
      <div className="flex flex-col h-screen mx-10 overflow-hidden">
        <div className="flex-none p-1 h-5/6 bg-yellow-100 border-2 border-yellow-600 rounded-t-xl overflow-y-scroll">
          {messageList.map((message) => {
            return (
              <Message name={message.name} content={message.content} disconnect={message.disconnect} />
            );
          })}
        </div>
        <div className="flex flex-auto bg-white border-2 border-yellow-600 rounded-b-xl">
          <textarea
            cols="30"
            ref={msgRef}
            className="w-3/4 h-full p-2 rounded-md overflow-y-scroll resize-none border border-transparent focus:outline-none focus:ring-2 focus:border-transparent focus:ring-yellow-600"
          ></textarea>
          <button
            className="btn flex-auto"
            onClick={() => {
              sendMessage(msgRef.current.value);
              msgRef.current.value = "";
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
