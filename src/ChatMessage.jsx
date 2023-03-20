import React from "react";

const ChatMessage = ({ text, author }) => {
  return (
    <div className={`chat-message ${author}`}>
      <span className="author">{author === "ChatGPT" ? "ChatGPT" : "You"}</span>
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
