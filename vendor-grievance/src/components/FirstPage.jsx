import React, { useContext, useState } from 'react';
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import PoDetails from './PoDetails';
import Preview from './Preview';
import Complaint from './Complaint';
import { FaUser, FaExclamationCircle, FaEye  } from 'react-icons/fa';
import SelectedPoContext from '../context/Selectedpo/SelectedPoContext';


function FirstPage() {
   
    const [currentStep, setCurrentStep] = useState(0);
    const pocontext = useContext(SelectedPoContext);
    const {selectedRow} = pocontext;
   

    const handleComplete = () => {
        
        alert("Form completed!"); // Show alert message
        window.location.reload(); // Reload the page
    };
    const checkValidateTab = () => {
        
      };
    const tabChanged = ({ prevIndex, nextIndex }) => {
        console.log("prevIndex", prevIndex);
        console.log("nextIndex", nextIndex);
        setCurrentStep(nextIndex);
    };

    return (
            <div className="form-wizard-container">
                <FormWizard
                    stepSize="sm"
                    onComplete={handleComplete}
                    onTabChange={tabChanged}
                    initialIndex={currentStep}
                    color="#094899" 
                    showErrorOnTab={!checkValidateTab()}
                    showErrorOnTabColor="red"
                >
                    <FormWizard.TabContent title="PO Details" icon={<FaUser />}>
                        
                        <PoDetails/>
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Complaint" icon={<FaExclamationCircle />}>
                        {/* <h3>Second Tab</h3>
                        <p>Some content for the second tab</p> */}
                        <Complaint/>
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Preview" icon={<FaEye />}>
                        {/* <h3>Last Tab</h3>
                        <p>Some content for the last tab</p> */}
                        <Preview/>
                    </FormWizard.TabContent>
                </FormWizard>
            </div >
          
            )
}

            export default FirstPage
