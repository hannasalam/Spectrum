import React from 'react';
import './JobDetails.css';

const JobDetails = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className='job_details_wrapper'>
      <button className="close-button" onClick={handleClose}>
        &#x2716;
      </button>
      <div className='job_title'>
        <h3>{props.title}</h3>
      </div>
      <div className='job_company'>
        <b>Company:</b> {props.company}
      </div>
      <div className='job_location'>
        <b>Location:</b> {props.location}
      </div>
      <div className='job_mode'>
        <b>Job Type:</b> {props.jobType}
      </div>
      <div className='job_salary'>{props.amount}</div>
      <div className='job_description'>
        <div className='qualification'>
          <b> Technical Skills:</b>
          <ul>
            {props.prerequisite.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='description'>
          <b>Description:</b> {props.jobDesc}
        </div>
        <div className='skills'>
          <b> Non Technical Skills:</b> {props.misc}
        </div>
        <div className='responsibilities'>
          <b>Responsibilities:</b>
          <ul>
            {props.responsibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='job_url'>
            <a href={props.jobUrl}>Apply Here</a>         
        </div>
      </div>
      <div className='date'>
        Posted on {" "}
        {new Date(props.dateOfPosting).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </div>
  );
};

export default JobDetails;
