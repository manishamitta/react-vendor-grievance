import React, { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ComplaintForm from './ComplaintForm';
import Attachment from './Attachment'
import ComplaintContext from '../context/Complaint/ComplaintContext'
function ComplaintDetails() {

  const compContext = useContext(ComplaintContext);
  const { revComp, setrevComp } = compContext;
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
    navigate(`/`);
  };


  return (
    <>
      
        <div className='step2-container'>
          <ComplaintForm complaint={revComp} setComplaint={setrevComp} ecom={false} heading="Complaint" />
        </div>
        <div className='step2-container'>
          <Attachment complaint={revComp} setComplaint={setrevComp} ecom={false} />
        </div>
        <div className="bck-btn">
          <button onClick={handleBackClick} style={backButtonStyle}>
            Back
          </button>
        </div>
    </>
  )
}

export default ComplaintDetails
