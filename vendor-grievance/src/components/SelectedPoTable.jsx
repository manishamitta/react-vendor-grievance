import React, { useContext } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SelectedPoContext from '../context/Selectedpo/SelectedPoContext';
function SelectedPoTable() {

    const pocontext = useContext(SelectedPoContext);

    const { selectedRow } = pocontext;


    return (

        <div className="ComplaintTable">
            <h2 style={{ textAlign: 'start' }}>Selected PO</h2>
            <DataTable
                className='ComplaintTableContent'
                scrollable // Enable scrolling
                dataKey="pono" // Use a unique identifier for rows
                value={selectedRow ? [selectedRow] : []} // Use a unique identifier for rows
            >
                <Column field='pono' header="PO Number" />
                <Column field='vendor' header="Vendor Id" />
                <Column field='type' header="PO/Invoice" />
                <Column field='amount' header="PO Amount" />
            </DataTable>
        </div>

    )
}

export default SelectedPoTable
