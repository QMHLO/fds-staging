import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import Logo from "../../assets/img/msg_icon.png";
import UserLogo from "../../assets/img/user_chat_avator.png";

function Header() {
  const { currentUser, adminUser, dispatch } = useContext(AuthContext);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt-token"));
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState(null);
  const userName = localStorage.getItem("name");
  console.log(userName);

  const logoutHandler = () => {
    dispatch({
      type: "SET_USER",
      payload: null,
    });
    dispatch({
      type: "SET_ADMINUSER",
      payload: null,
    });
    toast.success("Logout Successful");
    localStorage.clear();
    // navigate("/");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 800);

    setJwt(null);
    setAdmin(null);
    setActiveNavItem(null);
  };

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-row">
          <Link to={"/"} className="ttl-row">
            <div className="logo-icon">
              <img src={Logo} alt="" />
            </div>
            <p className="txt">ちょくれん</p>
          </Link>
          <div className="navbar">
            <ul>
              <li>
                <NavLink exact to={"/"} activeClassName="active" onClick={() => handleNavItemClick("home")}>
                  ホーム
                </NavLink>
                <NavLink exact to={"/detail"} activeClassName="active" onClick={() => handleNavItemClick("home")}></NavLink>
              </li>
              {(adminUser || admin) && (
                <li>
                  <NavLink to={"/adminchat"} activeClassName="active" onClick={() => handleNavItemClick("adminchat")}>
                    管理者チャット
                  </NavLink>
                </li>
              )}
              {(currentUser || jwt) && (
                <li>
                  <NavLink to={"/chat"} activeClassName="active" onClick={() => handleNavItemClick("chat")}>
                    チャット
                  </NavLink>
                </li>
              )}
              {currentUser || adminUser || jwt || admin ? (
                <>
                  <li>
                    <Link to={"/"} onClick={logoutHandler}>
                      ログアウト
                    </Link>
                  </li>
                  <li>
                    <img src={UserLogo} className="user-logo" alt="userlogo" />
                    <span className="user-name">{userName ? userName : "Admin"}</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {/* <Link to={"/signin"}>SignIn</Link> */}
                    <NavLink to={"/signin"} activeClassName="active" onClick={() => handleNavItemClick("signin")}>
                      SignIn
                    </NavLink>
                  </li>
                  <li>
                    {/* <Link to={"/signup"}>SignUp</Link> */}
                    <NavLink to={"/signup"} activeClassName="active" onClick={() => handleNavItemClick("signup")}>
                      SignUp
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
