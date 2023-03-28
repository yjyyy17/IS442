import React from "react";
import { Divider, Typography } from "@mui/material";
import FormTemplateGenerator from "./FormTemplateGenerator";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";

function CreateNewForm() {
  return (
    <>
      <SideNavigation
        content={
          <>
            <Typography variant="h5" sx={{ pb: 4 }}>
              Create new form
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <FormTemplateGenerator />
          </>
        }
      />
    </>
  );
}

export default CreateNewForm;
