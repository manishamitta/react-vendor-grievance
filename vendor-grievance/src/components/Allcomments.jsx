import React from 'react';
import { IoMdClose } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Allcomments({ onClose, commentsData }) {
    return (
        <div className="allcomments">
            <div className="closeBtndiv">
                <h2>All Comments</h2>
                <IoMdClose onClick={onClose} className="closeBtn" style={{width : "30px" , height : "30px" , cursor :"pointer"}}/>
            </div>
            {commentsData.map((comment, index) => (
                <div key={index} className="comment-item1">
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
                            <strong>{comment.createdBy}</strong><br />
                            <small style={{ color: "#514f4f" }}>
                                {new Date(comment.createdAt).toLocaleString()}
                            </small>
                        </div>
                    </div>
                    <p style={{textAlign : 'justify'}}><strong>Comment:</strong> {comment.comments}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Allcomments;
