import {
  Button,
  Card,
  CardActions,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WorkflowBox = (props) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/workflow`)
      .then((res) => {
        res.data.forEach((workflow, index) => {
          var workflowID = workflow.workflowId;
          axios
            .get(`http://localhost:8080/api/action/workflow/${workflowID}`)
            .then((res) => {
              setActions((current) => [
                ...current,
                { workflow: workflow, actions: res.data },
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
          )
          .map((action) => {
            return (
              <Card sx={{ p: 3, mb: 5 }} key={action.workflow.workflowId}>
                <CardContent>
                  <Typography variant="h6">{action.workflow.title}</Typography>
                  <br></br>
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
                    to={""}
                    style={{ textDecoration: "none" }}
                    // state={{ data: wf }}
                  >
                    <Button variant="text">View</Button>
                  </Link>
                  <Link
                    to={""}
                    style={{ textDecoration: "none" }}
                    // state={{ data: wf }}
                  >
                    <Button variant="text" color="error">
                      Delete
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default WorkflowBox;
