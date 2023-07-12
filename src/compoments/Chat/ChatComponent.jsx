import React from "react";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow, ChatHeader } from "react-chat-engine-advanced";

const ChatComponent = ({ user }) => {
  console.log(user);
  const projectId = process.env.REACT_APP_CE_PROJECT_ID;
  const username = user.username;
  const secret = user.email;
  const first_name = user.first_name;
  const chatProps = useMultiChatLogic(projectId, username, secret);
  return (
    <div>
      <MultiChatWindow {...chatProps} first_name={first_name} style={{ height: "100vh" }} />
      <MultiChatSocket {...chatProps} />
      {/* <ChatHeader title={first_name} /> */}
    </div>
  );
};

export default ChatComponent;
