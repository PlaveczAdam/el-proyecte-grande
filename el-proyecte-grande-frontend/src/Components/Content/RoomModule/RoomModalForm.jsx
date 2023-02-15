import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";

const RoomModalForm = (props) => {
  const [room, setRoom] = useState(props.room);
  const [hotels, setHotels] = useState(null);
  const [roomTypes, setRoomTypes] = useState(null);

  const [enums, setEnums] = useState(null);
  useEffect(() => {
    async function getHotels() {
      const response = await fetch(`/api/hotel`);
      const responseBody = await response.json();
      setHotels(responseBody);
    }

    async function getRoomTypes() {
      const response = await fetch(`/api/room/roomtype`);
      const responseBody = await response.json();
      setRoomTypes(responseBody);
    }

    async function getEnums() {
      const roomStatusResponse = await fetch("/api/enum/RoomStatus");
      const roomStatus = await roomStatusResponse.json();
      const roomQualityResponse = await fetch("/api/enum/RoomQuality");
      const roomQuality = await roomQualityResponse.json();
      setEnums({ roomStatus, roomQuality });
    }

    getHotels();
    getRoomTypes();
    getEnums();
  }, []);

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{ padding: 4 }}
    >
      <Box typography="h4" display="flex" gap={4}>
        {props.title}
        <Button
          sx={{ marginLeft: "auto" }}
          onClick={() => props.onSave({ ...room })}
        >
          Save
        </Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </Box>

      <TextField
        type="number"
        required
        label="Floor"
        value={room.floor}
        min={0}
        onChange={(e) => setRoom({ ...room, floor: e.target.value })}
      />

      <TextField
        type="number"
        required
        label="Door number"
        value={room.doorNo}
        onChange={(e) => setRoom({ ...room, doorNo: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={room.accessible} />}
          label="Accessible"
          onChange={(e) => setRoom({ ...room, accessible: e.target.checked })}
        />
      </FormGroup>

      <FormControl fullWidth>
        <InputLabel id="roomStatusSelect">Room Status</InputLabel>
        <Select
          id="roomStatusSelect"
          value={room.status}
          label="Room Status"
          onChange={(e) => setRoom({ ...room, status: e.target.value })}
        >
          {enums ? (
            Object.entries(enums.roomStatus.values).map(([key, value]) => (
              <MenuItem value={value} key={value}>
                {key}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={room.status} key={room.status}>
              {room.status}
            </MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="roomHotelSelect">Hotel</InputLabel>
        <Select
          id="roomHotelSelect"
          value={room.hotelId}
          label="Hotel"
          onChange={(e) => setRoom({ ...room, hotelId: e.target.value })}
        >
          {hotels ? (
            hotels.map((hotel) => (
              <MenuItem value={hotel.id} key={hotel.id}>
                {hotel.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={room.hotelId}>Loading...</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="roomTypeSelect">Room Type</InputLabel>
        <Select
          id="roomTypeSelect"
          value={room.roomTypeId}
          label="Room Type"
          onChange={(e) => setRoom({ ...room, roomTypeId: e.target.value })}
        >
          {roomTypes ? (
            roomTypes.map((roomType) => (
              <MenuItem value={roomType.id} key={roomType.id}>
                {roomType.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={room.roomTypeId}>{room.roomTypeId}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoomModalForm;
