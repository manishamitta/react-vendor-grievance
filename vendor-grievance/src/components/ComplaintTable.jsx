import React, { useContext } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ComplaintContext from '../context/Complaint/ComplaintContext'

function ComplaintTable({ data, openModal }) {

    const compContext = useContext(ComplaintContext);
    const { singleComplain } = compContext;






    const onRowClick = (rowData) => {
        console.log('Row clicked:', rowData);
        singleComplain(rowData.complainno);
        openModal();
        
    };
    const complaintNoTemplate = (rowData) => (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span>{rowData.ccomplain_about}</span>
            <span style={{ marginLeft: 'auto', color: 'gray' }}>&gt;</span> {/* Right arrow symbol */}
        </div>
    );
    const rowClassName = () => {
        return {
            'highlight-row': true, // Add a custom class to all rows
        };
    };
    return (
        <>
            <div className="ComplaintTable">
                <h2 style={{ textAlign: 'start', margin: "0px 5px 5px 0px" }}>Complaint Table</h2>
                <DataTable
                    className='ComplaintTableContent'
                    value={data}
                    sortMode='multiple'
                    scrollable // Enable scrolling
                    scrollHeight="200px" // Set the scroll height
                    rows={10}
                    rowsPerPageOptions={[10, 15, 20]}
                    dataKey="complainno" // Use a unique identifier for rows
                    onRowClick={(event) => onRowClick(event.data)}
                    rowClassName={rowClassName}
                >
                    <Column field='complainno' header="Complaint No" sortable />
                    <Column field='cpono' header="PO/Invoice Number" sortable />
                    {/* <Column field='cvencode' header="Vendor Code" sortable /> */}
                    <Column field='cstatus' header="Status" sortable />
                    <Column field='ccomplain_about' header="Type" sortable body={complaintNoTemplate} />
                </DataTable>
            </div>


        </>
    );
}

export default ComplaintTable
