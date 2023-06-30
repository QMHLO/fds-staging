import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const { currentUser, adminUser, dispatch } = React.useContext(AuthContext);
  const [jwt, setJwt] = React.useState(localStorage.getItem("jwt-token"));
  const [admin, setAdmin] = React.useState(localStorage.getItem("admin"));

  const logoutHandler = () => {
    dispatch({
      type: "SET_USER",
      payload: null,
    });
    dispatch({
      type: "SET_ADMINUSER",
      payload: null,
    });
    // console.log("user logout");
    toast.success("Logout Successful");
    // localStorage.removeItem("jwt-token");
    // localStorage.removeItem("admin");
    localStorage.clear();
  };
  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            {" "}
            <Link to={"/"}>HOME</Link>
          </li>
          {(adminUser || admin) && (
            <li>
              {" "}
              <Link to={"/adminchat"}>AdminChat</Link>
            </li>
          )}
          {(currentUser || jwt) && (
            <li>
              {" "}
              <Link to={"/chat"}>Chat</Link>
            </li>
          )}
          {currentUser !== null || adminUser !== null || jwt || admin ? (
            <>
              <li>
                {" "}
                <Link to={"/"} onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/signin"}>SignIn</Link>
              </li>
              <li>
                <Link to={"/signup"}>SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
