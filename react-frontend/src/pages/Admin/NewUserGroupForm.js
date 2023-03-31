import {
  Button,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Autocomplete,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
} from "@mui/material";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import UserGroupTable from "../../components/AdminWorkflowComponents/UserGroupTable";

const NewUserGroupForm = (props) => {
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
  const [userType, setUserType] = useState("Vendor");
  const [allVendors, setAllVendors] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [allApprovers, setAllApprovers] = useState([]);
  const [userGroup, setUserGroup] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [forms, setForms] = useState({});

  const [snackbar, setSnackbar] = useState({ open: false, type: "success" });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/vendor`)
      .then((res) => {
        setAllVendors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/api/admin`)
      .then((res) => {
        setAllAdmins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/api/approver`)
      .then((res) => {
        setAllApprovers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleUserTypeChange = (e) => {
  //   setUserType(e.target.value)
  //   if(userType == "Vendor"){

  //   }
  // };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const returnToWorkflow = (e) => {
    // to change the location to the prev page
    navigate(-1, { state: { workflowDetails: {} } });
  };

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  const handleOptionSelect = (event, value) => {
    console.log(value);
    setSelectedOption(value);
  };

  const filterVendorOptions = (allVendors, { inputValue }) => {
    return allVendors.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const filterAdminOptions = (allAdmins, { inputValue }) => {
    return allAdmins.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const filterApproverOptions = (allApprovers, { inputValue }) => {
    return allApprovers.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSaveUserGroup = () => {
    console.log(userGroup);
    var usergroupId = null;
    // create a new user group
    axios
      .post(`http://localhost:8080/api/userGroup`, {})
      .then((res) => {
        usergroupId = res.data.userGroupId;
        // console.log("Created usergroup:", usergroupId);
        // setAllApprovers(res.data);
      })
      .then(() => {
        userGroup.forEach((user, index) => {
          // console.log("adding user:", user.userId);
          // map users to usergroup
          axios
            .put(
              `http://localhost:8080/api/userGroup/${usergroupId}/user/${user.userId}`
            )
            .then((res) => {
              usergroupId = res.data.userGroupId;
              // setAllApprovers(res.data);
            })
            .catch((err) => {
              setSnackbar({ open: true, type: "error" });
            });
        });
        setSnackbar({ open: true, type: "success" });
        setUserGroup([]);
        setSelectedOption(null);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({ open: true, type: "error" });
      });
  };

  return (
    <>
      <SideNavigation
        content={
          <>
            <div className="d-flex justify-content-between">
              <Typography variant="h5" sx={{ pb: 4 }}>
                New user group
              </Typography>
              <div>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "grey" }}
                  onClick={returnToWorkflow}
                >
                  Back to workflow
                </Button>
              </div>
            </div>
            <Divider sx={{ mb: 4 }} />
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ pb: 2 }}>
                Add assignee
              </Typography>
              <form>
                <div className="mb-4">
                  <TextField
                    id="userType"
                    select
                    required
                    label="Role"
                    defaultValue="Vendor"
                    sx={{ width: "100%" }}
                    onChange={(e) => {
                      setSearchValue("");
                      setSelectedOption(null);
                      setUserType(e.target.value);
                    }}
                    value={userType}
                  >
                    {userTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="mb-3">
                  {userType == "Vendor" && (
                    <Autocomplete
                      options={allVendors}
                      getOptionLabel={(user) => user.name}
                      filterOptions={filterVendorOptions}
                      value={selectedOption}
                      onChange={handleOptionSelect}
                      onInputChange={handleSearchChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search vendor"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  {userType == "Admin" && (
                    <Autocomplete
                      options={allAdmins}
                      getOptionLabel={(user) => user.name}
                      filterOptions={filterAdminOptions}
                      value={selectedOption}
                      onChange={handleOptionSelect}
                      onInputChange={handleSearchChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search admin"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  {userType == "Approver" && (
                    <Autocomplete
                      options={allApprovers}
                      getOptionLabel={(user) => user.name}
                      filterOptions={filterApproverOptions}
                      value={selectedOption}
                      onChange={handleOptionSelect}
                      onInputChange={handleSearchChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search approver"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                </div>
                {userType == "Vendor" && (
                  <div className="mb-4 d-flex justify-content-between">
                    <TextField
                      onChange={(e) => {
                        console.log(e.target.value);
                        setDueDate(e.target.value);
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
                )}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // save user to user group state
                      setUserGroup([...userGroup, selectedOption]);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Paper>
            <br />
            {/* <UserGroupTable users={userGroup}/> */}
            <Typography variant="h5" sx={{ mb: 2 }}>
              User Groups{" "}
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Form</TableCell>
                    <TableCell>Form due date</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userGroup.map((item) => {
                    return (
                      <TableRow
                        key={item.userId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.userType}
                            color={
                              item.userType == "Vendor"
                                ? "primary"
                                : item.userType == "Admin"
                                ? "success"
                                : "secondary"
                            }
                          />
                        </TableCell>
                        <TableCell>formname</TableCell>
                        <TableCell>
                          {item.userType == "Vendor" ? dueDate : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              const updatedUG = userGroup.filter(
                                (u) => u.userId !== item.userId
                              );
                              setUserGroup(updatedUG);
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Button
              variant="contained"
              color="warning"
              onClick={handleSaveUserGroup}
            >
              Save
            </Button>

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
                  ? "User group successfully created."
                  : "Error creating user group."}
              </Alert>
            </Snackbar>
          </>
        }
      />
    </>
  );
};

export default NewUserGroupForm;
