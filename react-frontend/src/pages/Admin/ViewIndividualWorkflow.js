import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import React, { useEffect, useState } from "react";
import {
    Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
const ViewIndividualWorkflow = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [actions, setActions] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const userTypes = [
    {
      value: "Vendor",
      label: "Vendor",
    },
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Approver",
      label: "Approver",
    },
  ];
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/workflow/${id}`)
      .then((res) => {
        setTitle(res.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/api/action/workflow/${id}`)
      .then((res) => {
        setActions(res.data);
        setAssignee(res.data.assigneeRole);
        setUserGroups(res.data[0].workflow.userGroups);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <SideNavigation
        content={
          <>
            <Typography variant="h5" sx={{ pb: 4 }}>
              View Workflow
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Paper sx={{ p: 4 }}>
              <form>
                <div>
                  <TextField
                    label="Title"
                    value={title}
                    sx={{ width: "50%", mb: 4 }}
                  />
                </div>
                {/* dk what this status is for */}
                <TextField
                  id="status"
                  select
                  sx={{ width: "50%", mb: 4  }}
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value={"incomplete"}>Incomplete</MenuItem>
                    <MenuItem value={"complete"}>Complete</MenuItem>
                </TextField>
                <div>
                  <div className="d-flex justify-content-end mb-4">
                    <Button variant="contained" color="warning">
                      Add Action
                    </Button>
                  </div>
                  <Typography variant="caption">Action to be taken</Typography>
                  <Stepper activeStep={-1} sx={{ mb: 4 }}>
                    {actions.map((oneaction) => (
                      <Step key={oneaction.actionId}>
                        <StepLabel>{oneaction.title}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>

                <div>
                  {actions.map((action, index) => (
                    <Card
                      sx={{ p: 3, mb: 5, backgroundColor: "#FFF4F2" }}
                      key={index}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Action {index + 1}
                        </Typography>
                        <TextField
                          label="Action Title"
                          value={action.title}
                          sx={{ width: "100%", mb: 2 }}
                        />
                        <TextField
                          label="Form"
                          value={action.formTemplate.title}
                          sx={{ width: "100%", mb: 2 }}
                        />
                        <TextField
                          id="userType"
                          select
                          label="Role"
                          sx={{ width: "100%" }}
                          onChange={(e) => setAssignee(e.target.value)}
                          value={assignee}
                          defaultValue={action.assigneeRole}
                        >
                          {userTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <Typography variant="caption">
                      Assign user groups
                    </Typography>
                    <Button variant="contained" color="warning">
                      Add User Group
                    </Button>
                  </div>
                  {userGroups.length==0? <Alert severity="warning" sx={{mt:4}}>No assigned user group</Alert>:
                    userGroups.map((usergroup, index) => (
                      <div key={index}>
                        <Typography variant="h5">
                          User Group {index + 1}
                        </Typography>
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Form</TableCell>
                                <TableCell>Form due date</TableCell>
                                <TableCell>Form status</TableCell>
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {usergroup.assignedUsers.map((user, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>{user.name}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={user.userType}
                                      color={
                                        user.userType == "Vendor"
                                          ? "primary"
                                          : user.userType == "Admin"
                                          ? "success"
                                          : "secondary"
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>form name</TableCell>
                                  <TableCell>Form status</TableCell>
                                  <TableCell>-</TableCell>
                                  <TableCell>
                                    <Button variant="contained" color="warning">
                                      Email
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    ))}

                </div>
              </form>
            </Paper>
          </>
        }
      />
    </>
  );
};

export default ViewIndividualWorkflow;
