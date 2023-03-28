import { Divider, Typography } from "@mui/material";
import UserAccountTabs from "../../components/UserAccountComponents/UserAccountTabs";

const ViewUserAccounts = () => {

  return (
    <>
      <Typography variant="h5" sx={{ pb: 4 }}>
        All Accounts
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <UserAccountTabs/>
    </>
  );
};

export default ViewUserAccounts;
