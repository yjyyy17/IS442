import React, { useState, useRef, useEffect } from "react";
import {
  Box,
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
} from "@mui/material";
import { Add, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

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
            <Typography key={field.id} variant="h4" sx={{ mb: 2 }}>
              {field.label}
            </Typography>
          </FormGroup>
        </FormControl>
      )}
      {field.type === "heading2" && (
        <FormControl component="fieldset" fullWidth>
          <FormGroup>
            <Typography key={field.id} variant="h5" sx={{ mb: 2 }}>
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

const FormTemplateGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

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

  return (
    <Box sx={{ m: 4 }}>
      <Grid container spacing={3}>
        {/* Field Preparation section */}
        <Grid item xs={6}>
          <Box
            sx={{
              position: "sticky",
              top: "1rem",
            }}
          >
            <Typography variant="h6">Field Preparation</Typography>
            {selectedField && (
              <Box sx={{ mb: 2 }}>
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
                  edge="end"
                  color="error"
                  onClick={() => handleRemoveField(selectedField.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddField}
            >
              Add Field
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Form Preview</Typography>
          <Box sx={{ mt: 2 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormTemplateGenerator;
