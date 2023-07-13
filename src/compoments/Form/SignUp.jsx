import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import TitleIcon from "../../assets/img/msg_icon_black.png";

function SignUp() {
  const [SignUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password } = SignUpData;

    if (!agreeChecked) {
      toast.error("Please check the agreement.");
      setLoading(false);
      return;
    }

    axios
      .post("https://fds-backend.onrender.com/api/auth/local/register", {
        username: name,
        email,
        password,
      })
      .then((response) => {
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);

        dispatch({
          type: "SET_USER",
          payload: SignUpData,
        });
        localStorage.setItem("jwt-token", response.data.jwt);
        localStorage.setItem("name", response.data.user.username);
        toast.success("User Registration Success");
        setLoading(false);
        navigate("/signin");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        toast.error(error.response.data.error.message);
        setLoading(false);
      });
  };

  const onChangeHandler = (e) => {
    setSignUpData({
      ...SignUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setAgreeChecked(e.target.checked);
  };

  return (
    <div className="signin signup">
      <div className="container">
        <div className="signup-wrapper">
          <div className="signup-block">
            <div className="ttl-row">
              <div className="msg-icon">
                <img src={TitleIcon} alt="" />
              </div>
              <p className="txt">ちょくれん</p>
            </div>
            <p className="desc-txt">アカウントを作成する</p>
            <form onSubmit={submitHandler}>
              <div className="form-row">
                <label htmlFor="">氏名</label>
                <input name="name" value={SignUpData.name} type="text" onChange={onChangeHandler} />
              </div>
              <div className="form-row">
                <label htmlFor="">メールアドレス</label>
                <input name="email" value={SignUpData.email} type="text" onChange={onChangeHandler} />
              </div>
              <div className="form-row">
                <label htmlFor="">パスワード</label>
                <input name="password" type="password" value={SignUpData.password} onChange={onChangeHandler} />
              </div>
              <p className="term-txt">
                <span>ご利用規約</span>を必ずご確認ください。
              </p>
              <div className="check">
                <input type="checkbox" className="styled-checkbox" id="checkagree" name="agree" checked={agreeChecked} onChange={handleCheckboxChange} />
                <label htmlFor="checkagree" className="check-agree">
                  同意しました。
                </label>
              </div>
              <button className="register-btn" type="submit">
                アカウント作成
              </button>
              {loading && <Loading />}
              <p className="register-txt">既にアカウントをお持ちですか？</p>
              <Link to={"/signin"} className="login-btn">
                ログインはこちら
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
