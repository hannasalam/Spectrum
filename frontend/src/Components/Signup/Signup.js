import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyComponent from "../UI/MyComponent";

import "./Signup.css";

const Signup = () => {
  const [item, setItem] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    sexualPreference: "",
    ProfilePicture: "",
    dob: "",
    bio: "",
  });

  const nameChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, name: event.target.value }));
  };
  const emailChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, email: event.target.value }));
  };
  const passwordChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, password: event.target.value }));
  };
  const genderChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, gender: event.target.value }));
  };
  const sexChangeHandler = (event) => {
    setItem((prevItem) => ({
      ...prevItem,
      sexualPreference: event.target.value,
    }));
  };
  const dobChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, dob: event.target.value }));
  };
  const bioChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, bio: event.target.value }));
  };
  // const profilePicChangeHandler = (event) => {
  //   setItem((prevItem) => ({ ...prevItem, ProfilePicture: event.target.value }))
  // }

  const [error, setError] = useState("");

  const signupSubmitHandler = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/users/register`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.token);
        localStorage.setItem("token", data.token);

        const blogsResponse = await fetch(`${process.env.REACT_APP_API}/blogs`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json();
          console.log(blogsData);
          window.location.href = "/blogs";
        } else {
          console.log("Error fetching blogs:", blogsResponse.statusText);
        }
      } else {
        const errorData = await response.json();
        console.log("Error registering user:", errorData.message);
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="background_user">
      <div className="form_bg">
        {/* <div className="login_box">
          <MyComponent />
        </div> */}
        <form className="form_control" onSubmit={signupSubmitHandler}>
          <div>
            <img
              src="./images/Logo.png"
              alt="signup_logo"
              className="signup_logo"
            ></img>
          </div>
          <div className="u_name">
            <input
              type="text"
              placeholder="Name"
              className="input_data"
              onChange={nameChangeHandler}
              value={item.name}
              required
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="u_mail">
            <input
              type="text"
              placeholder="E-mail"
              className="input_data"
              onChange={emailChangeHandler}
              value={item.Email}
              required
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="u_password">
            <input
              type="password"
              placeholder="Password"
              className="input_data"
              onChange={passwordChangeHandler}
              value={item.password}
              required
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="u_gender">
            <input
              type="text"
              placeholder="gender"
              className="input_data"
              onChange={genderChangeHandler}
              value={item.gender}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="u_gender">
            <input
              type="text"
              placeholder="sexual orientation"
              className="input_data"
              onChange={sexChangeHandler}
              value={item.sexualPreference}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="u_DOB">
            <input
              type="date"
              placeholder="Date Of Birth"
              className="dob"
              onChange={dobChangeHandler}
              value={item.dob}
              required
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="u_Bio">
            <input
              type="text"
              placeholder="Bio"
              className="input_data"
              onChange={bioChangeHandler}
              value={item.bio}
              style={{ textAlign: "center" }}
            />
          </div>
          {/* <div className='u_Img'><input type='img' placeholder='Profile_pic' className='input_data' onChange={profilePicChangeHandler} value={item.ProfilePicture} style={{ textAlign: 'center' }}/></div> */}
          <div>
            <button className="u_submit">Submit</button>{" "}
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        <p>
          Already A User? <Link to={`/`}>Login</Link>
        </p>
      </div>
    </div>
    // </div>
  );
};

export default Signup;
