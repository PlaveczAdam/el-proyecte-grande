import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const RoomTypeModalForm = (props) => {
  const [roomType, setRoomType] = useState(props.roomType);
  const [enums, setEnums] = useState(null);

  useEffect(() => {
    async function getEnums() {
      const roomQualityResponse = await fetch("/api/enum/RoomQuality");
      const roomQuality = await roomQualityResponse.json();
      setEnums({ roomQuality });
    }

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
          onClick={() => props.onSave({ ...roomType })}
        >
          Save
        </Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </Box>

      <TextField
        type="text"
        required
        label="Name"
        value={roomType.name}
        onChange={(e) => setRoomType({ ...roomType, name: e.target.value })}
      />

      <TextField
        type="number"
        required
        label="Price"
        value={roomType.price}
        onChange={(e) => setRoomType({ ...roomType, price: e.target.value })}
      />

      <FormControl fullWidth>
        <InputLabel id="roomQualitySelect">Room Quality</InputLabel>
        <Select
          id="roomQualitySelect"
          value={roomType.roomQuality}
          label="Room Quality"
          onChange={(e) =>
            setRoomType({ ...roomType, roomQuality: e.target.value })
          }
        >
          {enums ? (
            Object.entries(enums.roomQuality.values).map(([key, value]) => (
              <MenuItem value={value} key={value}>
                {key}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={roomType.roomQuality} key={roomType.roomQuality}>
              {roomType.roomQuality}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoomTypeModalForm;
