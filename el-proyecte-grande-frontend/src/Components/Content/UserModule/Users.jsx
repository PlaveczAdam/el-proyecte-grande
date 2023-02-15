import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ContentPagination from "../../Shared/Pagination";
import UserDataCell from "./UserDataCell";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { UserContext } from "./UserContextProvider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { minWidth } from "@mui/system";

const Users = () => {
  const context = useContext(UserContext);
  const [rows, setRows] = useState([]);
  const [roles, setRoles] = useState(Object.keys(context.enums.values));

  const handleNewUser = (user) => {
    setRows([...rows, user]);
  };

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("/api/user");
      const users = await response.json();
      setRows(users);
    }
    getUsers();
  }, []);

  const handleUserUpdate = (user) => {
    const newRows = [...rows];
    const indexOfUser = newRows.findIndex((x) => x.id === user.id);
    newRows[indexOfUser] = user;
    setRows(newRows);
  };

  async function handleActivityChange(row) {
    const status = row.isActive ? false : true;
    await fetch(`/api/user/${row.id}/${!row.isActive}`, {
      method: "PUT",
    });
    handleUserUpdate({ ...row, isActive: status });
  }

  function GetRoleName(role) {
    return role.name;
  }

  return (
    <div className="Users">
      <Box sx={{ textAlign: "center" }}>
        <h2>User</h2>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <AddUserModal onNewUser={handleNewUser} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              sx={{minWidth: 300}}
              multiple
              value={roles}
              label="Roles"
              onChange={(e) => setRoles(e.target.value)}
            >
              {Object.entries(context.enums.values).map(([key, value]) => (
                <MenuItem value={key} key={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Roles</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.filter(x=>x.roles.some(y => roles.includes(y.name))).map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <UserDataCell data={row.name}></UserDataCell>
                <UserDataCell data={row.email}></UserDataCell>
                <TableCell sx={{ userSelect: "none" }} align="center">
                  {row.roles.map((x) => GetRoleName(x)).join(", ")}
                </TableCell>

                <TableCell align="center">
                  <EditUserModal user={row} onUserUpdate={handleUserUpdate} />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    onClick={() => handleActivityChange(row)}
                  >
                    <DisabledByDefaultIcon
                      sx={{
                        color: row.isActive ? "red" : "green",
                      }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ContentPagination />
    </div>
  );
};

export default Users;
