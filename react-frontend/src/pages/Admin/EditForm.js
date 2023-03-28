import React, { useEffect, useState } from "react";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import {
  Button,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import axios from "axios";
import FormTemplateGenerator from "./FormTemplateGenerator";
import LoadingSpinner from "../../components/LoadingSpinner";

const EditForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [templateStatus, setTemplateStatus] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [fields, setFields] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/${id}`)
      .then((res) => {
        console.log("Form questions");
        console.log(res.data);
        console.log("Form details");
        console.log(res.data[0].formID);

        // console.log(res.data);
        setFormTitle(res.data[0].formID.title);
        setFormDescription(res.data[0].formID.description);
        setFormNumber(res.data[0].formID.formNumber);
        setTemplateStatus(res.data[0].formID.status);
        var activeQns = [];
        res.data.forEach((field, index) => {
          if (field.status == "Active") {
            activeQns.push(field);
          }
        });
        setFields([...activeQns]);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loaded) {
    return (
      <>
        <SideNavigation
          content={
            <>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                  <Typography variant="h5">Edit {formTitle} </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={templateStatus}
                    color={templateStatus == "Active" ? "success" 
                    : templateStatus == "Inactive" ? "error" : "primary"}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mb: 4, mt: 2 }} />
              <FormTemplateGenerator
                initialFormTitle={formTitle}
                initialFormDescription={formDescription}
                initialFormNumber={formNumber}
                initialFormFields={fields}
              />
            </>
          }
        />
      </>
    );
  } else {
    return (
      <>
        <SideNavigation
          content={
            <>
              <Typography variant="h5" sx={{ pb: 4 }}>
                Edit Form
              </Typography>
              <Divider sx={{ mb: 4 }} />
              <LoadingSpinner />
            </>
          }
        />
      </>
    );
  }
};

export default EditForm;
