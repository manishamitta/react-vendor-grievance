import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import your Loading component
import { FaUser } from 'react-icons/fa';

function Comments({ commentsData }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Local loading state

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 1 second
        }, 1000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    // If loading is true, show the Loading component
    if (loading) {
        return (
            <div className="comments-container">
                <Loading /> {/* Show the loading component */}
            </div>
        );
    }

    if (!commentsData || commentsData.length === 0) {
        return (
            <div className="comments-container">
                <h2>Comments</h2>
                <h4>No available comments</h4>
            </div>
        );
    }

    // Sort comments in descending order based on the createdAt date
    const sortedComments = [...commentsData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // The latest comment is the first one after sorting
    const latestComment = sortedComments[0];
    // The rest of the comments
    const otherComments = sortedComments.slice(1);

    // Toggle modal visibility
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div className="comments-container">
                {/* Show the latest comment */}
                <div className="cmtheadingbtn">
                    <h2>Comments</h2>
                    <div className="cmt-btn">
                        <button onClick={openModal}>Comments</button>
                    </div>
                </div>
                <div className="latest-comment">
                    <p><strong>Comment:</strong> {latestComment.comments}</p>
                    <p><strong>Created At:</strong> {new Date(latestComment.createdAt).toLocaleString()}</p>
                    <p><strong>Created By:</strong> {latestComment.createdBy}</p>
                </div>
            </div>

            {/* Modal for other comments */}
            {isModalOpen && (
                <div className="modal-overlay1">
                    <div className="modal-content1">
                        <div className="cmtheadingbtn">
                            <h2>All Comments</h2>
                            <button className="close-button1" onClick={closeModal}>Close</button>
                        </div>

                        {/* Check if there's only one comment */}
                        {otherComments.length === 1 ? (
                            <p>No more comments available</p>
                        ) : (
                            // Display other comments if more than one exists
                            otherComments.map((comment, index) => (
                                <div key={index} className="comment-item1">

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faUser} size='2x' style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }}/> {/* Person icon */}
                                        
                                        <div>
                                        <strong>{comment.createdBy}</strong><br />
                                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                                    </div>
                                    </div>
                                    <p><strong>Comment:</strong> {comment.comments}</p>

                                    <hr />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}


            {/* Modal styles */}
            <style>{`
                .modal-overlay1 {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: white;
                    display: flex;
                    border-radius: 20px;
                    margin:20px 10px;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999; /* Highest z-index to ensure it's on top */
                }

                .modal-content1 {
                    background-color: white;
                    padding: 20px;
                    border-radius: 20px;
                    width: 99%;
                    height: 99%;
                    overflow-y: auto;
                    z-index: 10000; /* Ensures modal content is higher than the overlay */
                }

                .close-button1 {
                    background-color: #007BFF;
                    color: white;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }

                .comment-item1 {
                    text-align: start;
                    padding: 10px 0;
                }

                .latest-comment {
                    margin-bottom: 20px;
                }
            `}</style>
        </>
    );
}

export default Comments;
