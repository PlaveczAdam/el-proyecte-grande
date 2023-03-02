import React, { useEffect, useState, useContext } from "react";

import ContentPagination from "../../Shared/Pagination";
import RoomTypes from "./RoomTypes";
import Accessories from "./Accessories";
import AddRoomModal from "./AddRoomModal";
import EditRoomModal from "./EditRoomModal";
import AlertMessage from "../../Shared/AlertMessage";

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
import Switch from "@mui/material/Switch";
import Check from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AuthContext } from "../../Shared/AuthContext";

const Rooms = () => {
  const auth = useContext(AuthContext);
  const [hotels, setHotels] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [roomTypes, setRoomTypes] = useState(null);
  const [accessories, setAccessories] = useState(null);
  const [enums, setEnums] = useState();

  const [errorText, setErrorText] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const emptyFilters = {
    hotelId: "",
    status: "",
    date: null,
    roomTypeId: "",
    maxPrice: "",
    accessible: "",
  };

  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {
    async function getData(dataPath) {
      try {
        const response = await fetch(`/api/${dataPath}`);
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} - ${response.statusText}`;
          console.log(errorMessage);
          setErrorText(errorMessage);
          return;
        }
        const responseBody = await response.json();
        //console.log(responseBody);
        switch (dataPath) {
          case "hotel":
            setHotels(responseBody);
            break;
          case "room":
            setRooms(responseBody);
            break;
          case "room/roomtype":
            setRoomTypes(responseBody);
            break;
          case "room/accessory":
            setAccessories(responseBody);
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
        setErrorText(`Failed to get ${dataPath}.`);
      }
    }

    async function getEnum(enumName) {
      try {
        const response = await fetch(`/api/enum/${enumName}`);
        const responseEnum = await response.json();
        return responseEnum;
      } catch (err) {
        console.log(err);
        setErrorText(`Failed to get ${enumName} enum.`);
      }
    }

    async function getEnums() {
      const RoomStatus = await getEnum("RoomStatus");
      const RoomQuality = await getEnum("RoomQuality");
      setEnums({ RoomStatus, RoomQuality });
    }

    getEnums();
    getData("hotel");
    getData("room");
    getData("room/roomtype");
    getData("room/accessory");
  }, []);

  useEffect(() => {
    async function getFilteredRooms() {
      try {
        setErrorText("");
        const filterDateString = filters.date === null ? "" : filters.date;
        const filterAddress =
          "/api/room/filter?hotelId=" +
          filters.hotelId +
          "&status=" +
          filters.status +
          "&date=" +
          filterDateString +
          "&roomTypeId=" +
          filters.roomTypeId +
          "&maxPrice=" +
          filters.maxPrice +
          "&accessible=" +
          filters.accessible;
        const response = await fetch(filterAddress);
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} - ${response.statusText}`;
          console.log(errorMessage);
          setErrorText(errorMessage);
          return;
        }
        const responseBody = await response.json();
        setRooms(responseBody);
        //console.log(responseBody);
      } catch (err) {
        console.log(err);
        setErrorText("Failed to get filtered Rooms.");
      }
    }
    getFilteredRooms();
  }, [filters]);

  const handleNewRoom = (room) => {
    setRooms([...rooms, room]);
  };

  const handleRoomUpdate = (room) => {
    const newRooms = [...rooms];
    const indexOfRoom = newRooms.findIndex((r) => r.id === room.id);
    newRooms[indexOfRoom] = room;
    setRooms(newRooms);
  };

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

  function handleFiltersChange(e) {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleFiltersChangeManual(name, value) {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleFiltersReset() {
    setFilters(emptyFilters);
    setTextFilter("");
  }

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <h2>Hotel Rooms</h2>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={12}>
            {errorText && <AlertMessage type="error" message={errorText} />}
          </Grid>
          <Grid item xs={12} md={3}>
            {auth.user.roles.some((el) =>
              ["Admin", "Manager"].includes(el)
            ) && (
              <AddRoomModal
                onNewRoom={handleNewRoom}
                hotels={hotels}
                roomTypes={roomTypes}
                enums={enums}
              />
            )}

            <Button onClick={handleFiltersReset}>Reset filters</Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="RoomHotelSelect">Hotels</InputLabel>
              <Select
                labelId="RoomHotelSelect"
                id="RoomHotelSelect"
                name="hotelId"
                value={filters.hotelId}
                onChange={handleFiltersChange}
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
              fullWidth
              id="outlined-basic"
              label="Filter room number"
              variant="outlined"
              value={textFilter}
              onChange={(e) => setTextFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="filter1">Room Status</InputLabel>
                  <Select
                    id="filter1"
                    name="status"
                    value={filters.status}
                    label="Room Status"
                    onChange={handleFiltersChange}
                  >
                    {" "}
                    <MenuItem value={""}>Not filtered</MenuItem>
                    {enums
                      ? Object.entries(enums.RoomStatus.values).map(
                          ([key, value]) => (
                            <MenuItem value={value} key={value}>
                              {key}
                            </MenuItem>
                          )
                        )
                      : ""}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    id="filter2"
                    label="Free on this Date"
                    inputFormat="YYYY/MM/DD"
                    value={filters.date}
                    onChange={(newValue) =>
                      handleFiltersChangeManual("date", newValue)
                    }
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="filter3">Room Type</InputLabel>
                  <Select
                    id="filter3"
                    label="Room Type"
                    name="roomTypeId"
                    value={filters.roomTypeId}
                    onChange={handleFiltersChange}
                  >
                    <MenuItem value={""}>Not filtered</MenuItem>
                    {roomTypes
                      ? roomTypes.map((roomType) => (
                          <MenuItem value={roomType.id} key={roomType.id}>
                            {roomType.name}
                          </MenuItem>
                        ))
                      : ""}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="filter4"
                  label="Maximum Price"
                  variant="outlined"
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFiltersChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="filter5">Accessible Room</InputLabel>
                  <Select
                    id="filter5"
                    label="Accessible Room"
                    name="accessible"
                    value={filters.accessible}
                    onChange={handleFiltersChange}
                  >
                    <MenuItem value={""}>Not filtered</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              {filters.hotelId === "" ? (
                <TableCell align="center">Hotel</TableCell>
              ) : (
                ""
              )}
              <TableCell align="center">Room number</TableCell>
              <TableCell align="center">Room Type</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Accessible</TableCell>
              {auth.user.roles.some((el) =>
                ["Admin", "Manager"].includes(el)
              ) && (
                <>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Status</TableCell>
                </>
              )}
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
                    {filters.hotelId === "" ? (
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
                      {roomTypes
                        ? getRoomTypefromId(
                            room.roomTypeId
                          ).price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "EUR",
                          })
                        : "..."}
                    </TableCell>

                    <TableCell align="center">
                      {room.accessible ? <Check color="primary" /> : ""}
                    </TableCell>

                    {auth.user.roles.some((el) =>
                      ["Admin", "Manager"].includes(el)
                    ) && (
                      <>
                        <TableCell align="center">
                          <EditRoomModal
                            room={room}
                            hotels={hotels}
                            roomTypes={roomTypes}
                            enums={enums}
                            onRoomUpdate={handleRoomUpdate}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip
                            title={
                              enums
                                ? Object.keys(enums.RoomStatus.values)[
                                    room.status
                                  ]
                                : "..."
                            }
                          >
                            <Switch
                              onClick={() => handleRoomStatusChange(room)}
                              disabled={room.status === null}
                              checked={room.status ? true : false}
                            />
                          </Tooltip>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow sx={{ textAlign: "center" }}>
                <TableCell colSpan="100%" align="center">
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
