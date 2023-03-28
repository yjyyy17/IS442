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

const CompletedFormTable = () => {
  const [vendors, setVendors] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/completedform`)
      .then((res) => {
        setVendors(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [vendors]);

  const newCompletedForm= () => {
    navigate(`../addCompletedForm`);
  };

  const editCompletedForm = (id) => {
    navigate(`../admin/update?user_group_id=${user_group_id}&pdf_id=${pdf_id}`);
  };

  const deleteCompletedForm = (pdf_id) => {
    axios
      .delete(`http://localhost:8080/api/completedForm/${pdf_id}`)
      .then((res) => {
        console.log(res.data);
        alert("CompletedForm successfully deleted");
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
          <Button variant="contained" color="primary" onClick={newCompletedForm}>
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
              .map((item) => (
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
                      onClick={() => editCompletedForm(item.userId)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteCompletedForm(user_group_id,pdf_id)}
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


export default CompletedFormTable;
