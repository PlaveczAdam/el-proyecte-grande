import React, { useState, useContext } from "react";

import ContentPagination from "../../Shared/Pagination";
import AddAccessoryModal from "./AddAccessoryModal";
import EditAccessoryModal from "./EditAccessoryModal";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../Shared/AuthContext";

const Accessories = ({ accessories, setAccessories, roomTypes }) => {
  const auth = useContext(AuthContext);
  const [textFilter, setTextFilter] = useState("");

  const handleNewAccessory = (accessory) => {
    setAccessories([...accessories, accessory]);
  };

  const handleAccessoryUpdate = (accessory) => {
    const newAccessories = [...accessories];
    const indexOfAccessory = newAccessories.findIndex(
      (r) => r.id === accessory.id
    );
    newAccessories[indexOfAccessory] = accessory;
    setAccessories(newAccessories);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <h2>Room Accessories</h2>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={3}>
            {auth.user.roles.some((el) =>
              ["Admin", "Manager"].includes(el)
            ) && (
              <AddAccessoryModal
                roomTypes={roomTypes}
                onAccessory={handleNewAccessory}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Filter name"
              variant="outlined"
              onChange={(e) => setTextFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Room Type</TableCell>
              {auth.user.roles.some((el) =>
                ["Admin", "Manager"].includes(el)
              ) && <TableCell align="center">Edit</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {accessories ? (
              accessories
                .filter((a) =>
                  a.name.toLowerCase().includes(textFilter.toLowerCase())
                )
                .map((accessory) => (
                  <TableRow
                    key={accessory.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{accessory.id}</TableCell>

                    <TableCell align="center">{accessory.name}</TableCell>

                    <TableCell align="center">{accessory.quantity}</TableCell>

                    <TableCell align="center">
                      {roomTypes
                        ? roomTypes.find((rt) => rt.id === accessory.roomTypeId)
                            .name
                        : accessory.roomTypeId}
                    </TableCell>
                    {auth.user.roles.some((el) =>
                      ["Admin", "Manager"].includes(el)
                    ) && (
                      <TableCell align="center">
                        <EditAccessoryModal
                          accessory={accessory}
                          roomTypes={roomTypes}
                          onAccessoryUpdate={handleAccessoryUpdate}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ContentPagination />
    </>
  );
};

export default Accessories;
