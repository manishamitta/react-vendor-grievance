import React, { useContext, useState, useRef, useEffect } from 'react';
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import PoDetails from './PoDetails';
import Preview from './Preview';
import Complaint from './Complaint';
import { FaUser, FaExclamationCircle, FaEye } from 'react-icons/fa';
import SelectedPoContext from '../context/Selectedpo/SelectedPoContext';
import ComplaintContext from '../context/Complaint/ComplaintContext';
import Alerts from './Alert';
import Loading from './Loading';

function FirstPage() {

    const nextRef = useRef(null)
    const [currentStep, setCurrentStep] = useState(0);
    const pocontext = useContext(SelectedPoContext);
    const { selectedRow, setSelectedRow } = pocontext;
    const [alert, setAlert] = useState(null);
    const compContext = useContext(ComplaintContext);
    const { complaint, handleCompSumbit , getCompalins ,setComplaint } = compContext;
    const [wpo, setWpo] = useState(false);
    const [loading, setLoading] = useState(false);
    const showAlert = (type, message) => {
        setAlert({
            type: type,
            message: message
        });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    const handleComplete = async () => {
        try {
            setLoading(true); // Start the loading spinner

            // Call handleCompSumbit, it returns the complaint number
            const complainno = await handleCompSumbit(complaint);

            // Once submission is done, show the success alert
            showAlert("success", `Your complaint is submitted with complaint no: ${complainno}`);

            // Scroll to the top of the page
            window.scroll(0, 0);

            setTimeout(() => {
                window.location.reload(); // Reload the page
            }, 2000);

        } catch (error) {
            console.error("Error during submission:", error);
            showAlert("error", "Something went wrong, please try again.");
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };



    const checkValidateTab = () => {

        if (selectedRow != null || wpo === true) {
            return true;
        }
        else {
            return false;
        }// If selectedRow exists, it's valid
    };

    const checkValidateTab2 = () => {
        return complaint.Description !== '' && complaint.CompType !== ''; // Check Complaint fields
    };

    const errorMessages = () => {
        // you can add alert or console.log or any thing you want
        // alert("Please Select The Row");
        showAlert("error", "Please select a row");
    };
    const errorMessages2 = () => {
        // you can add alert or console.log or any thing you want
        // alert("Please Select The Row");
        showAlert("error", "Please fill the required details");
    };

    const tabChanged = ({ prevIndex, nextIndex }) => {
        // console.log("prevIndex", prevIndex);
        // console.log("nextIndex", nextIndex);
        setCurrentStep(nextIndex);
        // window.scrollTo(0, 0);
    };
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when `currentStep` changes
    }, [currentStep]);
    // Manually call the "Next" function stored in `nextRef` when button is clicked
    const goToSecondStep = async () => {
        debugger
        setWpo(true);
        setSelectedRow({
            amount: "",
            pannum: "abc@example.com",
            pono: "",
            type: "",
            vendor: "AN123456789-T"
        });
        setComplaint(prev => ({
            ...prev , pono : null
        }));
       await getCompalins("null");
        if (nextRef.current) nextRef.current(); // Call the `handleNext` function if set
    };

    useEffect(() => {
        // Clear `nextRef` after the component mounts to avoid stale closures
        nextRef.current = null;
    }, []);
    return (
        <>
            <Alerts alert={alert} />
            <div className="form-wizard-container">
                <FormWizard
                    stepSize="xs"
                    onComplete={handleComplete}
                    onTabChange={tabChanged}
                    initialIndex={currentStep}
                    color="#094899"
                    backButtonTemplate={(handlePrevious) => (
                        <button className="back-button" onClick={handlePrevious}>
                            Back
                        </button>
                    )}
                    nextButtonTemplate={(handleNext) => {
                        nextRef.current = handleNext;
                        return (
                            <button className="next-button" onClick={handleNext}>
                                Next
                            </button>
                        )
                    }}
                    finishButtonTemplate={(handleComplete) => (
                        <button className="finish-button" onClick={handleComplete}>
                            Submit
                        </button>
                    )}
                >
                    <FormWizard.TabContent
                        title="PO Details"
                        icon={<FaUser />}
                        showErrorOnTab={!checkValidateTab()} // Show error if PO Details are not valid
                        showErrorOnTabColor="red"

                    >
                        <div className="wpo">
                            <button className='wpobtn' onClick={goToSecondStep}>Create</button>
                        </div>
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
                        isValid={checkValidateTab2()}
                        validationError={errorMessages2}
                    // Enable this tab only if Complaint details are valid
                    >
                        {loading ? <Loading minh="80vh" /> : <Preview />}
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
                      .next-button {
          background-color: blue;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
          margin-left: 10px;
          border-radius: 50px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
          float: right;
          }
          
          .next-button:hover {
          background-color: navy;
          }
          
          .next-button:focus {
          outline: none;
          }
          
          .next-button:active {
          transform: translateY(2px);
          }
        .back-button {
          background-color: blue;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
          margin-left: 10px;
          border-radius: 50px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
          float: left;
          }
          
          .back-button:hover {
          background-color: navy;
          }
          
          .back-button:focus {
          outline: none;
          }
          
          .back-button:active {
          transform: translateY(2px);
          }

        .finish-button{
          background-color: green;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
          margin-left: 10px;
          border-radius: 50px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
          float: right;
        }
        .finish-button:hover {
          background-color: darkgreen;
          }
        
        .finish-button:focus {
          outline: none;
         }
          
        .finish-button:active {
          transform: translateY(2px);
         }
            `}
                </style>
            </div>
        </>
    )
}

export default FirstPage;
