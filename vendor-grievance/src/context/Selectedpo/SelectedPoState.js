import React, {useState} from "react";

import SelectedPoContext from "./SelectedPoContext";
const url = "https://af3dba34trial-dev-vendorapp-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my";
const SelectedPoState = (props) =>{

    const[selectedRow, setSelectedRow] = useState(null);
    const[poData, setPoData] = useState(null);
    const getPoData = async() =>
        {
            const response = await fetch(`${url}/poheader`,{
                method :"GET",
            })
            const json = await response.json();
            setPoData(json.value);
        }
    return(
        <SelectedPoContext.Provider value={{selectedRow, setSelectedRow , getPoData,poData}}>
            {props.children}
        </SelectedPoContext.Provider>
    )

}

export default SelectedPoState;