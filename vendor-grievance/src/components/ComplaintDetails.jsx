import React, { useContext , useState} from 'react';
import ComplaintForm from './ComplaintForm';
import Attachment from './Attachment';
import ComplaintContext from '../context/Complaint/ComplaintContext';
import Comments from './Comments';
import Loading from './Loading';
import Allcomments from './Allcomments';


const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Modal is not visible

  return (
    <div className="modal-overlay">
      <div className="modal-comment-content">

        {/* <button className="modal-close" onClick={onClose}>X</button> */}
        {children} {/* Inject custom content here */}
      </div>
    </div>
  );
};

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

  const [isCModalOpen, setCModalOpen] = useState(false);

  // Function to open the modal
  const openCModal = () => {
    setCModalOpen(true);
  };

  // Function to close the modal
  const closeCModal = () => {
    setCModalOpen(false);
  };  
  // Show Loading component while revComp is null
  if (!revComp) {
    return <Loading minh="80vh" />;
  }

  return (
    <>
      <div>
      {isCModalOpen ? (
        <Modal show={isCModalOpen} onClose={closeCModal}>
          {/* Modal content */}
        <Allcomments  commentsData={revComp.Comments} onClose={closeCModal}/>
        </Modal>
      ) :(
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
              <Comments commentsData={revComp.Comments} openCModal={openCModal}/>
            </div>
            <div className='step2-container'>
              <Attachment complaint={revComp} setComplaint={setrevComp} ecom={false} rev={true} />
            </div>
            <div >
              <button onClick={onClose} className="bck-btn">
                Back
              </button>
            </div>
          </>
        </div>)}
      </div>
    </>
  );
}

export default ComplaintDetails;
