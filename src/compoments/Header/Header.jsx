import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import Logo from "../../assets/img/msg_icon.png";

function Header() {
  const { currentUser, adminUser, dispatch } = React.useContext(AuthContext);
  const [jwt, setJwt] = React.useState(localStorage.getItem("jwt-token"));
  const [admin, setAdmin] = React.useState(localStorage.getItem("admin"));
  const navigate = useNavigate();

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
    // setTimeout(() => {
    //   window.location.reload();
    // }, 800);
    // window.location.reload();
    // navigate("/");
  };
  return (
    <>
      <div className="header">
        <div className="header-container">
          <div className="header-row">
            <Link to={"/"} class="ttl-row">
              <div class="logo-icon">
                <img src={Logo} alt="" />
              </div>
              <p class="txt">ちょくれん</p>
            </Link>
            <div className="navbar">
              <ul>
                <li>
                  {" "}
                  <Link to={"/"}>ホーム</Link>
                </li>
                {(adminUser || admin) && (
                  <li>
                    {" "}
                    <Link to={"/adminchat"}>管理者チャット</Link>
                  </li>
                )}
                {(currentUser || jwt) && (
                  <li>
                    {" "}
                    <Link to={"/chat"}>チャット</Link>
                  </li>
                )}
                {currentUser !== null || adminUser !== null || jwt || admin ? (
                  <>
                    <li>
                      {" "}
                      <Link to={"/"} onClick={logoutHandler}>
                        ログアウト
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
