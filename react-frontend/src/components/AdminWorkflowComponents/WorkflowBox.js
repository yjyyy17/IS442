import {
  Button,
  Card,
  CardActions,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WorkflowBox = (props) => {
  const [actions, setActions] = useState([]);
  const current = new Date();

  const deleteWorkflow = (id) => {
    axios
      .put(`http://localhost:8080/api/workflow/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        alert(`Workflow successfully deleted!`);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/workflow`)
      .then((res) => {
        res.data.forEach((workflow, index) => {
          var workflowID = workflow.workflowId;
          var formStatuses = workflow.formStatuses;
          var overdueAssignees = [];
          formStatuses.forEach((fs, index) => {
            var formDueDate = new Date(fs.dueDate).getTime();
            if (formDueDate < current) {
              overdueAssignees.push(fs.user.name);
            }
            console.log(overdueAssignees);
          });
          axios
            .get(`http://localhost:8080/api/action/workflow/${workflowID}`)
            .then((res) => {
              setActions((current) => [
                ...current,
                {
                  workflow: workflow,
                  actions: res.data,
                  overdueVendors: overdueAssignees,
                },
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div style={{ height: "500px", overflow: "auto" }}>
        {actions
          .filter(
            (action) =>
              !props.filterSearch.length ||
              action.workflow.title
                .toString()
                .toLowerCase()
                .includes(props.filterSearch.toString().toLowerCase())
          ).filter(
            (action) =>
            !props.filterSwitch || action.overdueVendors.length >0
          )
          .map((action, index) => {
            if (action.workflow.status == "Inactive"){
              return
            }
            return(
                  <Card sx={{ p: 3, mb: 5 }} key={index}>
                    <CardContent>
                      <Typography variant="h6">{action.workflow.title}</Typography>
                      <br></br>
                      {action.overdueVendors.length != 0 && (
                        <Alert severity="error">
                          Late forms: {action.overdueVendors.length}
                          <br />
                          Late assignee(s): {action.overdueVendors.join(", ")}
                        </Alert>
                      )}
                      <Typography variant="caption">Action to be taken</Typography>
                      <Stepper activeStep={-1}>
                        {action.actions.map((oneaction) => (
                          <Step key={oneaction.actionId}>
                            <StepLabel>{oneaction.title}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={`../admin/indiv_workflow?id=${action.workflow.workflowId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="text">View</Button>
                      </Link>
                      <Link
                        onClick={() => deleteWorkflow(action.workflow.workflowId)}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="text" color="error">
                          Delete
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>

            )
          })}
      </div>
    </>
  );
};

export default WorkflowBox;
