import React, { useContext, useState } from 'react';
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import PoDetails from './PoDetails';
import Preview from './Preview';
import Complaint from './Complaint';
import { FaUser, FaExclamationCircle, FaEye } from 'react-icons/fa';
import SelectedPoContext from '../context/Selectedpo/SelectedPoContext';
import ComplaintContext from '../context/Complaint/ComplaintContext';

function FirstPage() {

 
    const [currentStep, setCurrentStep] = useState(0);
    const pocontext = useContext(SelectedPoContext);
    const { selectedRow , poData} = pocontext;

    const compContext = useContext(ComplaintContext);
    const { complaint } = compContext;

    const handleComplete = () => {
        alert("Form completed!"); // Show alert message
        window.location.reload(); // Reload the page
    };

    const checkValidateTab = () => {
        return selectedRow !== null; // If selectedRow exists, it's valid
    };

    const checkValidateTab2 = () => {
        return complaint.Description !== '' && complaint.CompType !== ''; // Check Complaint fields
    };

    const errorMessages = () => {
        // you can add alert or console.log or any thing you want
        alert("Please Select The Row");
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
            >
                <FormWizard.TabContent
                    title="PO Details"
                    icon={<FaUser />}
                    showErrorOnTab={!checkValidateTab()} // Show error if PO Details are not valid
                    showErrorOnTabColor="red"
                    
                >
                    <PoDetails />
                </FormWizard.TabContent>

                <FormWizard.TabContent
                    title="Complaint"
                    icon={<FaExclamationCircle />}
                    showErrorOnTab={!checkValidateTab2()} // Show error if Complaint details are not valid
                    showErrorOnTabColor="red"
                    isValid={checkValidateTab()}
                    validationError={errorMessages} // Enable this tab only if PO details are valid
                >
                    <Complaint />
                </FormWizard.TabContent>

                <FormWizard.TabContent
                    title="Preview"
                    icon={<FaEye />}
                    showErrorOnTab={false} // No need for error on the last step
                    isValid={checkValidateTab2()} // Enable this tab only if Complaint details are valid
                >
                    <Preview />
                </FormWizard.TabContent>
            </FormWizard>

            <style>{`
                @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                
                .form-control {
                    height: 36px;
                    padding: 0.375rem 0.75rem;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #495057;
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                }

                /* Custom styles to show error color on tabs */
                .form-wizard .tab.error {
                    color: red !important; /* Force red color */
                }

                .form-wizard .tab.active.error {
                    border-color: red !important; /* Add red border for active error tabs */
                }

                .form-wizard .tab:hover.error {
                    color: red !important;
                }
            `}</style>
        </div>
    );
}

export default FirstPage;
