import React from "react";
import { Divider, Typography, Snackbar, Chip } from "@mui/material";
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
import { Check } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const FormsTable = () => {
  const [forms, setForms] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, type: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/forms-to-approve`)
      .then((res) => {
        console.log(res.data);
        setForms(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [snackbar]);

  const approveForm = (form) => {
    axios
      .put(`http://localhost:8080/api/approve-form/${form.formId}`)
      .then((res) => {
        console.log(res.data);
        setSnackbar({ open: true, type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({ open: true, type: "error" });
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
          <Button variant="contained" color="primary" disabled>
            <Check />
            Approve
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
              <TableCell>Created By</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.formNumber
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.title
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.description
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.createdBy
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item) => (
                <TableRow
                  key={item.formId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.formNumber}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.effectiveDate}</TableCell>
                  <TableCell>{item.revisionNumber}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        item.status === "Pending"
                          ? "warning"
                          : item.status === "Approved"
                          ? "success"
                          : item.status === "Rejected"
                          ? "error"
                          : ""
                      }
                      label={item.status}
                    />
                  </TableCell>
                  <TableCell>{item.createdBy}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#93C019" }}
                      disabled={item.status !== "Pending"}
                      onClick={() => approveForm(item)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
              ? "Form approved successfully."
              : "Error approving form."}
          </Alert>
        </Snackbar>
      </>
    );
  };

  const ApproveForms = () => {
    return (
      <>
        <Typography variant="h5" sx={{ pb: 4 }}>
          Approve Forms 
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <FormsTable />
      </>
    );
  };

  export default ApproveForms;