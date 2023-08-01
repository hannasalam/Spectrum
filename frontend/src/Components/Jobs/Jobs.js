import React, { useState, useEffect } from "react";
import "./Jobs.css";
import JobItems from "./JobItems";
import JobDetails from "./JobDetails";

const Jobs = (props) => {
  const [enteredJobs, setEnteredJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
   
  const seeDetailsHandler = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const token = localStorage.getItem("token");

  const jobFetchHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const jobs = responseData.map((job) => {
        return {
          id: job._id,
          title: job.title,
          jobDesc: job.jobDesc,
          location: job.location,
          jobType: job.jobType,
          prerequisite: job.prerequisite,
          responsibility: job.responsibility,
          misc: job.misc,
          dateOfPosting: job.dateOfPosting,
          url: job.url,
          postedBy: job.postedBy, 
        };
      });
      setEnteredJobs(jobs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    jobFetchHandler();
  }, []);

  const 
  filteredJobs = enteredJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();
    const jobLocation = job.location.toLowerCase();
    const titleFilterValue = titleFilter.toLowerCase();
    const locationFilterValue = locationFilter.toLowerCase();

    const titleMatch = jobTitle.includes(titleFilterValue);
    const locationMatch = jobLocation.includes(locationFilterValue);

    return titleMatch && locationMatch;
  });

  return (
    <div className="jobs_container">
      <div className="filter_container">
        <input
          type="text"
          placeholder="Filter by role"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={handleLocationFilterChange}
        />
      </div>
      <div className="trending_jobs_container">
        <h3>Trending Jobs</h3>
        <div className="job_list_scrollable">
          {filteredJobs.map((job) => (
            <JobItems
              onSeeMore={seeDetailsHandler}
              key={job.id}
              id={job.id}
              title={job.title}
              jobDesc={job.jobDesc}
              location={job.location}
              jobType={job.jobType}
              postedBy= {job.postedBy.name}
              prerequisite={job.prerequisite}
              responsibility={job.responsibility}
              misc={job.misc}
              dateOfPosting={job.dateOfPosting}
              jobUrl={job.url}
              company={job.postedBy.name}
              onClose={() => setSelectedJobId(null)}
            />
          ))}
        </div>
      </div>
      <div className="job_details_container">
        {selectedJobId &&
          filteredJobs
            .filter((job) => job.id === selectedJobId)
            .map((job) => (
              <JobDetails
                key={job.id}
                title={job.title}
                jobDesc={job.jobDesc}
                location={job.location}
                jobType={job.jobType}
                postedBy= {job.postedBy.name}
                prerequisite={job.prerequisite}
                responsibility={job.responsibility}
                misc={job.misc}
                dateOfPosting={job.dateOfPosting}
                jobUrl={job.url}
                company={job.postedBy.name}
                onClose={() => setSelectedJobId(null)}
              />
            ))}
      </div>
    </div>
  );
};

export default Jobs;
