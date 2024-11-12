import React, { useState, useRef, useContext } from 'react';
import { MdDelete } from "react-icons/md";

// Import your images for each file type
import wordIcon from './images/word.png'; // Replace with the correct path
import pdfIcon from './images/pdf.png'; // Replace with the correct path
import imageIcon from './images/image.png'; // Replace with the correct path
import textIcon from './images/text.png'; // Replace with the correct path
import zipIcon from './images/zip.png'; // Replace with the correct path
import attach from './images/attachment.png';

function Attachment(props) {
    const fileInputRef = useRef(null);
    const { complaint, setComplaint, ecom, rev = false } = props;
    // Helper to read file content as Base64 and create Blob URL
    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Content = reader.result; // Get the base64 content
                const blob = new Blob([new Uint8Array(base64Content)], { type: file.type });
                const url = URL.createObjectURL(blob); // Create a Blob URL
                resolve({ base64Content, url });  // Resolve with base64 and URL
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);  // Read file as base64 URL
        });
    };

    // Handle file selection
    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Process each file and read its content
        const filesWithContent = await Promise.all(
            selectedFiles.map(async (file) => {
                const { base64Content, url } = await readFileContent(file); // Get both base64 content and URL
                return {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    content: base64Content, // Store base64 content
                    url: url // Store the Blob URL
                };
            })
        );

        // Update the complaint object with the new attachments
        setComplaint({
            ...complaint,
            Attachment: [...complaint.Attachment, ...filesWithContent]
        });

        fileInputRef.current.value = '';  // Reset the input after selection
    };

    // Handle file deletion
    const handleDelete = (fileName) => {
        const updatedAttachments = complaint.Attachment.filter(file => file.name !== fileName);
        // Update the complaint object after deletion
        setComplaint({
            ...complaint,
            Attachment: updatedAttachments
        });
    };

    // Get file type icon based on file extension
    const getFileIcon = (fileName) => {
       
        if(!fileName){return}
        const extension = fileName.split('/').pop().toLowerCase();
        switch (extension) {
            case 'doc':
            case 'docx':
                return <img src={wordIcon} alt="Word Document" width="16" height="16" />;
            case 'pdf':
                return <img src={pdfIcon} alt="PDF Document" width="16" height="16" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <img src={imageIcon} alt="Image" width="16" height="16" />;
            case 'txt':
                return <img src={textIcon} alt="Text File" width="16" height="16" />;
            case 'zip':
            case 'rar':
                return <img src={zipIcon} alt="Zip File" width="16" height="16" />;
            default:
                return <img src={attach} alt="File" width="16" height="16" />; // Default icon for unknown types
        }
    };

    return (
        <div className="attachment-container">
            <div className="heading-btn">
                <h2>Attachments</h2>
                <button className="attach-btn" style={{ display: !ecom ? 'none' : 'block' }}>
                    <label htmlFor="file-input" className="custom-file-label">
                        Attach
                    </label>
                </button>
                <input
                    ref={fileInputRef}
                    id="file-input"
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
            <div className="attachment-list">
                {complaint.Attachment.map((file, index) => (
                    <div key={index} className="attachment-item">
                        <div className="list-icons">
                            <span className="file-icon">{getFileIcon(file.type)}</span>
                            <a
                                href={rev ? file.url : '#'}  // If rev is true, set href to file.url, otherwise '#' (dummy link)
                                target="_blank"  // Always open the link in a new tab
                                onClick={(e) => {
                                    if (!rev) {
                                        e.preventDefault(); // Prevent the default action only when rev is false

                                        const base64Data = file.content.split(',')[1]; // Extract only the base64 data
                                        const byteCharacters = atob(base64Data); // Decode base64

                                        // Convert to Uint8Array
                                        const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
                                        const byteArray = new Uint8Array(byteNumbers);

                                        // Create Blob and open in new tab
                                        const blob = new Blob([byteArray], { type: file.type });
                                        const url = URL.createObjectURL(blob);
                                        window.open(url, '_blank');  // Open the base64 content in a new tab
                                    }
                                }}
                            >
                                {file.name || file.fileName}
                            </a>


                        </div>
                        <MdDelete style={{ display: !ecom ? 'none' : 'block' }}
                            onClick={() => handleDelete(file.name)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Attachment;
