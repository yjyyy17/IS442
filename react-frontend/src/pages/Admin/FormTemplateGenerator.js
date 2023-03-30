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
  InputLabel,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Add, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      {field.type === "Text Field" && (
        <TextField label={field.label} fullWidth />
      )}
      {field.type === "Radio" && (
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
      {field.type === "Checkbox" && (
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
      {field.type === "Dropdown" && (
        <FormControl fullWidth>
          <InputLabel id="dropdown-label">{field.label}</InputLabel>
          <Select labelId="dropdown-label" id="dropdown" label="Dropdown">
            {field.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
              // <MenuItem
              //   key={option}
              //   value={option}
              // />
            ))}
          </Select>
        </FormControl>
      )}

      {field.type === "Text Area" && (
        <TextField
          label={field.label}
          multiline
          rows={4}
          style={{ width: "100%", marginTop: "16px", marginBottom: "8px" }}
        />
      )}

      {field.type === "Datetime" && (
        <TextField
          fullWidth
          label={field.label}
          type="datetime-local"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      {field.type === "Heading1" && (
        <FormControl component="fieldset" fullWidth>
          <FormGroup>
            <Typography key={field.id} variant="h4" sx={{ mb: 1 }}>
              {field.label}
            </Typography>
          </FormGroup>
        </FormControl>
      )}
      {field.type === "Heading2" && (
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

{
  /* Radio, Checkbox, Dropdown options Preparation section */
}
const OptionsField = ({ selectedField, handleUpdateField }) => {
  const [options, setOptions] = useState(selectedField.options);

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
    handleUpdateField(selectedField.id, "options", newOptions);
  };

  const addOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    handleUpdateField(selectedField.id, "options", newOptions);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    handleUpdateField(selectedField.id, "options", newOptions);
  };

  return (
    <Box sx={{ mt: 2, p: 3, border: "1px dashed grey" }}>
      <Typography variant="h7">{selectedField.type} options</Typography>
      {selectedField.options.map((option, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            fullWidth
            label={`Option ${index + 1}`}
            value={option}
            onChange={(event) => handleOptionChange(event, index)}
            margin="normal"
          />
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => removeOption(index)}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addOption}
        sx={{ mt: 1 }}
      >
        Add more options
      </Button>
    </Box>
  );
};

const FormTemplateGenerator = ({
  initialFormTitle,
  initialFormDescription,
  initialFormNumber,
  initialRevisionNumber,
  initialFormFields,
}) => {
  // console.log("initialFormTitle", initialFormTitle);
  // console.log("initialFormDescription", initialFormDescription);
  // console.log("initialFormNumber", initialFormNumber);
  // console.log("initialFormFields", initialFormFields);
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState(
    initialFormTitle ? initialFormTitle : ""
  );
  const [formDescription, setFormDescription] = useState(
    initialFormDescription ? initialFormDescription : ""
  );
  const [formNumber, setFormNumber] = useState(
    initialFormNumber ? initialFormNumber : ""
  );
  const [revisionNumber, setRevisionNumber] = useState(
    initialRevisionNumber ? initialRevisionNumber : 0
  );
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
            options: field.options != "" ? field.options.split(",") : [],
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
      type: "Text Field",
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

  // const handleDeleteForm = () => {
  //   console.log("Form deleted");
  //   // Add your logic to delete the form
  //   axios
  //     .put(`http://localhost:8080/api/formtemplate/delete/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       // alert("Form successfully deleted");
  //       setDeleteSnackbar({ open: true, type: "success" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setDeleteSnackbar({ open: true, type: "error" });
  //     });
  // };

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
          revisionNumber: 0,
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
                options: field.options != [] ? field.options.join(",") : "",
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
                setTimeout(function () {
                  navigate(`../admin/forms`);
                }, 2000);
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
          revisionNumber: revisionNumber+1,
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
                options: field.options != [] ? field.options.join(",") : "",
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
                console.log("Error saving field:", field.label);
              });
            // setSnackbar({ open: true, type: "success" });
          });
          setSnackbar({ open: true, type: "success" });
          setTimeout(function () {
            navigate(`../admin/forms`);
          }, 2000);
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
              sx={{ mb: 2 }}
            />
            <TextField
              label="Form Description"
              multiline
              rows={4}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Form Number"
              value={formNumber}
              onChange={(e) => setFormNumber(e.target.value)}
              fullWidth
            />
          </Box>
        </Grid>
        {/* <Divider sx={{ mb: 4 }} /> */}
        {/* Field Preparation section */}
        <Grid item xs={5} sx={{ mt: 2, p: 1 }}>
          <Box
            sx={{
              position: "sticky",
              top: "7em",
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
                    <MenuItem value="Text Field">Text Field</MenuItem>
                    <MenuItem value="Radio">Radio</MenuItem>
                    <MenuItem value="Checkbox">Checkbox</MenuItem>
                    <MenuItem value="Text Area">Text Area</MenuItem>
                    <MenuItem value="Dropdown">Dropdown</MenuItem>
                    <MenuItem value="Datetime">Datetime</MenuItem>
                    <MenuItem value="Heading1">Heading 1</MenuItem>
                    <MenuItem value="Heading2">Heading 2</MenuItem>
                  </Select>
                </FormControl>
                {(selectedField.type === "Radio" ||
                  selectedField.type === "Checkbox" ||
                  selectedField.type === "Dropdown") && (
                  <OptionsField
                    selectedField={selectedField}
                    handleUpdateField={handleUpdateField}
                  />
                )}
              </Box>
            )}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleRemoveField(selectedField.id)}
                sx={{ mr: 2 }}
              >
                Remove field
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddField}
              >
                Add Field
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* Field Preview section */}
        <Grid item xs={7} sx={{ mb: 10, mt: 2 }}>
          <Typography variant="h6">Form Preview</Typography>
          <Box sx={{ mt: 2, backgroundColor: "background.paper" }}>
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
              startIcon={<Delete />}
              onClick={handleClearFields}
              // sx={{ ml: 2 }}
            >
              Clear All Fields
            </Button>
            {/* <Button
              variant="contained"
              color="error"
              onClick={handleDeleteForm}
            >
              Delete Form
            </Button> */}
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
