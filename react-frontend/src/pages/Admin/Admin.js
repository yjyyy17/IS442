import React, { useState, useEffect } from "react";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import { useLocation } from 'react-router-dom';
import ViewUserAccounts from "./ViewUserAccounts";

const Admin = () => {
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
        currentPath === '/admin/user_accounts'? <ViewUserAccounts/>: <></>
      }
      />
    </>
  );
};

export default Admin;
