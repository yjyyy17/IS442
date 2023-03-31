import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const VendorsTable = (props) => {
  const [vendors, setVendors] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [reloadVendors, setReloadVendors] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/vendor`)
      .then((res) => {
        setVendors(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadVendors]);

  const newAccount = () => {
    navigate(`../admin/create_account`, {state:{userType:props.userType}});
  };

  const editVendor = (id) => {
    navigate(`../admin/edit_account?id=${id}`);
  };
  // hard delete
  // const deleteVendor = (id) => {
  //   axios
  //     .delete(`http://localhost:8080/api/vendor/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("Vendor successfully deleted");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const deactivateVendor = (vendor) => {
    axios
      .put(`http://localhost:8080/api/user/${vendor.userId}`, {
        name: vendor.name,
        email: vendor.email,
        phoneNo: vendor.phoneNo,
        password: vendor.password,
        address: vendor.address,
        industry: vendor.industry,
        status: "inactive",
      })
      .then((res) => {
        console.log(res.data);
        setReloadVendors(!reloadVendors);
        alert(`${vendor.name} successfully deleted!`);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <TextField
          label="Search"
          sx={{ mb: 4 }}
          onChange={(e) => setSearchedVal(e.target.value)}
        />
        <div className="row align-items-center">
          <Button variant="contained" color="primary" onClick={newAccount}>
            <Add />
            New
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.name
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.email
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.industry
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item) => {
                if (item.status === "active") {
                  return (
                    <TableRow
                      key={item.userId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{item.userId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phoneNo}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.industry}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#93C019" }}
                          onClick={() => editVendor(item.userId)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => deactivateVendor(item)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VendorsTable;
