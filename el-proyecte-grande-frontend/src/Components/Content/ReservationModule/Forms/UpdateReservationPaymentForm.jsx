import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const UpdateReservationPaymentForm = () => {
  const [newBoardType, setNewBoardType] = useState("");
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);

  const fetchChoosableBoardTypes = async () => {
    const url = `/api/enum/BoardType`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setChoosableBoardTypes(responseData);
    } catch (err) {}
  };

  useEffect(() => {
    fetchChoosableBoardTypes();
  }, []);

  return (
    <div>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Set Payment of Reservation
      </Typography>

      <FormControl
        sx={{
          m: 1,
          minWidth: 150,
        }}
      >
        <InputLabel>Board type</InputLabel>
        <Select
          value={newBoardType}
          onChange={(event) => setNewBoardType(event.target.value)}
          error={!newBoardType}
        >
          {Object.entries(choosableBoardTypes.values).map(([name, value]) => (
            <MenuItem value={name} key={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
        {!newBoardType && (
          <FormHelperText error>Please select a board type</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default UpdateReservationPaymentForm;
