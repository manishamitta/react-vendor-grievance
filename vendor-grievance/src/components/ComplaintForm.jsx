import React, { useContext } from 'react';
import SelectedPoContext from '../context/Selectedpo/SelectedPoContext';

function ComplaintForm(props) {
    const { complaint, setComplaint, ecom ,heading} = props;
    const { pono, vendor, CompType, Description } = complaint;

    const onChange = (e) => {
        setComplaint({
            ...complaint,  // Spread the current state to retain other fields
            [e.target.name]: e.target.value  // Dynamically update the field based on the input name
        });
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'start' , margin : "0px 5px 5px 0px"}}>{heading}</h2>
            <form className="complain-form">
                <div className="disabled-input">
                    <div className="input">
                        <label htmlFor="vend_id">Vendor Code:</label>
                        <input type="text" id='vend_id' name='vendor' value={vendor || ''} disabled />
                    </div>
                    <div className="input">
                        <label htmlFor="poNumber">Po Number:</label>
                        <input type="text" id='poNumber' name='pono' value={pono || ''} disabled />
                    </div>
                </div>
                <div className="input">
                    <label htmlFor="comptype">Complaint Type:</label>
                    <select
                        id="comptype"
                        name="CompType"
                        value={CompType}
                        onChange={onChange}
                        required
                        disabled={!ecom}
                    >
                        <option value="" disabled>-- Select Complaint Type --</option>
                        <option value="Delay in Payment">Delay in Payment</option>
                        <option value="Wrong Payment">Wrong Payment</option>
                        <option value="GST issue">GST Issue</option>
                        <option value="TDS issue">TDS Issue</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="input">
                    <label htmlFor="description">Complaint Description:</label>
                    <textarea
                        id="description"
                        name="Description"
                        rows="4"
                        cols="50"
                        value={Description}
                        onChange={onChange}
                        disabled={!ecom}
                        required
                    />
                </div>
            </form>
        </div>
    );
}

export default ComplaintForm;
