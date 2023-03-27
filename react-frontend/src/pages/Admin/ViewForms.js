import React from "react";
import { Divider, Typography } from "@mui/material";
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
// import UserAccountTabs from "../../components/UserAccountComponents/UserAccountTabs";

const FormsTable = () => {
    const [forms, setForms] = useState([]);
    const [searchedVal, setSearchedVal] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/formtemplate`)
        .then((res) => {
            // console.log(res.data)
          setForms(res.data);
          return true;
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const newAccount = () => {
      navigate(`../admin/create_account`);
    };
  
    const editVendor = (id) => {
      navigate(`../admin/edit_account?id=${id}`);
    };
  
    const deleteVendor = (id) => {
      axios
        .delete(`http://localhost:8080/api/vendor/${id}`)
        .then((res) => {
          console.log(res.data);
          alert("Vendor successfully deleted");
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
                <TableCell>Form Number</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Effective Date</TableCell>
                <TableCell>Revision Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms
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
                    <TableCell>{item.formNumber}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.effectiveDate}</TableCell>
                    <TableCell>{item.revisionNumber}</TableCell>
                    <TableCell>{item.status}</TableCell>
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
                        onClick={() => deleteVendor(item.userId)}
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

const ViewForms = () => {

  return (
    <>
      <Typography variant="h5" sx={{ pb: 4 }}>
        All Forms
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <FormsTable/>
    </>
  );
};

export default ViewForms;