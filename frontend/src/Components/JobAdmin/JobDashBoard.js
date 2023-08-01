import React, {useState} from 'react';
import './JobDashBoard.css';
import JobPostForm from './JobPostForm';

const JobDashBoard = () => {

    const [jobs, setJobs] = useState([]);

    const fetchJobsHandler = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/jobs/by-company`);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setJobs(data);
            }
            else {
                console.log("Error fetching articles:", response.statusText);
              }
            } catch (error) {
              console.error("Error:", error);
            } 
        }

  return (
    <div>
      <div className='jobs_posted'>
        <h3>Jobs Posted</h3>

        
        
        {jobs.map((job) => (
            <div key={job.id}>
            <div>{job.title}</div>
            <div>{job.jobDesc}</div>
            <div>{job.location}</div>
            </div>
        ))}
        </div>
        {/* title: {type: String, required: true },
    jobDesc: {type: String, required: true},
    location: {type: String, required: true},
    jobType: {type: String, required:true},
    prerequisite: [{type: String, required: true }],
    responsibility: [{type: String, required: true}],
    misc: {type: String, required: true},
    dateOfPosting: {type: Date, default: Date.now},
    url: {type: String, required: true},
    postedBy: {type :mongoose.Schema.Types.ObjectId, ref: 'Company', required:true},
    isReported: {type :Boolean, default:false} */}
        <div className='add_job_form'>
            <h3>Add Job</h3>
            <JobPostForm />
        </div>
    </div>
  )
}

export default JobDashBoard
