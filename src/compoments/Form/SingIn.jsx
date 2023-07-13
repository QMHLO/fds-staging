import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./form.css";
import TitleIcon from "../../assets/img/msg_icon_black.png";
import LoginImage from "../../assets/img/login_img.png";

function SignIn() {
  const [SignInData, setSignIn] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(!loading);

    // signin
    const { email, password } = SignInData;
    if ((process.env.REACT_APP_OWNER_MAIL === email && process.env.REACT_APP_OWNER_PASS === password) || (process.env.REACT_APP_ADMIN_MAIL === email && process.env.REACT_APP_ADMIN_PASS === password)) {
      dispatch({
        type: "SET_ADMINUSER",
        payload: SignInData,
      });
      localStorage.setItem("admin", "1");
      toast.success("Welcome Admin");
      navigate("/adminchat");
      return;
    }
    axios
      .post("https://fds-backend.onrender.com/api/auth/local", {
        identifier: email,
        password,
      })
      .then((response) => {
        // Handle success.
        // console.log("Well done!");
        // console.log("User profile", response.data.user);
        // console.log("User token", response.data.jwt);
        // console.log("User Login Successful");
        toast.success(`Welcome ${response.data.user.username}`);
        setLoading(!loading);

        dispatch({
          type: "SET_USER",
          payload: SignInData,
        });

        console.log(response.data.user.username);
        // console.log(response);
        localStorage.setItem("jwt-token", response.data.jwt);
        localStorage.setItem("email", email);
        localStorage.setItem("name", response.data.user.username);
        navigate("/chat");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        toast.error(error.response.data.error.message);
      });

    console.log(SignInData);
  };

  const onChangeHandler = (e) => {
    setSignIn({
      ...SignInData,
      [e.target.name]: e.target.value,
    });
  };
  <div>
    <Loading />
  </div>;

  // console.log(import.meta.env.VITE_OWNER_MAIL);

  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="left">
            <div class="ttl-row">
              <div class="msg-icon">
                <img src={TitleIcon} alt="" />
              </div>
              <p class="txt">ちょくれん</p>
            </div>
            <p className="desc-txt">
              この物件の<span>売主</span>と<span>直接連絡</span>を取る
            </p>
            <form onSubmit={submitHandler}>
              <div className="form-row">
                <label htmlFor="">メールアドレス</label>
                <input name="email" value={SignInData.email} type="text" onChange={onChangeHandler} />
              </div>
              <div className="form-row">
                <label htmlFor="">パスワード</label>
                <input name="password" type="password" value={SignInData.password} onChange={onChangeHandler} />
              </div>
              <button className="login-btn" type="submit">
                ログイン
              </button>
              {/* {loading ? <Loading /> : "ログイン"} */}
              <p className="register-txt">
                ちょくれんを利用するためにはログインが必要です
                <br />
                アカウントをお持ちでない方は下記からアカウントを作成してください
              </p>
              <Link to={"/signup"} className="register-btn">
                アカウント作成
              </Link>
            </form>
          </div>
          <div className="right">
            <div className="img-wrapper">
              <img src={LoginImage} alt="LoginImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
