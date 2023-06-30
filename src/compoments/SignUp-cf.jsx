import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function SignUp() {
  const [SignUpData, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendConfirmationEmail = (email) => {
    axios
      .post("http://localhost:1337/api/auth/send-email-confirmation", {
        email: email,
      })
      .then((response) => {
        console.log("Confirmation email sent");
        toast.info("Confirmation email sent. Please check your inbox.");
      })
      .catch((error) => {
        console.log("Error sending confirmation email:", error);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { name, email, password } = SignUpData;

    axios
      .post("http://localhost:1337/api/auth/local/register", {
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
        toast.success("User Registration Success");
        sendConfirmationEmail(email); // Call the function to send confirmation email
        navigate("/chat");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        toast.error("This email address has already been taken");
      });
  };

  const onChangeHandler = (e) => {
    setSignUp({
      ...SignUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="singin">
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
