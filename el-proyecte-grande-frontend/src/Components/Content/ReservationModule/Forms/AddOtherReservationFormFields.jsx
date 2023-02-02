import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "../Reservations.css";

const AddOtherReservationFormFields = ({ reservation, onAdd }) => {
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);
  const [reservationDetails, setReservationDetails] = useState(reservation);

  const [isLoading, setIsLoading] = useState(false);

  const fetchChoosableBoardTypes = async () => {
    const url = `https://localhost:7027/api/enum/BoardType`;
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);

      setChoosableBoardTypes(responseData);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChoosableBoardTypes();
  }, []);

  return (
    <Box
      mt={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Board types</InputLabel>

        <Select
          name="Select a Board Type"
          value={reservationDetails.BoardType}
          label="Hotel"
          onChange={(e) =>
            setReservationDetails({
              ...reservationDetails,
              BoardType: e.target.value,
            })
          }
        >
          {Object.entries(choosableBoardTypes.values).map(([name, value]) => (
            <MenuItem value={name} key={value}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          color="success"
          onClick={() => onAdd({ ...reservationDetails })}
        >
          Add reservation
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddOtherReservationFormFields;
