import React, { useState } from "react";

import ContentPagination from "../../Shared/Pagination";
import AddRoomTypeModal from "./AddRoomTypeModal";
import EditRoomTypeModal from "./EditRoomTypeModal";

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

const RoomTypes = ({ enums, roomTypes, setRoomTypes }) => {
  const [textFilter, setTextFilter] = useState("");

  const handleNewRoomType = (roomType) => {
    setRoomTypes([...roomTypes, roomType]);
  };

  const handleRoomTypeUpdate = (roomType) => {
    const newRoomTypes = [...roomTypes];
    const indexOfRoomType = newRoomTypes.findIndex((r) => r.id === roomType.id);
    newRoomTypes[indexOfRoomType] = roomType;
    setRoomTypes(newRoomTypes);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <h2>Room Types</h2>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={3}>
            <AddRoomTypeModal onNewRoomType={handleNewRoomType} />
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
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Comfort level</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomTypes ? (
              roomTypes
                .filter((rt) =>
                  rt.name.toLowerCase().includes(textFilter.toLowerCase())
                )
                .map((roomType) => (
                  <TableRow
                    key={roomType.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{roomType.id}</TableCell>

                    <TableCell align="center">{roomType.name}</TableCell>

                    <TableCell align="center">
                      {roomType.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>

                    <TableCell align="center">
                      {roomTypes && enums
                        ? Object.keys(enums.roomQuality.values)[
                            roomType.roomQuality
                          ]
                        : "..."}
                    </TableCell>

                    <TableCell align="center">
                      <EditRoomTypeModal
                        roomType={roomType}
                        onRoomTypeUpdate={handleRoomTypeUpdate}
                      />
                    </TableCell>
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

export default RoomTypes;
