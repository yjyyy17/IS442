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
      .get(`http://localhost:8080/api/formstatus`)
      .then((res) => {
        console.log(res.data);
        setForms(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [snackbar]);

  const updateFormStatus = (formId, userId, workflowId) => {
    axios
      .put(`http://localhost:8080/api/formstatus?formId=${formId}&workflowId=${workflowId}&userId=${userId}`, {
        evaluationStatus: "Approved",
        rejectionPersonnel: null,
        rejectionComments: null
      })
      .then((res) => {
        setSnackbar({ open: true, type: "success", message: "Form status updated successfully." });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({ open: true, type: "error", message: "Error updating form status." });
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
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms
              .filter(
                (row) =>
                  !searchedVal.length ||
                  row.form.formNumber
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.form.title
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.form.description
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) ||
                  row.user.name
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              .map((item, index) => (
                  <TableRow
                    key={`${item?.form?.for}-${item?.user?.name}` || index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                  <TableCell>{item?.form?.formNumber}</TableCell>
                  <TableCell>{item?.form?.title}</TableCell>
                  <TableCell>{item?.form?.description}</TableCell>
                  <TableCell>{item?.form?.effectiveDate}</TableCell>
                  <TableCell>{item?.form?.revisionNumber}</TableCell>
                  <TableCell>{item?.form?.status}</TableCell>
                  <TableCell>{item?.user?.name}</TableCell>
                  <TableCell>{item?.user?.email}</TableCell>
                  <TableCell>{item?.user?.phoneNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (item) {
                          navigate(`/form/${item.form.formId}`);
                        }
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (item) {
                          // You need to pass the formId, userId, and workflowId from the item object as appropriate.
                          updateFormStatus(item.form.formId, item.user.userId, item.workflow.workflowId);
                        }
                      }}
                    >
                      Approve
                    </Button>
                  </TableCell>
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
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormsTable;
