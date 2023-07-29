import React, { useState } from "react";
import "./Login.css";
import MyComponent from "../UI/MyComponent";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [item, setItem] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("user"); // Default login type is 'user'

  const emailChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, email: event.target.value }));
  };

  const passwordChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, password: event.target.value }));
  };

  const toggleLoginTypeHandler = () => {
    setLoginType((prevType) => (prevType === "user" ? "company" : "user"));
  };

  const logInSubmitHandler = async (event, loginType) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };

    if (item.email === "ADMIN") {
      loginType = "admin";
      
    }

    try {
      let loginUrl = `${process.env.REACT_APP_API}/admin/login`;
      if (loginType === "user") {
        loginUrl = `${process.env.REACT_APP_API}/users/login`;
      } else if (loginType === "company") {
        loginUrl = `${process.env.REACT_APP_API}/jobs/login`;
      }
      console.log(loginUrl);

      const response = await fetch(loginUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        

        localStorage.setItem("token", data.token);

        console.log(localStorage.getItem("token"));

        if (loginType === "user") {
          window.location.href = "/blogs";
        } else if (loginType === "company") {
          window.location.href = "/JobDashboard";
        }
         else if (loginType === "admin") {
          // localStorage.setItem("token", data);
          window.location.href = "/admin";
          console.log(data.token)
        }
      } else {
        const errorsResponse = await response.json();
        console.log("Error logging in:", errorsResponse.message);
        setError(errorsResponse.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="background_users">
      <div className="login_form">
        {/* <div className="login_box">
          <MyComponent />
        </div> */}
        <form onSubmit={(event) => logInSubmitHandler(event, loginType)}>
          <div>
            <img
              src="./images/Logo.png"
              alt="login_logo"
              className="login_logo"
            ></img>
          </div>
          <div>
            <input
              type="text"
              placeholder="email"
              className="login_data"
              onChange={emailChangeHandler}
              value={item.email}
              style={{ textAlign: "center" }}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              className="login_data"
              onChange={passwordChangeHandler}
              value={item.password}
              style={{ textAlign: "center" }}
            ></input>
          </div>
          <div>
            <button className="login_submit">Submit</button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="new_user">
          <p>
            New {loginType === "user" ? "User" : "Company"}?{" "}
            <a href={loginType === "user" ? "Signup" : "Company_Signup"}>
              Signup
            </a>
          </p>
        </div>
        <p className="forgot_ps">
          <a href="password">Forgot Password</a>
        </p>
        <div className="toggle_button">
          {/* Add the dynamic round button to toggle login type */}
          <button onClick={toggleLoginTypeHandler}>
            {loginType === "user"
              ? "Switch to Company Login"
              : "Switch to User Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
