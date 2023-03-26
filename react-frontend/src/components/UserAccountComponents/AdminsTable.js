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
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

const VendorsTable = () => {
  const [admins, setAdmin] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin`)
      .then((res) => {
        setAdmin(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [admins]);

  const newAccount = () => {
    navigate(`../admin/create_account`);
  };

  const editAdmin = (id) => {
    navigate(`../admin/edit_account?id=${id}`);
  };

  const deleteAdmin = (id) => {
    axios
      .delete(`http://localhost:8080/api/admin/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Admin successfully deleted");
      })
      .catch((err) => {
        console.log(err);
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
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins
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
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item) => (
                <TableRow
                  key={item.userId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#93C019" }}
                      onClick={() => editAdmin(item.userId)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteAdmin(item.userId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VendorsTable;
