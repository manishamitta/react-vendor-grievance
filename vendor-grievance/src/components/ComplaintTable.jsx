import React, { useContext } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import ComplaintContext from '../context/Complaint/ComplaintContext'
function ComplaintTable({ data }) {

    const compContext = useContext(ComplaintContext);
    const { singleComplain } = compContext;
    const navigate = useNavigate();

    const onRowClick = (rowData) => {
        console.log('Row clicked:', rowData);
        singleComplain(rowData.complainno);
        // Navigate to a new route with the complaint number
        navigate(`/complaint/${rowData.complainno}`); // Adjust the route as necessary
    };
    const complaintNoTemplate = (rowData) => (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span>{rowData.ccomplain_about}</span>
            <span style={{ marginLeft: 'auto', color: 'gray' }}>&gt;</span> {/* Right arrow symbol */}
        </div>
    );
    return (
        <>
            <div className="ComplaintTable">
                <h2 style={{ textAlign: 'start' , margin : "0px 5px 5px 0px" }}>Related Complaints</h2>
                <DataTable
                    className='ComplaintTableContent'
                    value={data}
                    sortMode='multiple'
                    scrollable // Enable scrolling
                    scrollHeight="200px" // Set the scroll height
                    rows={10}
                    rowsPerPageOptions={[10, 15,20]}
                    dataKey="complainno" // Use a unique identifier for rows
                    onRowClick={(event) => onRowClick(event.data)}
                >
                    <Column field='complainno' header="Complaint No" sortable />
                    <Column field='cpono' header="PO Number" sortable />
                    <Column field='ccomplain_about' header="Complaint Type" sortable body={complaintNoTemplate} />
                </DataTable>
            </div>

        </>
    );
}

export default ComplaintTable
