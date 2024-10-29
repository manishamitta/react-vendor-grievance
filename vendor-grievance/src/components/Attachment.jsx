import React, { useState, useRef, useContext } from 'react';
import { MdDelete } from "react-icons/md";

// Import your images for each file type
import wordIcon from './images/word.png'; // Replace with the correct path
import pdfIcon from './images/pdf.png'; // Replace with the correct path
import imageIcon from './images/image.png'; // Replace with the correct path
import textIcon from './images/text.png'; // Replace with the correct path
import zipIcon from './images/zip.png'; // Replace with the correct path
import attach from './images/attachment.png';
// import ComplaintContext from '../context/Complaint/ComplaintContext';
function Attachment(props) {
    // const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);
    // const compContext = useContext(ComplaintContext);
    const { complaint, setComplaint, ecom } = props;
    // Handle file selection
    // Helper to read file content as Base64
    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);  // Resolve the file content as base64
            reader.onerror = reject;
            reader.readAsDataURL(file);  // Read file as base64 URL
        });
    };

    // Handle file selection
    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Process each file and read its content
        const filesWithContent = await Promise.all(
            selectedFiles.map(async (file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                content: await readFileContent(file)  // Get file content in base64
            }))
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
        const extension = fileName.split('.').pop().toLowerCase();
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
                            <span className="file-icon">{getFileIcon(file.name)}</span>
                            {/* Wrap the file name in an anchor tag */}
                            {/* <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                                {file.name}
                            </a> */}
                            <a
                                href={
                                    file instanceof File
                                        ? URL.createObjectURL(file)
                                        : URL.createObjectURL(new Blob([], { type: file.type }))
                                }
                                target="_blank"
                                rel="noopener noreferrer"
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
