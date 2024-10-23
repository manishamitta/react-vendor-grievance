import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';

function ComplaintTable() {
    const navigate = useNavigate();
    const data = [
        { ComplaintNo: 'C001', PoNo: 'PO123', ComplaintType: 'Delivery Delay' },
        { ComplaintNo: 'C002', PoNo: 'PO124', ComplaintType: 'Damaged Product' },
        { ComplaintNo: 'C003', PoNo: 'PO125', ComplaintType: 'Incorrect Item' },
        { ComplaintNo: 'C004', PoNo: 'PO126', ComplaintType: 'Late Delivery' },
        { ComplaintNo: 'C005', PoNo: 'PO127', ComplaintType: 'Product Defect' },
        { ComplaintNo: 'C006', PoNo: 'PO127', ComplaintType: 'Product Defect' },
      ];
      const onRowClick = (rowData) => {
        console.log('Row clicked:', rowData);
        // Navigate to a new route with the complaint number
        navigate(`/complaint/${rowData.ComplaintNo}`); // Adjust the route as necessary
    };
    const complaintNoTemplate = (rowData) => (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span>{rowData.ComplaintNo}</span>
            <span style={{ marginLeft: 'auto', color: 'gray' }}>&gt;</span> {/* Right arrow symbol */}
        </div>
    );
  return (
    <>
            <div className="ComplaintTable">
                <h2 style={{textAlign : 'start'}}>Relate Complaints</h2>
                <DataTable 
                    className='ComplaintTableContent'
                    value={data}
                    sortMode='multiple'
                    scrollable // Enable scrolling
                    scrollHeight="200px" // Set the scroll height
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15]}
                    dataKey="ComplaintNo" // Use a unique identifier for rows
                    onRowClick={(event) => onRowClick(event.data)} 
                >
                    <Column field='ComplaintNo' header="ComplaintNo" sortable />
                    <Column field='PoNo' header="PO Number" sortable />
                    <Column field='ComplaintType' header="ComplaintType" sortable body={complaintNoTemplate} />
                </DataTable>
            </div>
            
        </>
    );
}

export default ComplaintTable
