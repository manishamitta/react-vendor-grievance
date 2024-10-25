import React, { useState } from 'react'
import ComplaintContext from './ComplaintContext';


const ComplaintState = (props) => {
    const comp1 = {
        vendor: '',
        pono: '',
        CompType: '',
        Description: '',
        
        Attachment: [],
        Comments : []
    };
    const comp2 = {
        id : null,
        vendor: null,
        pono: null,
        CompType: null,
        Description: null,
        Attachment: []
    };

    const [complaint, setComplaint] = useState(comp1);
    const [revComp, setrevComp] = useState(comp2);
    const [temp, setTemp] = useState(null);
    const [PoComp, setPoComp] = useState(null);
    const getCompalins = async (pono) => {
        const url = `https://af3dba34trial-dev-vendorapp-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/complains?$filter=cpono eq '${pono}'`;

        try {
            const response = await fetch(url, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch complaints");
            }

            const json = await response.json();
            console.log("Fetched complaints:", json.value);
            setTemp(json.value);
            // Filter and map only the required fields
            const filteredComplaints = json.value.map(({ complainno, cpannum, cpono, ccomplain_about,cvencode, cstatus }) => ({
                complainno,  // Complain number
                cpannum,     // PAN number
                cpono,       // PO number
                ccomplain_about,
                cvencode,
                cstatus
            }));
            console.log(filteredComplaints);

            // Set the filtered complaints in your state
            setPoComp(filteredComplaints);

        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };

    const singleComplain = async(id) => {
        if (!temp) {
            console.error("No complaints data available to search.");
            return;
        }

        const foundComplaint = temp.find(complaint => complaint.complainno === id);

        if (foundComplaint) {
            setrevComp({
                id : foundComplaint.complainno,
                vendor: foundComplaint.cvencode, // vendor id
                pono: foundComplaint.cpono,      // PO number
                CompType: foundComplaint.ccomplain_about, // Complaint type
                Description: foundComplaint.cdesc, // Complaint description
                Attachment: []  // Attachments will be added later
            });
        } else {
            console.error(`Complaint with ID ${id} not found.`);
        }
        const response = await fetch( `https://af3dba34trial-dev-vendorapp-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/comment?$filter=complainno eq '${id}'` ,{
            method : "GET"
        });

        const json = await response.json();
        console.log(json);
        const fetchedComments = json.value;
        setrevComp((prevRevComp) => ({
            ...prevRevComp,
            Comments: fetchedComments, // Update the Comments field with fetched comments
          }));

    };
    return (
        <ComplaintContext.Provider value={{ complaint, setComplaint, revComp, setrevComp, getCompalins, PoComp, singleComplain }} >
            {props.children};
        </ComplaintContext.Provider>
    )
}

export default ComplaintState;