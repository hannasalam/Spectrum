import React,{useState, useEffect} from 'react';
import './Admin.css'

const Admin = () => {

  const [pendingCompanyApproval,setPendingCompanyApproval] = useState([])

  const [reported,setReported] = useState([])

  const [suspended,setSuspended] = useState([])

  const [approve,setApprove] = useState(false);

  const [reject,setReject] = useState(true);

  const approveHandler = () => {
    setApprove(false);
    setReject(true);
  }

  const token = localStorage.getItem("token");





  const fetchPendingCompanyApproval = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/pendingCompanyApproval`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPendingCompanyApproval(data);
      } else {
        console.error("Error fetching pending company approval");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const approveCompanyHandler = async (companyId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/approveCompany/${companyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();  
        console.log(data);
        fetchPendingCompanyApproval();
      } else {
        console.error("Error approving company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const fetchReportedContent = async (content) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API}/admin/reportedContent/${content}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setReported(data);
  //     } else {
  //       console.error("Error fetching reported content");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  const rejectCompanyHandler = async (companyId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/rejectCompany/${companyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchPendingCompanyApproval();
      } else {
        console.error("Error rejecting company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    fetchPendingCompanyApproval();
    // fetchReportedContent();
  }, []);




  return (
    <div>
    <div className='pending_Requests'>
      <h3>Pending Requests</h3>
      {pendingCompanyApproval.map((company) => (
        <div className='pending_Requests_Company' key={company._id}>
          <h4>{company.name}</h4>
          <p>{company.email}</p>
          <p>{company.companyDescription}</p>
          <button className='approve_button' onClick={() => approveCompanyHandler(company._id)}>Approve</button>
          <button onClick={approveHandler}>Reject</button>
        </div>
      ))}
    </div>
    <div className='reported_Content'>
      <h3>Reported Content</h3>
      </div>  



  </div>
  )
}

export default Admin
