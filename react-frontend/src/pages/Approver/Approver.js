import React, { useState, useEffect } from "react";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationApprover";
import { useLocation } from 'react-router-dom';
import ViewUserAccounts from "./ViewUserAccounts";
import ViewWorkflows from "./ViewWorkflows";
import ApproveForms from "./ViewForms";
import ViewAdminForms from "./ViewAdminForms";


// import NewUserAccountForm from "./NewUserAccountForm";

const Approver = () => {
  const [currentPath, setCurrentPath] = useState('')

  // Check current url path to render correct page
  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  
  return (
    <>
      <SideNavigation 
      // ***** change content prop to dynamic when more pages are up *****
      content={
        currentPath === '/approver/user_accounts'? <ViewUserAccounts/>
        :currentPath === '/approver/ViewWorkflows'? <ViewWorkflows/>
        :currentPath === '/approver/ViewAdminForms'? <ViewAdminForms/>
        :currentPath === '/approver/ViewForms'? <ApproveForms/>:<ApproveForms/>
        
      }
      />
    </>
  );
};

export default Approver;
