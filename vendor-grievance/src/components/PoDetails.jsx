import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { IoIosSearch } from "react-icons/io";
import React, { useContext, useEffect, useState } from 'react';
import SelectedPoContext from '../context/Selectedpo/SelectedPoContext';
import ComplaintContext from '../context/Complaint/ComplaintContext';
import Loading from './Loading';

function PoDetails() {
    const context = useContext(SelectedPoContext);
    const { selectedRow, setSelectedRow, poData, getPoData } = context;

    const compContext = useContext(ComplaintContext);
    const { complaint, setComplaint } = compContext;

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        getPoData();
    }, [])


    const onRowSelect = (rowData) => {
        setSelectedRow(rowData); // Update selected row
        const id = rowData.vendor;
        const po = rowData.pono;
        setComplaint({
            ...complaint,
            vendor: id,
            pono: po
        });
        console.log('Selected Row:', rowData); // Log the selected row details
    };

    const radioButtonTemplate = (rowData) => {
        const isChecked = selectedRow && selectedRow.pono === rowData.pono;
        return (
            <input
                type="radio"
                name="selectedRow"
                checked={isChecked || false}
                onChange={() => {
                    onRowSelect(rowData); // Handle row selection
                    // goToStep(1); // Navigate to the next step when selected
                }}
            />
        );
    };
    return (
        <div>
            <>
            {poData ? (


                <div className='step2-container'>
                    <div className="poTableContainer">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => setFilters({
                                    ...filters,
                                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                                })}
                            />
                            <IoIosSearch className="search-icon" />
                        </div>
                        <div className='poTable'>
                            <DataTable
                                className='TableContent p-datatable'
                                stripedRows
                                value={poData}
                                sortMode='multiple'
                                filters={filters}
                                paginator
                                rows={5}
                                rowsPerPageOptions={[5, 10, 15]}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                dataKey="pono" // Use a unique identifier for rows
                            >
                                <Column body={radioButtonTemplate} header="Select" />
                                <Column field='vendor' header="Vendor Id" sortable />
                                <Column field='pono' header="PO Number" sortable />
                                <Column field='type' header="Po/Invoice" sortable />
                                <Column field='amount' header="PO Amount" sortable />
                            </DataTable>
                        </div>
                    </div>
                </div>
                ) :
                <Loading />}
            </>
        </div>
    )
}

export default PoDetails
