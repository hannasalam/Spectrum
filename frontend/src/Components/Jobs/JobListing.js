import React, { useState, useEffect } from "react";
import "./JobItems.css";
import JobDate from "./JobDate";
import { Link } from "react-router-dom";

const JobListing = (props) => {
  const [isJobDetails, setIsJobDetails] = useState(false);
  const [jobItems, setJobItems] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        setJobItems(responseData);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobItems.filter((job) => {
    const jobTitle = job.title.toLowerCase();
    const jobLocation = job.location.toLowerCase();
    const titleFilterValue = titleFilter.toLowerCase();
    const locationFilterValue = locationFilter.toLowerCase();

    const titleMatch = jobTitle.includes(titleFilterValue);
    const locationMatch = jobLocation.includes(locationFilterValue);

    return titleMatch && locationMatch;
  });

  return (
    <div className="job_item">
      <div>
        {filteredJobs.map((job) => (
          <div className="details" key={job._id} id={job._id}>
            <div className="title">{job.title}</div>
            <div className="font_size">
              <div className="company">Company: {job.postedBy.name}</div>
              Description: {job.jobDesc}
              <div>{job.location}</div>
              <span>
                <div className="amount">
                  Job Type: {job.jobType}
                </div>
              </span>
            </div>
            <p>
                <b>PreRequisites: </b> {job.prerequisite.join(', ')}
              </p>
            <div className="date">
              {new Date(job.dateOfPosting).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <Link to="/jobs">
              <button className="job_readmore_btn">See Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
