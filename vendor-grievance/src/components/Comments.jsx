import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import your Loading component
import { FaUser } from 'react-icons/fa';

function Comments({ commentsData, openCModal }) {

    const [loading, setLoading] = useState(true); // Local loading state

    useEffect(() => {
        // Check if commentsData is null or undefined
        if (commentsData === null || commentsData === undefined) {
            setLoading(true); // Show loading if data is not yet fetched
        } else {
            setLoading(false); // Stop loading if commentsData is available
        }
    }, [commentsData]);

    // If loading is true, show the Loading component
    if (loading) {
        return (
            <div className="comments-container">
                <Loading minh="30vh" /> {/* Show the loading component */}
            </div>
        );
    }

    if (commentsData === undefined||commentsData.length === 0) {
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
    return (
        <>
            <div className="comments-container">
                {/* Show the latest comment */}
                <div className="cmtheadingbtn">
                    <h2>Comments</h2>
                    <div className="cmt-btn">
                        <button onClick={openCModal}>Comments</button>
                    </div>
                </div>
                <div className="comment-item1">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon
                            icon={faUser}
                            size="2x"
                            style={{
                                width: '40px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                color: "#234ab5"
                            }}
                        />
                        <div>
                            <strong>{latestComment.createdBy}</strong><br />
                            <small style={{ color: "#514f4f" }}>
                                {new Date(latestComment.createdAt).toLocaleString()}
                            </small>
                        </div>
                    </div>
                    <p style={{ textAlign: 'justify' }}><strong>Comment:</strong> {latestComment.comments}</p>
                </div>
            </div>
        </>
    );
}

export default Comments;
