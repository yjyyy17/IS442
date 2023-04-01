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
  Autocomplete,
  Modal,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import UserGroupTable from "../../components/AdminWorkflowComponents/UserGroupTable";
import { useNavigate } from "react-router-dom";
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

const NewWorkflow = (props) => {
  console.log(
    sessionStorage.getItem("workflow")
      ? JSON.parse(sessionStorage.getItem("workflow"))
      : "no props"
  );
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [title, setTitle] = useState(
    sessionStorage.getItem("workflow")
      ? JSON.parse(sessionStorage.getItem("workflow")).name
      : ""
  );
  const [desc, setDesc] = useState(
    sessionStorage.getItem("workflow")
      ? JSON.parse(sessionStorage.getItem("workflow")).description
      : ""
  );
  const [status, setStatus] = useState("");
  // const [actions, setActions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [actionCount, setActionCount] = useState(1);
  const [currentUserGroup, setCurrentUserGroup] = useState("");
  const [currentDueDate, setCurrentDueDate] = useState("");
  const [assignedUG, setAssignedUsergroups] = useState(() => {
    var ugList = [];
    var ugDuedateList = sessionStorage.getItem("workflow")
      ? JSON.parse(sessionStorage.getItem("workflow")).assignedUsergroups
      : [];
    ugDuedateList.forEach((element) => {
      ugList.push(element.usergroupId);
    });
    return ugList;
  });
  const [userGroups, setUserGroups] = useState([]);
  const [forms, setForms] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedAsigneeRole, setSelectedAsigneeRole] = useState([]);
  const navigate = useNavigate();

  const [actions, setActions] = useState(
    sessionStorage.getItem("workflow")
      ? JSON.parse(sessionStorage.getItem("workflow")).actions
      : [{ id: uuidv4() }]
  );
  const [workflow, setWorkflow] = useState(
    sessionStorage.getItem("workflow")
      ? JSON.parse(sessionStorage.getItem("workflow"))
      : {
          name: "",
          description: "",
          // form: {},
          actions: [],
          assignedUsergroups: [],
        }
  );

  const handleNameChange = (event) => {
    setTitle(event.target.value);
    setWorkflow({ ...workflow, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setDesc(event.target.value);
    setWorkflow({ ...workflow, description: event.target.value });
  };

  const setDueDate = (event) => {};

  const handleActionChange = (actionIndex, field, value) => {
    const newActions = [...actions];
    newActions[actionIndex][field] = value;
    setActions(newActions);

    const newWorkflow = { ...workflow };
    newWorkflow.actions = newActions;
    setWorkflow(newWorkflow);
  };

  const addAction = () => {
    setActions([...actions, { id: uuidv4() }]);
  };

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
      .get(`http://localhost:8080/api/formtemplate`)
      .then((res) => {
        console.log("forms", res.data);
        setForms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8080/api/userGroup`)
      .then((res) => {
        console.log("usergroups", res.data);
        setUserGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .get(`http://localhost:8080/api/action/workflow/${id}`)
    //   .then((res) => {
    //     setActions(res.data);
    //     setAssignee(res.data.assigneeRole);
    //     setUserGroups(res.data[0].workflow.userGroups);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // const addNewAction = () => {
  //   const newAction = {
  //     id: actions.length + 1,
  //     title: "",
  //     formTemplate: {
  //       title: "",
  //     },
  //     asigneeRole: "",
  //   };
  //   setActions([...actions, newAction]);
  // };

  // const setAction = (actionObj, field, value) => {
  //   console.log(actionObj);
  //   actionObj[field] = value;
  //   actions[actionObj.id - 1] = actionObj;
  //   setActions([...actions]);
  // };

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  const newAccount = () => {
    navigate(`../admin/create_usergroup`, {
      state: { workflow: workflow },
    });
    sessionStorage.setItem("workflow", JSON.stringify(workflow));
  };

  // const handleOptionSelect = (actionObj, value) => {
  //   console.log(actionObj)
  //   if (selectedOption.length == actions.length) {
  //     selectedOption[actionObj.id - 1] = value;
  //   } else {
  //     setSelectedOption([...selectedOption, value]);
  //   }
  //   // actionObj.formTemplate = value;
  //   // actions[actionObj.id - 1] = actionObj;
  //   // console.log(actions);
  //   // setActions([...actions]);
  // };
  // const handleAssigneeRole = (actionObj, value) => {
  //   console.log(actionObj);

  //   console.log(value.props.value);
  //   if (selectedAsigneeRole.length == actions.length) {
  //     selectedAsigneeRole[actionObj.id - 1] = value.props.value;
  //   } else {
  //     setSelectedAsigneeRole([...selectedAsigneeRole, value.props.value]);
  //   }
  //   // actionObj.formTemplate = value;
  //   // actions[actionObj.id - 1] = actionObj;
  //   // console.log(actions);
  //   // setActions([...actions]);
  // };

  const filterOptions = (forms, { inputValue }) => {
    return forms.filter((option) =>
      option.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const addUsergroupToWorkflow = (e) => {
    e.preventDefault();
    setWorkflow({
      ...workflow,
      assignedUsergroups: [
        ...workflow.assignedUsergroups,
        { usergroupId: currentUserGroup, dueDate: currentDueDate },
      ],
    });

    // console.log("workflow", workflow);
    handleClose();
    // console.log("actions", actions)
    // console.log("selectedOption", selectedOption)
    // console.log("selectedAsigneeRole", selectedAsigneeRole)
  };

  const saveNewWorkflow = () => {
    setWorkflow({ ...workflow, name: title });
    console.log("workflow", workflow);
    // console.log("actions", actions)
    // console.log("selectedOption", selectedOption)
    // console.log("selectedAsigneeRole", selectedAsigneeRole)
    var workflowId = null;
    var vendorFormTemplateIds = [];
    var userGroupIdList = [];
    workflow.assignedUsergroups.forEach((pair) => {
      userGroupIdList.push(pair.usergroupId);
    });
    // create a new workflow
    axios
      .post(`http://localhost:8080/api/workflow`, {
        title: workflow.name,
        description: workflow.description,
      })
      .then((res) => {
        console.log("created new workflow");
        workflowId = res.data.workflowId;
      })
      .then((res)=>{
        // create new actions
        workflow.actions.forEach((action) => {
          axios
            .post(`http://localhost:8080/api/action`, {
              title: action.title,
              assigneeRole: workflow.assigneeRole,
            })
            .then((res) => {
              console.log("created new action");
              var actionId = res.data.actionId;
              var formTemplateId = action.form.formId;
              if (workflow.assigneeRole == "Vendor") {
                vendorFormTemplateIds.push(formTemplateId);
              }
    
              // map formtemplate to action
              axios
                .put(
                  `http://localhost:8080/api/action/${actionId}/formTemplate/${formTemplateId}`
                )
                .then((res) => {
                  console.log(
                    `mapped formtemplate ${formTemplateId} to action ${actionId}`
                  );
                  // map workflow to action
                  axios
                    .put(
                      `http://localhost:8080/api/action/${actionId}/workflow/${workflowId}`
                    )
                    .then((res) => {
                      console.log(
                        `mapped action ${actionId} to workflow ${workflowId}`
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        });

      })
      .then((res)=>{
        // map workflow to user groups
        workflow.assignedUsergroups.forEach((userGroup) => {
          var ugId = userGroup.usergroupId;
          var dueDate = userGroup.dueDate;
          axios
            .put(
              `http://localhost:8080/api/userGroup/${ugId}/workflow/${workflowId}` //workflow here is null for some reason 
            )
            .then((res) => {
              console.log(`mapped user group ${ugId} to workflow ${workflowId}`);
    
              // create new form statuses
              var userId = null;
    
              // find vendor User id from usergroups fetched
              userGroups.forEach((ug) => {
                if (ug.userGroupId == userGroup.usergroupId) {
                  // find the vendor userid
                  ug.forEach((user) => {
                    if (user.userType == "Vendor") {
                      userId = user.userId;
                    }
                  });
                }
              });
    
              // for each vendor form template, create a form status
              vendorFormTemplateIds.forEach((formTemplateId) => {
                axios
                  .post(`http://localhost:8080/api/formstatus`, {
                    form: { formId: formTemplateId },
                    user: { userId: userId },
                    workflow: { workflowId: workflowId },
                    evaluationStatus: "Assigned to vendor",
                    rejectionPersonnel: null,
                    rejectionComments: null,
                    dueDate: dueDate,
                  })
                  .then((res) => {
                    console.log(`created form status`);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });

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
              Create Workflow
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
                  Add user group
                </Typography>
                <form onSubmit={addUsergroupToWorkflow}>
                  <TextField
                    select
                    required
                    label="Assign user groups"
                    // value={actionAssignedForm}
                    onChange={(e) => {
                      setCurrentUserGroup(e.target.value);
                      setAssignedUsergroups([...assignedUG, e.target.value]);
                    }}
                    sx={{ width: "100%", mb: 1 }}
                  >
                    {userGroups.map((option) => (
                      <MenuItem
                        key={option.userGroupId}
                        value={option.userGroupId}
                      >
                        {option.userGroupId}
                        {option.assignedUsers.map((user) => (
                          <MenuItem
                            disabled
                            key={user.userId}
                            value={user.userId}
                          >
                            {user.name} ({user.userType})
                          </MenuItem>
                        ))}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div className="mb-4 d-flex justify-content-between">
                    <TextField
                      onChange={(e) => {
                        console.log(e.target.value);
                        setCurrentDueDate(e.target.value);
                      }}
                      fullWidth
                      label="Form due date"
                      type="date"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Button variant="contained" color="warning" type="submit">
                        Add
                      </Button>
                    </div>
                    <div className="row align-items-center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={newAccount}
                      >
                        <Add />
                        New
                      </Button>
                    </div>
                  </div>
                  {/* <Button variant="contained" color="warning" type="submit">
                    Add
                  </Button> */}
                </form>
              </Box>
            </Modal>
            <Paper sx={{ p: 4 }}>
              <form>
                <div>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={handleNameChange}
                    sx={{ mb: 4 }}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="Description"
                    value={desc}
                    onChange={handleDescriptionChange}
                    sx={{ mb: 4 }}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </div>
                <div>
                  <div className="d-flex justify-content-end mb-4">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={addAction}
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
                  {console.log(actions)}
                  {actions.map((action, index) => (
                    <Card
                      sx={{ p: 3, mb: 5, backgroundColor: "#FFF4F2" }}
                      key={action.id}
                    >
                      <CardContent>
                        <TextField
                          label="Action Title"
                          onChange={(e) =>
                            handleActionChange(index, "title", e.target.value)
                          }
                          value={action.title || ""}
                          sx={{ width: "100%", mb: 2 }}
                        />

                        {/* <TextField
                          label="Form"
                          onChange={(e) =>
                            handleActionChange(index, "form", e.target.value)
                          }
                          value={action.form || ""}
                          sx={{ width: "100%", mb: 2 }}
                        /> */}
                        <TextField
                          select
                          required
                          label="Form"
                          defaultValue={
                            actions[index].form ? actions[index].form.title : ""
                          }
                          onChange={(event, value) => {
                            console.log(value.props.value);
                            handleActionChange(
                              index,
                              "form",
                              value.props.value
                            );
                          }}
                          sx={{ width: "100%", mb: 2 }}
                        >
                          {forms.map((option) => (
                            <MenuItem key={option.title} value={option}>
                              {option.title}
                            </MenuItem>
                          ))}
                        </TextField>
                        {/* <Autocomplete
                          options={forms}
                          getOptionLabel={(form) =>
                            form && form.title ? form.title : ""
                          }
                          filterOptions={filterOptions}
                          value={action.form.title}
                          onChange={(event, value) => {
                            console.log("hi");
                            // console.log(value.title)
                            console.log(action);
                            handleActionChange(index, "form", value);
                          }}
                          onInputChange={handleSearchChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Form"
                              variant="outlined"
                            />
                          )}
                          sx={{ width: "100%", mb: 2 }}
                        /> */}
                        {/* <TextField
                          id="userType"
                          select
                          label="Role"
                          sx={{ width: "100%" }}
                          onChange={handleAssigneeRole}
                          value={selectedAsigneeRole[index]}
                          defaultValue={action.assigneeRole}
                        >
                          {userTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField> */}
                        <TextField
                          id={`assignee-${index}`}
                          label="Role"
                          select
                          onChange={(e) =>
                            handleActionChange(
                              index,
                              "assigneeRole",
                              e.target.value
                            )
                          }
                          value={action.assigneeRole || ""}
                          sx={{ width: "100%" }}
                        >
                          {userTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </CardContent>
                    </Card>
                    // <Card
                    //   sx={{ p: 3, mb: 5, backgroundColor: "#FFF4F2" }}
                    //   key={action.id}
                    // >
                    //   <CardContent>
                    //     <Typography variant="h6" sx={{ mb: 2 }}>
                    //       Action {index + 1}
                    //     </Typography>
                    //     {/* <TextField label="" fullWidth /> */}
                    //     <TextField
                    //       label="Action Title"
                    //       onChange={(e) =>
                    //         setAction(action, "title", e.target.value)
                    //       }
                    //       // value=""
                    //       sx={{ width: "100%", mb: 2 }}
                    //     />
                    //     {/* <TextField
                    //       label="Form"
                    //       // value={action.formTemplate.title}
                    //       sx={{ width: "100%", mb: 2 }}
                    //     /> */}
                    //     <Autocomplete
                    //       options={forms}
                    //       getOptionLabel={(form) => form.title}
                    //       filterOptions={filterOptions}
                    //       value={selectedOption[index]}
                    //       onChange={handleOptionSelect}
                    //       onInputChange={handleSearchChange}
                    //       renderInput={(params) => (
                    //         <TextField
                    //           {...params}
                    //           label="Form"
                    //           variant="outlined"
                    //         />
                    //       )}
                    //       sx={{ width: "100%", mb: 2 }}
                    //     />
                    //     <TextField
                    //       id="userType"
                    //       select
                    //       label="Role"
                    //       sx={{ width: "100%" }}
                    //       onChange={handleAssigneeRole}
                    //       value={selectedAsigneeRole[index]}
                    //       defaultValue={action.assigneeRole}
                    //     >
                    //       {userTypes.map((option) => (
                    //         <MenuItem key={option.value} value={option.value}>
                    //           {option.label}
                    //         </MenuItem>
                    //       ))}
                    //     </TextField>
                    //   </CardContent>
                    // </Card>
                  ))}
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <Typography variant="caption">
                      Assign user groups
                    </Typography>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={handleOpen}
                        >
                          Add User Group
                        </Button>
                      </div>
                      {/* <div className="row align-items-center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={newAccount}
                        >
                          <Add />
                          New
                        </Button>
                      </div> */}
                    </div>
                  </div>
                  {/* <UserGroupTable /> */}
                  {assignedUG.length == 0 ? (
                    <Alert severity="warning" sx={{ mt: 4 }}>
                      No assigned user group
                    </Alert>
                  ) : (
                    userGroups.map((usergroup, index) => {
                      // var addedUsergroups = [];
                      // assignedUG.forEach((usergroup, index) => {
                      //   addedUsergroups.push(usergroup.usergroupId);
                      // })
                      if (assignedUG.includes(usergroup.userGroupId)) {
                        return (
                          <div key={index}>
                            <Typography variant="h5" sx={{ mt: 3 }}>
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
                                    {/* <TableCell>Form status</TableCell> */}
                                    {/* <TableCell>Actions</TableCell> */}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {usergroup.assignedUsers.map(
                                    (user, index) => (
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
                                        <TableCell>
                                          {workflow.actions[0].form.title}
                                        </TableCell>
                                        {/* <TableCell>Form status</TableCell> */}
                                        <TableCell>
                                          {/* { user.userType == "Vendor" ? 
                                            workflow.assignedUsergroups[
                                              usergroup.userGroupId
                                            ] : "-"
                                          } */}
                                          {user.userType == "Vendor"
                                            ? workflow.assignedUsergroups
                                                .filter(
                                                  (pair) =>
                                                    pair.usergroupId ===
                                                    usergroup.userGroupId
                                                )
                                                .map((ugPair) => {
                                                  return ugPair.dueDate;
                                                })
                                            : "-"}
                                        </TableCell>
                                        {/* <TableCell>
                                          <Button
                                            variant="contained"
                                            color="warning"
                                          >
                                            Email
                                          </Button>
                                        </TableCell> */}
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        );
                      }
                    })
                  )}
                </div>
              </form>
            </Paper>
            <Button
              variant="contained"
              color="warning"
              sx={{ mt: 4 }}
              onClick={saveNewWorkflow}
            >
              Save
            </Button>
          </>
        }
      />
    </>
  );
};

export default NewWorkflow;
