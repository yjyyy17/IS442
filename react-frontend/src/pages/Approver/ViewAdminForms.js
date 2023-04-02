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
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";

const FormsTable = () => {
  const [forms, setForms] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, type: "success" });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/formtemplate`)
      .then((res) => {
        console.log(res.data);
        // var formsList = [];
        const formsList = res.data.filter((form) => form.status == "Approved");
        setForms(formsList);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [snackbar]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const newForm = () => {
  //   navigate(`../admin/create_form`);
  // };

  // const editForm = (form) => {
  //   navigate(`../admin/edit_form?id=${form.formId}`, { state: { form } });
  // };

  const deleteForm = (id) => {
    axios
      .put(`http://localhost:8080/api/formtemplate/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        // alert("Form successfully deleted");
        setSnackbar({ open: true, type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({ open: true, type: "error" });
      });
  };

  const updateFormStatus = (formId, formNumber, title, description, effectiveDate, revisionNumber, status) => {
    axios
      .put(`http://localhost:8080/api/formtemplate/${formId}`, {
        "formNumber": formNumber,
        "title": title,
        "description": description,
       "effectiveDate": effectiveDate,
        "revisionNumber": revisionNumber,
        "status": status,
      })
      .then((res) => {
        // console.log(formId, workflowId, userId , dueDate); // Add this line to inspect the error object
        setSnackbar({ open: true, type: "success", message: "Form status updated successfully." });
      })
      .catch((err) => {
        // console.log(formId, workflowId, userId , dueDate); // Add this line to inspect the error object
        console.log('Error:', err); // Add this line to inspect the error object
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
          {/* <Button variant="contained" color="primary" onClick={newForm}>
            <Add />
            New
          </Button> */}
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
                    .includes(searchedVal.toString().toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  <TableCell>{item.status}</TableCell>
                  {/* if status is to be displayed in a chip */}
                  {/* <TableCell>
                    <Chip
                      color={item.status == "Active" ? "success" : item.status == "Inactive" ? "error" :"" }
                      label={item.status}
                    />
                  </TableCell> */}

                  <TableCell>
                    <Button
                    disabled={item.status == "Approved" ? true:false}
                      variant="contained"
                      sx={{ backgroundColor: "#93C019" }}
                      onClick={() => {
                        if (item) {
                          // You need to pass the formId, userId, and workflowId from the item object as appropriate.
                          updateFormStatus(item.formId, item.formNumber, item.title, item.description, item.effectiveDate, item.revisionNumber, item.status);
                        }
                      }
                    }
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteForm(item.formId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={forms.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
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
            ? "Form deleted successfully."
            : "Error deleting form."}
        </Alert>
      </Snackbar>
    </>
  );
};

const ViewAdminForms = () => {
  return (
    <>
      <Typography variant="h5" sx={{ pb: 4 }}>
        All Forms
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <FormsTable />
    </>
  );
};

export default ViewAdminForms;
