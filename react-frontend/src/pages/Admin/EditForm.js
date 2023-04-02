import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const [revisionNumber, setRevisionNumber] = useState(1);
  const [templateStatus, setTemplateStatus] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [fields, setFields] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");

  const location = useLocation();
  const formData = location.state.form;
  console.log("Form details passed from ViewForms.js", formData);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/${id}`)
      .then((res) => {
        console.log("Form questions", res.data);

        // set form template details first
        setFormTitle(formData.title);
        setFormDescription(formData.description);
        setFormNumber(formData.formNumber);
        setTemplateStatus(formData.status);
        setRevisionNumber(formData.revisionNumber);

        // if the form has existing qns, loop thru, else set questions as []
        if(res.data != []){
          var activeQns = [];
          res.data.forEach((field, index) => {
            if (field.status == "Active") {
              activeQns.push(field);
            }
          });
          setFields([...activeQns]);
        }
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
                initialRevisionNumber={revisionNumber}
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
