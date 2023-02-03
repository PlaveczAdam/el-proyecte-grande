import React, { useEffect, useState } from "react";

import ContentPagination from "../../Shared/Pagination";
import RoomTypes from "./RoomTypes";
import Accessories from "./Accessories";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";

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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Check from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Rooms = () => {
  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [roomTypes, setRoomTypes] = useState(null);
  const [accessories, setAccessories] = useState(null);

  const [enums, setEnums] = useState(null);

  const [hotelFilter, setHotelFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    async function getHotels() {
      const response = await fetch(`/api/hotel`);
      const responseBody = await response.json();
      setHotels(responseBody);
      //console.log(responseBody);
    }

    async function getRooms() {
      const response = await fetch(`/api/room`);
      const responseBody = await response.json();
      setRooms(responseBody);
      //console.log(responseBody);
    }

    async function getRoomTypes() {
      const response = await fetch(`/api/room/roomtype`);
      const responseBody = await response.json();
      setRoomTypes(responseBody);
      //console.log(responseBody);
    }

    async function getAccessories() {
      const response = await fetch(`/api/room/accessory`);
      const responseBody = await response.json();
      setAccessories(responseBody);
      //console.log(responseBody);
    }

    async function getEnums() {
      const roomStatusResponse = await fetch("/api/enum/RoomStatus");
      const roomStatus = await roomStatusResponse.json();
      const roomQualityResponse = await fetch("/api/enum/RoomQuality");
      const roomQuality = await roomQualityResponse.json();
      setEnums({ roomStatus, roomQuality });
    }

    getHotels();
    getRooms();
    getRoomTypes();
    getAccessories();
    getEnums();
  }, []);

  useEffect(() => {
    async function getFilteredRooms() {
      const response = await fetch(`/api/room/filter?hotelId=${hotelFilter}`);
      const responseBody = await response.json();
      setRooms(responseBody);
      //console.log(responseBody);
    }
    getFilteredRooms();
  }, [hotelFilter]);

  const handleNewRoom = (room) => {
    setRooms([...rooms, room]);
  };

  const handleRoomUpdate = (room) => {
    const newRooms = [...rooms];
    const indexOfRoom = newRooms.findIndex((r) => r.id === room.id);
    newRooms[indexOfRoom] = room;
    setRooms(newRooms);
  };

  async function handleHotelSelectChange(e) {
    console.log(e.target.value);
    setHotelFilter(e.target.value);
  }

  async function handleRoomStatusChange(room) {
    const newStatus =
      room.status === enums.roomStatus.values.InUse
        ? enums.roomStatus.values.OutOfService
        : enums.roomStatus.values.InUse;
    await fetch(`/api/room/status/${room.id}?status=${newStatus}`, {
      method: "PUT",
    });
    handleRoomUpdate({ ...room, status: newStatus });
  }

  function getHotelfromId(id) {
    const hotel = hotels.find((h) => h.id === id);
    return hotel;
  }

  function getRoomTypefromId(id) {
    const roomType = roomTypes.find((rt) => rt.id === id);
    return roomType;
  }

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <h2>Hotel Rooms</h2>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={3}>
            <AddRoomModal onNewRoom={handleNewRoom} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="RoomHotelSelect">Hotels</InputLabel>
              <Select
                labelId="RoomHotelSelect"
                id="RoomHotelSelect"
                value={hotelFilter}
                onChange={handleHotelSelectChange}
                label="Hotels"
              >
                <MenuItem value={""}>Select a hotel...</MenuItem>
                {hotels ? (
                  hotels.map((hotel) => (
                    <MenuItem key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={""}>Loading...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Filter room number"
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
              {hotelFilter === "" ? (
                <TableCell align="center">Hotel</TableCell>
              ) : (
                ""
              )}
              <TableCell align="center">Room number</TableCell>
              <TableCell align="center">Room Type</TableCell>
              <TableCell align="center">Comfort</TableCell>
              <TableCell align="center">Accessible</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms ? (
              rooms
                .filter((r) =>
                  r.doorNo.toString().includes(textFilter.toLowerCase())
                )
                .map((room) => (
                  <TableRow
                    key={room.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{room.id}</TableCell>
                    {hotelFilter === "" ? (
                      <TableCell align="center">
                        {hotels
                          ? getHotelfromId(room.hotelId).name
                          : room.hotelId}
                      </TableCell>
                    ) : (
                      ""
                    )}

                    <TableCell align="center">{room.doorNo}</TableCell>

                    <TableCell align="center">
                      {roomTypes && enums
                        ? getRoomTypefromId(room.roomTypeId).name
                        : room.roomTypeId}
                    </TableCell>

                    <TableCell align="center">
                      {roomTypes && enums
                        ? Object.keys(enums.roomQuality.values)[
                            getRoomTypefromId(room.roomTypeId).roomQuality
                          ]
                        : "..."}
                    </TableCell>

                    <TableCell align="center">
                      {room.accessible ? <Check color="primary" /> : ""}
                    </TableCell>

                    <TableCell align="center">
                      <EditRoomModal
                        room={room}
                        onRoomUpdate={handleRoomUpdate}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              onClick={() => handleRoomStatusChange(room)}
                              disabled={room.status === null}
                              checked={room.status ? true : false}
                            />
                          }
                          label={
                            enums
                              ? Object.keys(enums.roomStatus.values)[
                                  room.status
                                ]
                              : "..."
                          }
                        />
                      </FormGroup>
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
      <RoomTypes
        enums={enums}
        roomTypes={roomTypes}
        setRoomTypes={setRoomTypes}
      />
      <Accessories
        accessories={accessories}
        setAccessories={setAccessories}
        roomTypes={roomTypes}
      />
    </>
  );
};

export default Rooms;
