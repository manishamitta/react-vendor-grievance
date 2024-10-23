import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
function ComplaintDetails({setCurrentStep }) {
    const navigate = useNavigate();
    const location = useLocation();
    const backButtonStyle = {
        marginTop: '10px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    };
    

    const handleBackClick = () => {
    
    };


  return (
    <div>
      Complaint Details
      <button onClick={handleBackClick} style={backButtonStyle}>
                Back
            </button>
    </div>
  )
}

export default ComplaintDetails
