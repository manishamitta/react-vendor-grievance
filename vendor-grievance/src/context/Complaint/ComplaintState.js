import React, { useState } from "react";

import ComplaintContext from "./ComplaintContext";

const ComplaintState = (props) => {
    const comp1 = {
        vendor: '',
        pono: '',
        CompType: '',
        Description: '',
        Attachment: []
    };
    const [complaint, setComplaint] = useState(comp1);
    const [revComp, setrevComp] = useState(comp1);
    return (
        <ComplaintContext.Provider value={{ complaint, setComplaint, revComp, setrevComp }} >
            {props.children};
        </ComplaintContext.Provider>
    )

}
export default ComplaintState;