import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../Loading";

function SignUp() {
  const [SignUpData, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(!loading);

    // stapi authReady
    // retur true

    console.table(SignUpData);

    const { name, email, password } = SignUpData;

    axios
      .post("https://fds-backend.onrender.com/api/auth/local/register", {
        username: name,
        email,
        password,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);

        dispatch({
          type: "SET_USER",
          payload: SignUpData,
        });
        localStorage.setItem("jwt-token", response.data.jwt);
        toast.success("User Registration Success");
        setLoading(!loading);
        navigate("/chat");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        toast.error("This email address had been taken");
      });

    console.log("State Updated to Auth");
  };

  const onChangeHandler = (e) => {
    setSignUp({
      ...SignUpData,
      [e.target.name]: e.target.value,
    });
  };

  <div>
    <Loading />
  </div>;
  return (
    <div className="singup">
      <h1>Sign Up form</h1>
      <form onSubmit={submitHandler}>
        <input name="name" value={SignUpData.name} type="text" placeholder="enter your name" onChange={onChangeHandler} />
        <input name="email" value={SignUpData.email} type="text" placeholder="enter your email" onChange={onChangeHandler} />
        <input name="password" type="password" value={SignUpData.password} placeholder="enter your password" onChange={onChangeHandler} />
        <button type="submit">Submit</button>
        <p>
          Already have an account? <Link to={"/signin"}>SignIn Here!</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
