import React from "react";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";
import { useEffect } from "react";

function OwnerChatComponent() {
  const projectId = process.env.REACT_APP_CE_PROJECT_ID;
  const username = process.env.REACT_APP_OWNER_CHAT_USER_NAME;
  const secret = process.env.REACT_APP_OWNER_CHAT_USER_PASS;
  const chatProps = useMultiChatLogic(projectId, username, secret);
  return (
    <div>
      <MultiChatWindow {...chatProps} style={{ height: "100vh" }} />
      <MultiChatSocket {...chatProps} />
    </div>
  );
}

export default OwnerChatComponent;
