import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SelectRoom = ({ choosableRooms, onAdd, selectedRooms }) => {
  const [chosenRoom, setChosenRoom] = useState("");

  const handleRoomSelectChange = (event) => {
    setChosenRoom(event.target.value);
  };

  return (
    <Box
      mt={2}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">
          Available Rooms for time period:
        </InputLabel>
        {choosableRooms.length > 0 ? (
          <Select
            name="Select a Room"
            value={chosenRoom}
            label="Ingredient"
            onChange={handleRoomSelectChange}
          >
            {choosableRooms
              .filter((r) => !selectedRooms.includes(r.id))
              .map((h) => (
                <MenuItem key={h.id} value={h.id}>
                  {`${h.floor} / ${h.doorNo}`}
                </MenuItem>
              ))}
          </Select>
        ) : (
          "There are no Rooms to choose from"
        )}
      </FormControl>

      <div>
        <Button
          onClick={() => onAdd(chosenRoom)}
          variant="outlined"
          color="success"
          disabled={chosenRoom === ""}
        >
          Add this Room
        </Button>
        <p>
          Selected Room(s):
          {selectedRooms.map((r) => `${r}, `)}
        </p>
      </div>
    </Box>
  );
};

export default SelectRoom;
