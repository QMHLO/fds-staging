import React from "react";
// import Chat from "./Chat";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";
import ReactChat from "../Chat/ReactChat";
import Loading from "../Loading/Loading";

function DetailPage() {
  const [chat, setChat] = useState(false);
  const { currentUser, adminUser } = React.useContext(AuthContext);
  const [data, setData] = React.useState(null);
  const [admin, setAdmin] = React.useState(localStorage.getItem("admin"));
  const [jwt, setJWT] = React.useState(localStorage.getItem("jwt-token"));
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  let { id } = useParams();

  React.useEffect(() => {
    const fectchData = async () => {
      setLoading(!loading);
      try {
        // const res = await fetch(`http://localhost:1337/api/products/${id}?populate=*`);
        const res = await fetch(`https://fds-backend.onrender.com/api/products/${id}?populate=*`);

        const data = await res.json();
        setData(data);
        console.log(data);
        setLoading(!loading);
      } catch (err) {
        setData("Error");
      }
    };
    fectchData();
  }, [id]);

  const chatHandler = () => {
    if (!currentUser && !jwt) {
      navigate("/signin");
      return;
    }
    setChat((prev) => !prev);
    navigate("/chat");

    return;
  };

  console.log(id);
  if (data === "Error") return <div>Error Occured While fetching data</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  const imageUrl = data?.data?.attributes?.image?.data?.attributes?.url;
  const cloudinaryUrl = imageUrl.replace("https://fds-backend.onrender.com", "https://res.cloudinary.com");
  return (
    <>
      <div className="detail">
        <div className="container">
          <h2>Detail Page</h2>
          <h3>{data.data.attributes.title}</h3>
          {/* <img src={`http://localhost:1337${data?.data?.attributes?.image?.data?.attributes?.url}`} alt="some image" /> */}
          <img src={cloudinaryUrl} alt="some" />
          <p>{data.data.attributes.description}</p>
          {!adminUser && !admin ? <button onClick={chatHandler}>Chat with Owner</button> : ""}
          {chat && <ReactChat />}
        </div>
      </div>
    </>
  );
}

export default DetailPage;
