import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
        })
        .catch((err) => {
          console.log(err);
          alert(err);
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
                <FormControl required>
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
                  <Button variant="contained" color="primary" type="submit">
                    Create
                  </Button>
                </FormControl>
              </form>
            </Paper>
          </>
        }
      />
    </>
  );
};

export default NewUserAccountForm;
