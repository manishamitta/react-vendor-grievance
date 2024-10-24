import React, { useState, useRef, useContext } from 'react';
import ComplaintForm from './ComplaintForm';
import Attachment from './Attachment';
import ComplaintTable from './ComplaintTable';
import ComplaintContext from '../context/Complaint/ComplaintContext';
import ComplaintDetails from './ComplaintDetails';


const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Modal is not visible

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* <button className="modal-close" onClick={onClose}>X</button> */}
        {children} {/* Inject custom content here */}
      </div>
    </div>
  );
};

function Complaint() {

  const compContext = useContext(ComplaintContext);
  const { complaint, setComplaint, PoComp } = compContext;

  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <div>
      {/* Button to open the modal */}
      {/* <button onClick={openModal}>Open Modal</button> */}

      {/* Conditionally render modal or the remaining content */}
      {isModalOpen ? (
        <Modal show={isModalOpen} onClose={closeModal}>
          {/* Modal content */}
         <ComplaintDetails onClose={closeModal}/>
        </Modal>
      ) : (
        <>
          {/* Render other components when modal is closed */}
          <div className="step2-container">
            <ComplaintTable data={PoComp}  openModal={openModal}/>
          </div>
          <div className="step2-container">
            <ComplaintForm complaint={complaint} setComplaint={setComplaint} ecom={true} heading="Raise Complaint" />
          </div>
          <div className="step2-container">
            <Attachment complaint={complaint} setComplaint={setComplaint} ecom={true} />
          </div>
        </>
      )}
    </div>
  </>
  );
}

export default Complaint;
