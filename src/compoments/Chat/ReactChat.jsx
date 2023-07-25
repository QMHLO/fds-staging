import React from "react";
import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../Context/AuthContext";
import { ChatEngine } from "react-chat-engine";
import Loading from "../Loading/Loading";
import { NewMessageForm } from "react-chat-engine";
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";
import ChatComponent from "./ChatComponent";
import "./Chat.css";
import MessageIcon from "../../assets/img/msg_icon.png";
function ReactChat() {
  let { currentUser } = React.useContext(AuthContext);
  const [dataId, setDataId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log(currentUser);
  console.log(localStorage.getItem("name"));

  // const projectId = process.env.REACT_APP_CE_PROJECT_ID;
  // const username = user.email;
  // const secret = user.email;
  // const chatProps = useMultiChatLogic(projectId, username, secret);
  const currentUserName = localStorage.getItem("name");
  const fullUserName = localStorage.getItem("email")?.split("@")[0];
  const username = `${fullUserName}sann`;

  function getorCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: username || localStorage.getItem("email"),
          // username: currentUserName,

          secret: currentUser?.email || localStorage.getItem("email"),
          email: currentUser?.email || localStorage.getItem("email"),
          first_name: currentUserName,
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
          // usernames: ["seller", username || localStorage.getItem("email")],
          usernames: [username || localStorage.getItem("email")],

          title: "Chatting",
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
      <div className="chat-header">
        <div className="row">
          <div className="msg-icon">
            <img src={MessageIcon} alt="" />
          </div>
          <p className="txt">ちょくれん</p>
        </div>
      </div>
      <ChatComponent user={user} first_name={user.first_name} />
    </div>
  );
}

export default ReactChat;
