import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const AccessoryModalForm = (props) => {
  const [accessory, setAccessory] = useState(props.accessory);
  const [validAccessory, setValidAccessory] = useState(false);
  const roomTypes = props.roomTypes;

  useEffect(() => {
    function validateAccessory() {
      if (
        accessory.name.length < 1 ||
        accessory.quantity.length < 1 ||
        accessory.roomTypeId === ""
      ) {
        setValidAccessory(false);
        return;
      }
      setValidAccessory(true);
    }
    validateAccessory();
  }, [accessory]);

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
          onClick={() => props.onSave({ ...accessory })}
          disabled={!validAccessory}
        >
          Save
        </Button>
        <Button
          onClick={props.onCancel}
          sx={{
            position: "relative",
          }}
        >
          <HighlightOffIcon sx={{ color: "brown", fontSize: "2rem" }} />
        </Button>
      </Box>

      <TextField
        type="text"
        required
        label="Name"
        value={accessory.name}
        onChange={(e) => setAccessory({ ...accessory, name: e.target.value })}
      />

      <TextField
        type="number"
        required
        label="Quantity"
        value={accessory.quantity}
        onChange={(e) =>
          setAccessory({ ...accessory, quantity: e.target.value })
        }
      />

      <FormControl fullWidth>
        <InputLabel id="roomStatusSelect">Room Type</InputLabel>
        <Select
          id="roomStatusSelect"
          value={accessory.roomTypeId}
          label="Room Type"
          onChange={(e) =>
            setAccessory({ ...accessory, roomTypeId: e.target.value })
          }
        >
          {roomTypes ? (
            roomTypes.map((roomType) => (
              <MenuItem value={roomType.id} key={roomType.id}>
                {roomType.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={accessory.roomTypeId}>
              {accessory.roomTypeId}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default AccessoryModalForm;
