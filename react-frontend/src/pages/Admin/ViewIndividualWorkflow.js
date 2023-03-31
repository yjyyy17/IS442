import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
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
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const ViewIndividualWorkflow = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [actions, setActions] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [formTemplate, setFormTemplate] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [overdueAssignees, setOverdueAssignees] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [actionFormTitle, setActionFormTitle] = useState("");
  const [actionFormAssignee, setActionFormAssignee] = useState("");
  const [formTemplates, setAllFormTemplates] = useState([]);
  const [actionAssignedForm, setActionAssignedForm] = useState("");
  const [reloadActions, setReloadActions] = useState(false);
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
        var today = new Date();
        res.data[0].workflow.formStatuses.forEach((formStatus) => {
          var formDueDate = new Date(formStatus.dueDate).getTime();
          var userId = formStatus.user.userId;
          if (formDueDate < today) {
            setOverdueAssignees((prevState) => [...prevState, userId]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/api/formtemplate`)
      .then((res) => {
        setAllFormTemplates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadActions]);

  const sendEmail = () => {
    axios
      .get(`http://localhost:8080/api/sendOverdueEmails`)
      .then((res) => {
        alert("An email reminder is sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addAction = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/action`, {
        title: actionFormTitle,
        assigneeRole: actionFormAssignee,
      })
      .then((res) => {
        console.log(res.data);
        var actionId = res.data.actionId
        axios
        .put(`http://localhost:8080/api/action/${actionId}/workflow/${id}`)
        .then((res) => {
          console.log(res.data);
          axios
          .put(`http://localhost:8080/api/action/${actionId}/formTemplate/${actionAssignedForm}`)
          .then((res) => {
            console.log(res.data)
            setReloadActions(!reloadActions);
          })
          .catch((err) => {
            console.log(err)
          });
        })
        .catch((err) => {
          console.log(err);
        });
        alert("Action successfully added");
        setActionAssignedForm("")
        setActionFormAssignee("")
        setActionFormTitle("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SideNavigation
        content={
          <>
            <Typography variant="h5" sx={{ pb: 4 }}>
              View Workflow
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ mb: 1 }}
                >
                  New Action
                </Typography>
                <form onSubmit={addAction}>
                  <TextField
                    required
                    label="Action title"
                    value={actionFormTitle}
                    sx={{ width: "100%", mb: 1 }}
                    onChange={(e) => setActionFormTitle(e.target.value)}
                  />
                  <TextField
                    select
                    required
                    label="Assign to Form"
                    value={actionAssignedForm}
                    onChange={(e) => setActionAssignedForm(e.target.value)}
                    sx={{ width: "100%", mb: 1 }}
                  >
                    {formTemplates.map((option) => (
                      <MenuItem key={option.title} value={option.formId}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    select
                    label="Assign to role"
                    onChange={(e) => setActionFormAssignee(e.target.value)}
                    value={actionFormAssignee}
                    sx={{ width: "100%", mb: 3 }}
                  >
                    {userTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button variant="contained" color="warning" type="submit">
                    Add Action
                  </Button>
                </form>
              </Box>
            </Modal>
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
                {/* <TextField
                  id="status"
                  select
                  sx={{ width: "50%", mb: 4 }}
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"incomplete"}>Incomplete</MenuItem>
                  <MenuItem value={"complete"}>Complete</MenuItem>
                </TextField> */}
                <div>
                  <div className="d-flex justify-content-end mb-4">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleOpen}
                    >
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
                          select
                          label="Form"
                          defaultValue={action.formTemplate.title}
                          onChange={(e) => setFormTemplate(e.target.value)}
                          sx={{ width: "100%", mb: 2 }}
                        >
                          {formTemplates.map((option) => (
                            <MenuItem key={option.title} value={option.title}>
                              {option.title}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          id="userType"
                          select
                          label="Assign to role"
                          sx={{ width: "100%" }}
                          onChange={(e) => setAssignee(e.target.value)}
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
                  {userGroups.length == 0 ? (
                    <Alert severity="warning" sx={{ mt: 4 }}>
                      No assigned user group
                    </Alert>
                  ) : (
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
                                  {overdueAssignees.includes(user.userId) ? (
                                    <>
                                      <TableCell>
                                        <Chip color="error" label={"Late"} />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="contained"
                                          color="warning"
                                          onClick={() => sendEmail()}
                                        >
                                          Email
                                        </Button>
                                      </TableCell>
                                    </>
                                  ) : (
                                    <>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                    </>
                                  )}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    ))
                  )}
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
