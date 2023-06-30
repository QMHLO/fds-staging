import React from "react";
import { ChatEngine } from "react-chat-engine";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";
import OwnerChatComponent from "./OwnerChatComponent";

function OwnerChat() {
  return (
    <div className="owner">
      <OwnerChatComponent />
      {/* <ChatEngine projectID={process.env.REACT_APP_CE_PROJECT_ID} userName={process.env.REACT_APP_OWNER_CHAT_USER_NAME} userSecret={process.env.REACT_APP_OWNER_CHAT_USER_PASS} renderNewChatForm={() => <div></div>} /> */}
      {/* <MultiChatSocket projectID={process.env.REACT_APP_CE_PROJECT_ID} userName={process.env.REACT_APP_OWNER_CHAT_USER_NAME} userSecret={process.env.REACT_APP_OWNER_CHAT_USER_PASS} />
      <MultiChatWindow projectID={process.env.REACT_APP_CE_PROJECT_ID} username={process.env.REACT_APP_OWNER_CHAT_USER_NAME} secret={process.env.REACT_APP_OWNER_CHAT_USER_PASS} style={{ height: "100vh" }} /> */}
    </div>
  );
}

export default OwnerChat;
