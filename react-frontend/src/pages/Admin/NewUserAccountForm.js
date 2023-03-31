import {
  Button,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const NewUserAccountForm = () => {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [industry, setIndustry] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, type: "success" });

  const navigate = useNavigate();
  const { state } = useLocation();
  if (state != undefined) {
    console.log(state.userType);
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const onCancel = (e) => {
    navigate(`../admin/user_accounts`, { state: { userType: state.userType } });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/${userType.toLowerCase()}`, {
        name: name,
        email: email,
        phoneNo: phoneNo,
        password: password,
        address: address == "" ? null : address,
        industry: industry == "" ? null : industry,
        status: "active",
      })
      .then((res) => {
        console.log(res.data);
        alert("User successfully created");
        setUserType("Vendor");
        setName("");
        setEmail("");
        setPhoneNo("");
        setAddress("");
        setIndustry("");
        setPassword("");
        setSnackbar({ open: true, type: "success" });
        setTimeout(function () {
          navigate(`../admin/user_accounts`, { state: { userType: state.userType } });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setSnackbar({ open: true, type: "error" });

      });
  };

  return (
    <>
      <SideNavigation
        content={
          <>
            <Typography variant="h5" sx={{ pb: 4 }}>
              New user account
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Paper sx={{ padding: 2 }}>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <TextField
                    id="userType"
                    select
                    required
                    label="Role"
                    defaultValue="Vendor"
                    sx={{ width: "100%" }}
                    onChange={(e) => setUserType(e.target.value)}
                    value={userType}
                  >
                    {userTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="mb-4">
                  <TextField
                    required
                    id="name"
                    label="Company/Name"
                    placeholder="Company/Name"
                    sx={{ width: "100%" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4 d-flex justify-content-between">
                  <TextField
                    required
                    id="email"
                    label="Email"
                    placeholder="Email"
                    sx={{ width: "45%" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    required
                    id="phoneNo"
                    label="Phone Number"
                    placeholder="Phone Number"
                    sx={{ width: "45%" }}
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                {userType === "Vendor" ? (
                  <div className="mb-4 d-flex justify-content-between">
                    <TextField
                      required
                      id="address"
                      label="Company Address"
                      placeholder="Company Address"
                      sx={{ width: "45%" }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      required
                      id="industry"
                      label="Industry"
                      placeholder="Industry"
                      sx={{ width: "45%" }}
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="mb-4">
                  <TextField
                    required
                    type="password"
                    id="password"
                    label="Account Password"
                    placeholder="Account Password"
                    sx={{ width: "100%" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "grey" }}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Create
                  </Button>
                </div>
              </form>
            </Paper>
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
                  ? "User successfully created."
                  : "Error saving user."}
              </Alert>
            </Snackbar>
          </>
        }
      />
    </>
  );
};

export default NewUserAccountForm;
