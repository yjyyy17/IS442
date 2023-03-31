import React, { useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import UserAccountTabs from "../../components/UserAccountComponents/UserAccountTabs";
import { useLocation } from "react-router-dom";

const ViewUserAccounts = () => {
  const { state } = useLocation();
  const [prevViewedTab, setPrevViewedTab] = React.useState(() => {
    if (state != undefined) {
      console.log(state.userType);
      return state.userType;
    }
    return 0;
  });
  useEffect(() => {});
  return (
    <>
      <Typography variant="h5" sx={{ pb: 4 }}>
        All Accounts
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <UserAccountTabs prevViewedTab={prevViewedTab} />
    </>
  );
};

export default ViewUserAccounts;
