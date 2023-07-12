import React from "react";
import { ChatEngine } from "react-chat-engine";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";
import OwnerChatComponent from "./OwnerChatComponent";

function OwnerChat() {
  return (
    <div className="owner">
      <div className="owner-container">
        <OwnerChatComponent />
      </div>
    </div>
  );
}

export default OwnerChat;
