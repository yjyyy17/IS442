import React, { useState, useEffect } from "react";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import { useLocation } from "react-router-dom";
import ViewUserAccounts from "./ViewUserAccounts";
import NewUserAccountForm from "./NewUserAccountForm";
import ViewForms from "./ViewForms";
import CreateNewForm from "./CreateNewForm";
import ViewWorkflows from "./ViewWorkflows";
import ViewUserGroups from "./ViewUserGroups";

const Admin = () => {
  const [currentPath, setCurrentPath] = useState("");

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
          currentPath === "/admin/user_accounts" ? (
            <ViewUserAccounts />
          ) : currentPath === "/admin/forms" ? (
            <ViewForms />
          ) : currentPath === "/admin/workflows" ? (
            <ViewWorkflows />
          ) : currentPath === "/admin/user_groups" ? (
            <ViewUserGroups />
          ) : (
            <></>
          )
        }
      />
    </>
  );
};

export default Admin;
