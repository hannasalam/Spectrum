import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyComponent from "../UI/MyComponent";
import "./Company_Signup.css";

const Company_Signup = () => {
  const [item, setItem] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    address: "",
    location: "",
    website: "",
    description: "",
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
  const confirmPasswordChangeHandler = (event) => {
    setItem((prevItem) => ({
      ...prevItem,
      confirmPassword: event.target.value,
    }));
  };
  const addressChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, address: event.target.value }));
  };
  const locationChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, location: event.target.value }));
  };
  const websiteChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, website: event.target.value }));
  };
  const descriptionChangeHandler = (event) => {
    setItem((prevItem) => ({ ...prevItem, description: event.target.value }));
  };

  const [error, setError] = useState("");

    const companySignupHandler = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(item)
          };
        
          try {
            const response = await fetch(`${process.env.REACT_APP_API}/jobs/register`, requestOptions);
        
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                console.log(data.token);
                localStorage.setItem("token",data.token);
            
                  const blogsResponse = await fetch(`${process.env.REACT_APP_API}/jobs/`, {
                    headers: {
                      'Authorization': `Bearer ${data.token}`,
                    },
                  });
            
                  if (blogsResponse.ok) {
                    const blogsData = await blogsResponse.json();
                    console.log(blogsData);
                    window.location.href = '/jobdashboard';
                  } else {
                    console.log('Error fetching blogs:', blogsResponse.statusText);
                  }
                } else {
                  const errorData = await response.json();
                  console.log('Error registering user:', errorData.message);
                  setError(errorData.message);
                }
        
          } catch (error) {
            console.error('Error:', error);
          }
    };


  return (
    <div className="Job_signup">
      <div className="Job_signup_container">
        {/* <MyComponent /> */}
        <form className="Job_signup_form" onSubmit={companySignupHandler}>
        <div>
            <img
              src="./images/Logo.png"
              alt="signup_logo"
              className="signup_logo"
            ></img>
          </div>
          <div className="form_columns">
            <div className="form_column">
              <div className="company_name">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="company_data"
                  onChange={nameChangeHandler}
                  value={item.name}
                  required
                  style={{ textAlign: "center" }}
                />
              </div>
              <div className="company_email">
                <input
                  type="email"
                  placeholder="Email"
                  className="company_data"
                  onChange={emailChangeHandler}
                  value={item.email}
                  required
                  style={{ textAlign: "center" }}
                />
              </div>
              <div className="company_password">
                <input
                  type="password"
                  placeholder="Password"
                  className="company_data"
                  onChange={passwordChangeHandler}
                  value={item.password}
                  required
                  style={{ textAlign: "center" }}
                />
              </div>
              <div className="company_confirmPassword">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="company_data"
                  onChange={confirmPasswordChangeHandler}
                  value={item.confirmPassword}
                  required
                  style={{ textAlign: "center" }}
                />
              </div>
              <div className="company_location">
                <input
                  type="text"
                  placeholder="Location"
                  className="company_data"
                  onChange={locationChangeHandler}
                  value={item.location}
                //   required
                  style={{ textAlign: "center" }}
                />
              </div>
              {/* <div className="company_address">
                <textarea
                  type="text"
                  placeholder="Address"
                  className="company_det"
                  onChange={addressChangeHandler}
                  value={item.address}
                  required
                  style={{ textAlign: "center" }}
                />
              </div> */}
            </div>
            <div className="form_column">
              
              <div className="company_website">
                <input
                  type="text"
                  placeholder="Website"
                  className="company_data"
                  onChange={websiteChangeHandler}
                  style={{ textAlign: "center" }}
                  value={item.website}
                />
              </div>
              <div className="company_description">
                <textarea
                  type="text"
                  placeholder="Description"
                  className="company_det"
                  onChange={descriptionChangeHandler}
                  value={item.description}
                //   required
                  style={{ textAlign: "center" }}
                />
              </div>
              <div className="company_submit">
                <button type="submit">Submit</button>
              </div>
              <p>
                <b>Already Registered?</b> <Link to={`/`}>Login</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Company_Signup;
