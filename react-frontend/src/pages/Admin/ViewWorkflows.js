import { InputAdornment, Switch, TextField, Button, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import WorkflowBox from "../../components/AdminWorkflowComponents/WorkflowBox";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
const ViewWorkflows = () => {
  const label = { inputProps: { "aria-label": "Switch Late Form" } };
  const [searchedVal, setSearchedVal] = useState("")
  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography variant="h5" sx={{ pb: 4 }}>
          Your Workflow(s)
        </Typography>
        <div>
          <Button variant="contained" color="warning">
            Create New
          </Button>
        </div>
      </div>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <div>
            <TextField
              label="Search"
              sx={{ mb: 4 }}
              onChange={(e) => setSearchedVal(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <Typography variant="subtitle2">
              Show all with late forms
            </Typography>
            <Switch {...label} />
          </div>
        </Grid>
        <Grid item xs={8}>
          <WorkflowBox 
          filterSearch ={searchedVal}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewWorkflows;
