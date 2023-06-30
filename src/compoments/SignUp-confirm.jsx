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

  const submitHandler = async (e) => {
    e.preventDefault();
    console.table(SignUpData);

    const { name, email, password } = SignUpData;

    try {
      // Register user
      const response = await axios.post("http://localhost:1337/api/auth/local/register", {
        username: name,
        email,
        password,
      });

      // Handle successful registration
      console.log("Well done!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);

      // Send email confirmation
      await axios.post("http://localhost:1337/api/auth/send-email-confirmation", {
        email,
      });

      // Store user details in the context
      dispatch({
        type: "SET_USER",
        payload: SignUpData,
      });

      // Show success message
      toast.success("User Registration Success");

      // Redirect to a confirmation page
      navigate(`/confirmation-pending`);
    } catch (error) {
      // Handle registration error
      console.log("An error occurred:", error.response);
      if (error.response?.data?.message?.[0]?.messages?.[0]?.id === "Auth.form.error.email.taken") {
        toast.error("This email address has already been taken");
      } else {
        toast.error("Registration failed");
      }
    }
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
