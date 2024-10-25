import React, {useContext} from 'react'

import Attachment from './Attachment'
import ComplaintForm from './ComplaintForm'
import ComplaintContext from '../context/Complaint/ComplaintContext'
import SelectedPoTable from './SelectedPoTable'
function Preview() {
  const compContext = useContext(ComplaintContext);
  const { complaint, setComplaint } = compContext;
  return (
    <div className='parent'>
    <>
     <div className='step2-container'>
      <SelectedPoTable/>
    </div>
    <div className='step2-container'>
     <ComplaintForm complaint={complaint} setComplaint={setComplaint} ecom={false} heading="Raise Complaint" />
    </div>
    <div className='step2-container'>
      <Attachment complaint={complaint} setComplaint={setComplaint} ecom={false}/>
    </div>
    </>
    </div>
  )
}

export default Preview
