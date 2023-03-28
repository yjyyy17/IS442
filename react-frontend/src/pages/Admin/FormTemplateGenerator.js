import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Divider,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { Add, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Field = ({
  field,
  handleSelectField,
  handleUpdateField,
  handleRemoveField,
  moveFieldUp,
  moveFieldDown,
  isSelected,
}) => {
  return (
    <Box
      sx={{
        p: 1,
        mb: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 1,
        border: isSelected ? "1px solid #3f51b5" : "1px solid transparent",
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor: "rgba(63, 81, 181, 0.1)",
        },
      }}
      onClick={() => handleSelectField(field.id)}
    >
      {/* Render the field content here */}
      {field.type === "text" && <TextField label={field.label} fullWidth />}
      {field.type === "radio" && (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">{field.label}</FormLabel>
          <RadioGroup>
            {field.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {field.type === "checkbox" && (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">{field.label}</FormLabel>
          <FormGroup>
            {field.options.map((option) => (
              <FormControlLabel
                key={option}
                control={<Checkbox />}
                label={option}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
      {field.type === "heading1" && (
        <FormControl component="fieldset" fullWidth>
          <FormGroup>
            <Typography key={field.id} variant="h4" sx={{ mb: 1 }}>
              {field.label}
            </Typography>
          </FormGroup>
        </FormControl>
      )}
      {field.type === "heading2" && (
        <FormControl component="fieldset" fullWidth>
          <FormGroup>
            <Typography key={field.id} variant="h5" sx={{ mb: 1 }}>
              {field.label}
            </Typography>
          </FormGroup>
        </FormControl>
      )}
      <Box>
        <IconButton
          edge="end"
          color="primary"
          onClick={() => moveFieldUp(field.id)}
        >
          <ArrowUpward />
        </IconButton>
        <IconButton
          edge="end"
          color="primary"
          onClick={() => moveFieldDown(field.id)}
        >
          <ArrowDownward />
        </IconButton>
      </Box>
    </Box>
  );
};

const FormTemplateGenerator = ({
  initialFormTitle,
  initialFormDescription,
  initialFormNumber,
  initialFormFields,
}) => {
  // console.log("initialFormTitle", initialFormTitle);
  // console.log("initialFormDescription", initialFormDescription);
  // console.log("initialFormNumber", initialFormNumber);
  // console.log("initialFormFields", initialFormFields);
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [formTitle, setFormTitle] = useState(
    initialFormTitle ? initialFormTitle : ""
  );
  const [formDescription, setFormDescription] = useState(
    initialFormDescription ? initialFormDescription : ""
  );
  const [formNumber, setFormNumber] = useState(
    initialFormNumber ? initialFormNumber : ""
  );
  // const [formFields, setFormFields] = useState(
  //   initialFormFields ? initialFormFields : []
  // );
  const [formFields, setFormFields] = useState(() => {
    if (initialFormFields == undefined) {
      // alert("Setting intitialFormFields as []")
      return [];
    } else {
      // alert("Adding qns to intitialFormFields")
      var existingFormFields = [];
      initialFormFields.forEach((field, index) => {
        // var field = {
        //   id: "",
        //   label: "",
        //   type: "",
        //   options: [],
        //   order: "",
        // };
        if (field.status == "Active") {
          // console.log("field options", field.options.split(", "));
          var field = {
            id: field.questionID,
            label: field.label,
            type: field.type,
            options: field.options != "" ? field.options.split(", ") : [],
            order: field.order,
          };
          existingFormFields.push(field);
          // setFormFields([...formFields, field]);
        }
      });
      // console.log("existingFormFields", existingFormFields.sort((a, b) => a.order - b.order));
      return existingFormFields.sort((a, b) => a.order - b.order);
    }
  }, [initialFormFields]);
  const [selectedField, setSelectedField] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, type: "success" });
  const [deleteSnackbar, setDeleteSnackbar] = useState({
    open: false,
    type: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleCloseDeleteSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClearFields = () => {
    setFormFields([]);
    setSelectedField(null);
  };

  const handleAddField = () => {
    const newField = {
      id: uuidv4(),
      label: "",
      type: "text",
      options: [],
    };
    setFormFields([...formFields, newField]);
    setSelectedField(newField);
  };

  const handleUpdateField = (id, property, value) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, [property]: value } : field
      )
    );
    if (selectedField && selectedField.id === id) {
      setSelectedField({ ...selectedField, [property]: value });
    }
  };

  const handleRemoveField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
    if (selectedField && selectedField.id === id) {
      setSelectedField(null);
    }
  };

  const handleSelectField = (id) => {
    setSelectedField(formFields.find((field) => field.id === id));
  };

  const moveFieldUp = (id) => {
    const index = formFields.findIndex((field) => field.id === id);
    if (index > 0) {
      const newFields = [...formFields];
      const temp = newFields[index - 1];
      newFields[index - 1] = newFields[index];
      newFields[index] = temp;
      setFormFields(newFields);
    }
  };

  const moveFieldDown = (id) => {
    const index = formFields.findIndex((field) => field.id === id);
    if (index < formFields.length - 1) {
      const newFields = [...formFields];
      const temp = newFields[index + 1];
      newFields[index + 1] = newFields[index];
      newFields[index] = temp;
      setFormFields(newFields);
    }
  };

  const handleDeleteForm = () => {
    console.log("Form deleted");
    // Add your logic to delete the form
    axios
      .put(`http://localhost:8080/api/formtemplate/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        // alert("Form successfully deleted");
        setDeleteSnackbar({ open: true, type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setDeleteSnackbar({ open: true, type: "error" });
      });
  };

  const handleSaveForm = () => {
    const form = {
      title: formTitle,
      description: formDescription,
      number: formNumber,
      fields: formFields,
    };
    console.log(form);
    var savedFormId = null;
    // check if creating new form or updating existing form
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id") ? queryParameters.get("id") : "";
    if (id == "") {
      // call save form template api to create new template
      axios
        .post("http://localhost:8080/api/formtemplate/add", {
          title: formTitle != "" ? formTitle : null,
          description: formDescription != "" ? formDescription : null,
          formNumber: formNumber,
          status: "Waiting for Approval",
          effectiveDate: "2023-03-04",
          revisionNumber: 1,
        })
        .then((res) => {
          console.log(res.data);
          savedFormId = res.data.formId;
          // Loop through each field
          formFields.forEach((field, index) => {
            // call save question api
            axios
              .post("http://localhost:8080/api/questions/add", {
                label: field.label != "" ? field.label : null,
                options: field.options != [] ? field.options.join(", ") : "",
                type: field.type,
                order: index + 1,
                status: "Active",
                formID: {
                  formId: savedFormId,
                },
              })
              .then((res) => {
                console.log(res.data);
                // alert("Form successfully created with id:", res.data.formId);
                setSnackbar({ open: true, type: "success" });
                // call save question api
              })
              .catch((err) => {
                console.log(err);
                // alert(err);
                setSnackbar({ open: true, type: "error" });
              });
          });
        })
        .catch((err) => {
          console.log(err);
          // alert(err);
          setSnackbar({ open: true, type: "error" });
        });
    } else {
      // formFields.forEach((field, index) => {
      //   console.log(index, ": onefield:", field);
      // });
      // call update form template api to update existing template
      axios
        .put(`http://localhost:8080/api/formtemplate/${id}`, {
          title: formTitle != "" ? formTitle : null,
          description: formDescription != "" ? formDescription : null,
          formNumber: formNumber,
          status: "Waiting for Approval",
          effectiveDate: Date.now(),
          revisionNumber: 1,
        })
        .then((res) => {
          // console.log(res.data);
          savedFormId = res.data.formId;
          // soft delete all previous fields of the question
          axios
            .get(`http://localhost:8080/api/questions/${id}`)
            .then((res) => {
              // console.log(res.data);
              res.data.forEach((field, index) => {
                if (field.status == "Active") {
                  // console.log(`soft deleting qn with id ${field.questionID}`);
                  axios.put(
                    `http://localhost:8080/api/questions/delete/${field.questionID}/Inactive`
                  );
                }
              });
            })
            .catch((err) => {
              console.log(err);
              setSnackbar({ open: true, type: "error" });
            });

          // Loop through each field
          formFields.forEach((field, index) => {
            // console.log(index, ": onefield:", field);
            axios
              .post("http://localhost:8080/api/questions/add", {
                label: field.label != "" ? field.label : null,
                options: field.options != [] ? field.options.join(", ") : "",
                type: field.type,
                order: index + 1,
                status: "Active",
                formID: {
                  formId: savedFormId,
                },
              })
              .then((res) => {
                console.log(res.data);
                // alert("1 question saved", res.data.formId);
                // call save question api
              })
              .catch((err) => {
                console.log(err);
                // alert(err);
                setSnackbar({ open: true, type: "error" });
              });
            // setSnackbar({ open: true, type: "success" });
          });
          setSnackbar({ open: true, type: "success" });
        })
        .catch((err) => {
          console.log(err);
          // alert(err);
          setSnackbar({ open: true, type: "error" });
        });
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Form Details section */}
        <Grid item xs={12}>
          <Typography variant="h6">Form Details</Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Form Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Form Number"
              value={formNumber}
              onChange={(e) => setFormNumber(e.target.value)}
              fullWidth
            />
          </Box>
        </Grid>
        <Divider sx={{ mb: 4 }} />
        {/* Field Preparation section */}
        <Grid item xs={6}>
          <Box
            sx={{
              position: "sticky",
              top: "5em",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add a field
            </Typography>
            {selectedField && (
              <Box sx={{ mb: 2, mt: 2 }}>
                <TextField
                  label="Question Label"
                  value={selectedField.label}
                  onChange={(e) =>
                    handleUpdateField(selectedField.id, "label", e.target.value)
                  }
                  fullWidth
                />
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <Select
                    value={selectedField.type}
                    onChange={(e) =>
                      handleUpdateField(
                        selectedField.id,
                        "type",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="radio">Radio</MenuItem>
                    <MenuItem value="checkbox">Checkbox</MenuItem>
                    <MenuItem value="heading1">Heading 1</MenuItem>
                    <MenuItem value="heading2">Heading 2</MenuItem>
                  </Select>
                </FormControl>
                {(selectedField.type === "radio" ||
                  selectedField.type === "checkbox") && (
                  <TextField
                    label="Options (comma separated)"
                    value={selectedField.options.join(", ")}
                    onChange={(e) =>
                      handleUpdateField(
                        selectedField.id,
                        "options",
                        e.target.value
                          .split(", ")
                          .map((option) => option.trim())
                      )
                    }
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                )}
                <IconButton
                  sx={{ mt: 2 }}
                  edge="end"
                  color="error"
                  onClick={() => handleRemoveField(selectedField.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddField}
              >
                Add Field
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleClearFields}
                sx={{ ml: 2 }}
              >
                Clear All Fields
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Form Preview</Typography>
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                p: 1,
                mb: 1,
                justifyContent: "space-between",
                backgroundColor: "background.paper",
              }}
            >
              <Typography sx={{ mb: 2 }} variant="h3">
                {formTitle}
              </Typography>
              <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
                {formDescription}
              </Typography>
              {formNumber != "" && (
                <Typography
                  sx={{ mb: 1 }}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  Form Number: {formNumber}
                </Typography>
              )}
            </Box>
            {formFields.map((field) => (
              <Field
                key={field.id}
                field={field}
                handleSelectField={handleSelectField}
                handleUpdateField={handleUpdateField}
                handleRemoveField={handleRemoveField}
                moveFieldUp={moveFieldUp}
                moveFieldDown={moveFieldDown}
                isSelected={selectedField && selectedField.id === field.id}
              />
            ))}
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteForm}
            >
              Delete Form
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveForm}
            >
              Save Form
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.type === "success"
            ? "Form saved successfully."
            : "Error saving form."}
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseDeleteSnackbar}
      >
        <Alert
          onClose={handleCloseDeleteSnackbar}
          severity={deleteSnackbar.type}
          sx={{ width: "100%" }}
        >
          {deleteSnackbar.type === "success"
            ? "Form deleted successfully."
            : "Error deleting form."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormTemplateGenerator;
