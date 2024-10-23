import React, { useState, useRef, useContext } from 'react';
import ComplaintForm from './ComplaintForm';
import Attachment from './Attachment';
import ComplaintTable from './ComplaintTable';
import ComplaintContext from '../context/Complaint/ComplaintContext';


function Complaint() {

const compContext = useContext(ComplaintContext);
const {complaint, setComplaint} = compContext;

  return (
    <>
      <div className="step2-container">
        <ComplaintTable />
      </div>
      <div className="step2-container">
        {/* <p>Step 2</p> */}
        <ComplaintForm complaint={complaint} setComplaint={setComplaint} ecom={true} />
      </div >
      <div className="step2-container">
        <Attachment  complaint={complaint} setComplaint={setComplaint} ecom={true}/>
      </div>
    </>
  );
}

export default Complaint;
