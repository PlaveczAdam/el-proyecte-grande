import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const SelectRoom = ({choosableRooms, onAdd, selectedRooms}) => {
    const [chosenRoom, setChosenRoom] = useState(0);

    const handleRoomSelectChange = (event) => {
        setChosenRoom(event.target.value);
      };

  return (
    <>
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-label">
        Available Rooms for time period:
      </InputLabel>
      {choosableRooms.length > 0 ? (
        <Select
          name="Select a Room"
          value={choosableRooms}
          label="Ingredient"
          onChange={handleRoomSelectChange}
        >
          {choosableRooms
          .filter(r => !selectedRooms.includes(r.id))
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
      >
        Add this Room
      </Button>
      <p>
        Selected Rooms:
        {selectedRooms.map((r) => `${r}, `).slice(0, -1)}
      </p>
    </div>
  </>
  )
}

export default SelectRoom