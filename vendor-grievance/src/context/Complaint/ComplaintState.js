import React, { useState } from 'react'
import ComplaintContext from './ComplaintContext';

const ComplaintState = (props) => {
    const URL = "https://9d481b38trial-dev-vendor-grievance-service-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
    const comp1 = {
        vendor: '',
        pono: '',
        CompType: '',
        Description: '',

        Attachment: [],
        Comments: []
    };
    const comp2 = {
        id: null,
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
        const url = `${URL}complains?$filter=cpono eq '${pono}'`;

        try {
            const response = await fetch(url, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch complaints");
            }

            const json = await response.json();
            console.log(json);
            setTemp(json.value);
            // Filter and map only the required fields
            const filteredComplaints = json.value.map(({ complainno, cpannum, cpono, ccomplain_about, cvencode, cstatus }) => ({
                complainno,  // Complain number
                cpannum,     // PAN number
                cpono,       // PO number
                ccomplain_about,
                cvencode,
                cstatus
            }));
          

            // Set the filtered complaints in your state
            setPoComp(filteredComplaints);

        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };

    const singleComplain = async (id) => {
        if (!temp) {
            console.error("No complaints data available to search.");
            return;
        }

        // Fetch attachments for the given complaint number
        const attachmentResponse = await fetch(`${URL}files?$filter=complaintno eq '${id}'`, {
            method: "GET"
        });
        

        if (!attachmentResponse.ok) {
            console.error("Failed to fetch attachments");
            return;
        }

        const attjson = await attachmentResponse.json();
        const newAttch = attjson.value.map((file) => {
            const blob = new Blob([], { type: file.mediaType }); // Create an empty Blob of the correct type
            blob.name = file.fileName;                           // Add `name` property for compatibility
        
            return {
                name: file.fileName, // Match `name` expected by `Attachment`
                size: file.size,
                type: file.mediaType,
                blob: blob           // Store Blob instead of URL
            };
        });
        console.log(newAttch)

        const foundComplaint = temp.find(complaint => complaint.complainno === id);

        if (foundComplaint) {
           

            // Filter out any null attachments that couldn't be fetched
           
            setrevComp({
                id: foundComplaint.complainno,
                vendor: foundComplaint.cpannum,
                pono: foundComplaint.cpono,
                CompType: foundComplaint.ccomplain_about,
                Description: foundComplaint.cdesc,
                Attachment: newAttch // Attachments with URLs
            });
        } else {
            console.error(`Complaint with ID ${id} not found.`);
        }

        // Fetch comments as before
        const commentResponse = await fetch(`${URL}comment?$filter=complainno eq '${id}'`, {
            method: "GET"
        });

        const json = await commentResponse.json();
        const fetchedComments = json.value;
        setrevComp((prevRevComp) => ({
            ...prevRevComp,
            Comments: fetchedComments,
        }));
    };
    function generateUniqueComplaintNumber() {
        // Get current date and time
        const now = new Date();

        // Format date and time as: YYYYMMDDHHMMSS (e.g., 20231029123045)
        const formattedDate = now.toISOString().replace(/[-T:Z]/g, '').slice(0, 14); // Get 'YYYYMMDDHHMMSS'

        // Ensure the number part is 8 to 10 digits long
        const complaintNumber = formattedDate.slice(-8); // Take the last 8 digits of the formatted date/time

        return complaintNumber;
    }
    const handleCompSumbit = async (data) => {

        try {
            const complainno = generateUniqueComplaintNumber(); // Call the function to get the complaint number
            for (let i = 0; i < data.Attachment.length; i++) {
                let file = data.Attachment[i];
                let content = file.content;
                const base64Data = content.split(',')[1];

                // Adjusting media type based on file extension
                let mediaType;
                if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
                    mediaType = "image/png"; // Adjust this according to the file type
                } 
                debugger;
                await genAttachment(complainno, file.size, file.name, mediaType, base64Data); // Pass mediaType here
            }

            // await raiseComp(complainno, data.pono, data.vendor, data.CompType, data.Description);
             console.log(`Complaint generated with No ${complainno}`);
        } catch (error) {
            console.error("Error in handleCompSubmit:", error); // More descriptive error logging
        }
    };

    const raiseComp = async (complainno, cpono, cpannum, ccomplain_about, cdesc) => {
        const url = `${URL}complains`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    complainno: complainno,
                    cpono: cpono,
                    cvencode: cpannum,
                    cstatus: "Submitted",
                    ccomplain_about: ccomplain_about,
                    cdesc: cdesc
                })
            });
            const json = await response.json();
  
        } catch (error) {
            console.error("Error in raiseComp:", error); // More descriptive error logging
        }
    };

    const genAttachment = async (complaintno, size, fileName, mediaType, content) => {
        try {
            const mainUrl = `${URL}files`;
            // First POST to create the attachment
            const response = await fetch(mainUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: content,
                    mediaType: mediaType,
                    fileName: fileName,
                    size: size,
                    complaintno: complaintno
                })
            });
            console.log("Attahment Post success");
            console.log(response);

            const responseBody = await response.json(); // Get the response body
            const attachmentId = responseBody.ID; // Assuming your response returns an ID

            // Now update the attachment with the URL
            const res = await fetch(`${mainUrl}/${attachmentId}`, { // Use correct endpoint
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    size: size,
                    complaintno: complaintno,
                    url: `/odata/v4/my/files(${attachmentId})/content`
                })
            });

            const updateResponse = await res.json(); // Check response
            console.log(`Attachment updated:`, updateResponse);
        } catch (error) {
            console.error("Error in genAttachment:", error); // More descriptive error logging
        }
    };

    return (
        <ComplaintContext.Provider value={{ complaint, setComplaint, revComp, setrevComp, getCompalins, PoComp, singleComplain, handleCompSumbit }} >
            {props.children};
        </ComplaintContext.Provider>
    )
}

export default ComplaintState;