import React from "react";
import { Divider, Typography } from "@mui/material";
import FormTemplateGenerator from './FormTemplateGenerator';

function CreateNewForm() {
  return (
    <>
      <Typography variant="h5" sx={{ pb: 4 }}>
        Create new form
      </Typography>
      <FormTemplateGenerator />
    </>
  );
}

export default CreateNewForm;
