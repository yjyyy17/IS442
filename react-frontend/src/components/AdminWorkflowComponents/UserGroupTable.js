import React from "react";
import { useEffect, useState } from "react";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
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
import TablePagination from "@mui/material/TablePagination";

const UserGroupTable = (props) => {
  const [admins, setAdmin] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [reloadAdmins, setReloadAdmins] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "success" });

  const navigate = useNavigate();
  useEffect(() => {
    // setUsers(props.users);
    axios
      .get(`http://localhost:8080/api/admin`)
      .then((res) => {
        console.log(res.data);
        var adminList = [];
        res.data.forEach((admin, index) => {
          if (admin.status == "active") {
            // console.log(admin.name, " is active")
            adminList.push(admin);
          }
        });
        setAdmin([...adminList]);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadAdmins]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const newAccount = () => {
    navigate(`../admin/create_usergroup`, {
      state: { userType: props.userType },
    });
  };

  const editAdmin = (id) => {
    navigate(`../admin/edit_account?id=${id}`, {
      state: { userType: props.userType },
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  //hard delete
  // const deleteAdmin = (id) => {
  //   axios
  //     .delete(`http://localhost:8080/api/admin/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("Admin successfully deleted");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const deactivateAdmin = (admin) => {
    axios
      .put(`http://localhost:8080/api/user/${admin.userId}`, {
        name: admin.name,
        email: admin.email,
        phoneNo: admin.phoneNo,
        password: admin.password,
        address: admin.address,
        industry: admin.industry,
        status: "inactive",
      })
      .then((res) => {
        console.log(res.data);
        setReloadAdmins(!reloadAdmins);
        setSnackbar({ open: true, type: "success" });
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({ open: true, type: "error" });
      });
  };

  return (
    <>
      {console.log(props.users)}
      <Typography variant="h5" sx={{ mb: 2 }}>
        User Groups{" "}
      </Typography>
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
            {users
              // .filter(
              //   (row) =>
              //     !searchedVal.length ||
              //     row.name
              //       .toString()
              //       .toLowerCase()
              //       .includes(searchedVal.toString().toLowerCase()) ||
              //     row.email
              //       .toString()
              //       .toLowerCase()
              //       .includes(searchedVal.toString().toLowerCase())
              // )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                // if (item.status === "active") {
                return (
                  <TableRow
                    key={item.userId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.userType}</TableCell>
                    <TableCell>{item.phoneNo}</TableCell>
                    <TableCell>{item.phoneNo}</TableCell>
                    {/* <TableCell>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#93C019" }}
                        onClick={() => editAdmin(item.userId)}
                      >
                        Edit
                      </Button>
                    </TableCell> */}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deactivateAdmin(item)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
                // }
                // return null;
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={users.length}
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
            ? "User Group successfully deleted."
            : "Error deleting user group."}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserGroupTable;
