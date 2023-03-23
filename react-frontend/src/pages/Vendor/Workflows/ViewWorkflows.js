import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  InputAdornment,
} from "../../../mui";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import getAllUserGroups from "../../../services/getAllUserGroups";
import getFormStatus from "../../../services/getFormStatus";

const ViewWorkflows = (props) => {
  const { viewIndivWorkflow } = props;
  const [searchInput, setSearchInput] = useState("");
  const userId = sessionStorage.getItem("userId");
  const [userGroupData, setUserGroupData] = useState([]);
  const [workflowData, setWorkflowData] = useState([]);
  const [workflowDataWithStatus, setWorkflowDataWithStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUserGroups();
      setUserGroupData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const workflows = [];

    userGroupData.forEach((group) => {
      group.assignedUsers.forEach((user) => {
        if (parseInt(user.userId) === parseInt(userId)) {
          workflows.push(...group.assignedWorkflows);
        }
      });
    });

    setWorkflowData(workflows);
  }, [userGroupData]);

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < workflowData.length; i++) {
        var wfId = parseInt(workflowData[i].workflowId);
        const data = await getFormStatus(parseInt(userId), wfId)

        setWorkflowDataWithStatus(
          workflowData.map(wf => 
            wf.workflowId = wfId 
              ? {...wf, status : data.evaluationStatus}
              : wf 
      ))
      }
    };

    fetchData();
  }, [workflowData]);


  function handleWorkflowClick(workflowID) {
    // pass workflowID to Vendor component
    viewIndivWorkflow(workflowID);
  }

  return (
    <>
      <Typography variant='h5' sx={{ pb: 4 }}>
        Your workflow(s)
      </Typography>
      <Divider />

      <Typography sx={{ mt: 4 }}>Search by title</Typography>
      <TextField
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4, width: "100%" }}
      />

      {/* **** To change to map when GET request for all workflows is complete **** */}
      {workflowDataWithStatus.map((wf) => (
        <Card sx={{ p: 3, mb: 5 }} key={wf.workflowId}>
          <CardContent>
            <Typography variant='h6'>{wf.title}</Typography>
            <br></br>
            <Typography sx={{ color: "grey" }}>Status: {wf.status}</Typography>
            {wf.status === "Rejected" && (
              <Typography sx={{ color: "grey" }}>
                Reason: {wf.reason}
              </Typography>
            )}
            <br></br>
            <Typography sx={{ color: "grey" }}>{wf.description}</Typography>
          </CardContent>
          <CardActions>
            <Link
              to={"indiv_workflow"}
              style={{ textDecoration: "none" }}
              state={{ data: wf }}
            >
              <Button variant='text' onClick={() => handleWorkflowClick(wf)}>
                Complete
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default ViewWorkflows;