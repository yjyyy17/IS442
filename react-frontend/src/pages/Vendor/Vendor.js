import React, { useState, useEffect } from "react";
import SideNavigation from "../../components/SideNavigationVendor";
import ViewWorkflows from './Workflows/ViewWorkflows';
import IndividualWorkflow from './Workflows/IndividualWorkflow';
import ViewCompletedForms from './Workflows/ViewCompletedForms';
import { useLocation } from 'react-router-dom';

const Vendor = () => {
  const [currentPath, setCurrentPath] = useState('')
  const [indivWorkflow, setIndivWorkflow] = useState()

  // Check current url path to render correct page
  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  // Pass workflow ID to Individual Workflow page
  const handleViewIndiv = (wf) => {
    setIndivWorkflow(wf)
  }
  
  return (
    <>
      <SideNavigation 
      // ***** change content prop to dynamic when more pages are up *****
      content={
        currentPath === '/vendor/indiv_workflow' ?
        <IndividualWorkflow workflowData={indivWorkflow}/>  :

        // currentPath === '/vendor/indiv_workflow/review' ?
        // <ReviewWorkflow /> :

        // page === '/vendor/indiv_workflow/thank_you' ?
        // <ThankYou /> :

        currentPath === '/vendor/forms' ?
        <ViewCompletedForms /> :

        // page === '/vendor/forms/indiv_form' ?
        // <IndividualForm /> :

        <ViewWorkflows viewIndivWorkflow={handleViewIndiv} /> 
      
        }
      />
    </>
  );
};

export default Vendor;
