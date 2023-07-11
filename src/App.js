import React from "react";
import SingIn from "./compoments/Form/SingIn";
import Header from "./compoments/Header/Header";
import SignUp from "./compoments/Form/SignUp";
import { AuthContext } from "./Context/AuthContext";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./compoments/Pages/HomePage";
import DetailPage from "./compoments/Pages/DetailPage";
import ReactChat from "./compoments/Chat/ReactChat";
import OwnerChat from "./compoments/Chat/OwnerChat";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { currentUser, adminUser } = React.useContext(AuthContext);
  const [jwt, setJWT] = React.useState(localStorage.getItem("jwt-token"));
  const [admin, setAdmin] = React.useState(localStorage.getItem("admin"));

  console.log(`JWT TOKEN ${jwt}`);
  return (
    <div>
      <Header />
      <ToastContainer autoClose={800} theme="colored" />
      {(!currentUser || !adminUser) && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/detail" element={<DetailPage />} /> */}
          {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
          <Route path="/detail/:id" element={<DetailPage />} />
          {/* <Route path="/chat" element={<Navigate replace to="/" />} />
          <Route path="/adminchat" element={<Navigate replace to="/" />} /> */}
        </Routes>
      )}
      {(currentUser || jwt) && (!adminUser || !admin) && (
        <Routes>
          <Route path="/chat" element={<ReactChat />} />
          {/* <Route path="/adminchat" element={<OwnerChat />} /> */}
          <Route path="/adminchat" element={<Navigate replace to="/chat" />} />
        </Routes>
      )}
      {(adminUser || admin) && (
        <Routes>
          <Route path="/adminchat" element={<OwnerChat />} />
          <Route path="/chat" element={<Navigate replace to="/adminchat" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
