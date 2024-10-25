import React, { useContext } from 'react';
import ComplaintForm from './ComplaintForm';
import Attachment from './Attachment';
import ComplaintContext from '../context/Complaint/ComplaintContext';
import Comments from './Comments';
import Loading from './Loading';

function ComplaintDetails({ onClose }) {
  const compContext = useContext(ComplaintContext);
  const { revComp, setrevComp } = compContext;

  const backButtonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  };

  // Show Loading component while revComp is null
  if (!revComp) {
    return <Loading  />;
  }

  return (
    <div className='parent'>
    <>
      <div className='step2-container'>
        <ComplaintForm 
          complaint={revComp} 
          setComplaint={setrevComp} 
          ecom={false} 
          heading={`Complaint No :- ${revComp.id}`} 
        />
      </div>
      <div className="step2-container">
        <Comments commentsData={revComp.Comments} />
      </div>
      <div className='step2-container'>
        <Attachment complaint={revComp} setComplaint={setrevComp} ecom={false} />
      </div>
      <div className="bck-btn">
        <button onClick={onClose} style={backButtonStyle}>
          Back
        </button>
      </div>
    </>
    </div>
  );
}

export default ComplaintDetails;
