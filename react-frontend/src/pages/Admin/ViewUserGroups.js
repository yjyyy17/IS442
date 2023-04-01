import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideNavigation from "../../components/UserAccountComponents/SideNavigationAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ViewUserGroups = () => {
  const [usergroups, setUsergroups] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [reloadUserGroups, setReloadUserGroups] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/userGroup`)
      .then((res) => {
        console.log(res.data);
        res.data.forEach((usergroup, index) => {
          if (usergroup.status == "active") {
            setUsergroups((prevArray) => [...prevArray, usergroup]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadUserGroups]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const newUserGroup = () =>{
    navigate(`../admin/create_usergroup`);
  }
  const deactivateUserGroup = (userGroup) => {
    axios
      .put(
        `http://localhost:8080/api/usergroup/delete/${userGroup.userGroupId}`,
        {
          assignedUsers: userGroup.assignedUsers,
          status: "inactive",
        }
      )
      .then((res) => {
        console.log(res.data);
        setReloadUserGroups(!reloadUserGroups);
        alert(`User Group successfully deleted!`);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <SideNavigation
      content={
        <>
          <Typography variant="h5" sx={{ pb: 4 }}>
            All User Groups
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <div className="d-flex justify-content-end mb-4">
            <Button variant="contained" color="warning"
            onClick={()=>newUserGroup()}
            >Create</Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Group ID</TableCell>
                  <TableCell>Assigned Users</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usergroups
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    // if (item.status === "Active") {
                    return (
                      <TableRow
                        key={item.userGroupId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{item.userGroupId}</TableCell>
                        <TableCell>
                          <List>
                            {item.assignedUsers.map((user, i) => {
                              return (
                                <ListItem key={i}>
                                  <Chip
                                    sx={{ mr: 1 }}
                                    label={user.userType}
                                    color={
                                      user.userType == "Vendor"
                                        ? "primary"
                                        : user.userType == "Admin"
                                        ? "success"
                                        : "secondary"
                                    }
                                  />
                                  {user.name}
                                </ListItem>
                              );
                            })}
                          </List>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deactivateUserGroup(item)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                    // }
                  })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={usergroups.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </>
      }
    />
  );
};

export default ViewUserGroups;
