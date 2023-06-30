import React from "react";
import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../Context/AuthContext";
import { ChatEngine } from "react-chat-engine";
import Loading from "./Loading";
import { NewMessageForm } from "react-chat-engine";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";
import ChatComponent from "./ChatComponent";
function ReactChat() {
  let { currentUser } = React.useContext(AuthContext);
  const [dataId, setDataId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log(currentUser);

  // const projectId = process.env.REACT_APP_CE_PROJECT_ID;
  // const username = user.email;
  // const secret = user.email;
  // const chatProps = useMultiChatLogic(projectId, username, secret);

  function getorCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: currentUser?.email || localStorage.getItem("email"),
          secret: currentUser?.email || localStorage.getItem("email"),
          email: currentUser?.email || localStorage.getItem("email"),
        },
        { headers: { "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data));
  }

  function getorCreateChat(callback) {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: ["chat owner", currentUser?.email || localStorage.getItem("email")],
          is_direct_chat: true,
        },
        { headers: { "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data));
  }

  React.useEffect(() => {
    const fectchData = async () => {
      setLoading(!loading);
      try {
        getorCreateUser((user) => {
          setUser(user);
          return getorCreateChat((chat) => {
            console.log("success", chat);
            setDataId(chat);
            setLoading(!loading);
          });
        });
      } catch (err) {
        // setData("Error");
      }
    };
    fectchData();
  }, []);
  if (!dataId || !user) return <Loading />;
  console.log(dataId.id);

  return (
    <div className="customer">
      <ChatComponent user={user} />
      {/* <MultiChatWindow projectId={process.env.REACT_APP_CE_PROJECT_ID} username={user.email} secret={user.email} style={{ height: "100vh" }} />
      <MultiChatSocket projectId={process.env.REACT_APP_CE_PROJECT_ID} username={user.email} secret={user.email} /> */}

      {/* <MultiChatWindow {...chatProps} style={{ height: "100vh" }} />
      <MultiChatSocket {...chatProps} /> */}

      {/* <ChatEngine projectID={process.env.REACT_APP_CE_PROJECT_ID} userName={user.email} userSecret={user.email} renderNewChatForm={() => <div></div>} renderNewMessageForm={() => <NewMessageForm />} /> */}
    </div>
  );
}

export default ReactChat;
