import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import SelectRoom from "./SelectRoom";
import "../Reservations.css";

const AddReservationForm = ({ reservation, onCreate }) => {
  const [choosableRooms, setChoosableRooms] = useState([]);
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);

  const [selectedRooms, setSelectedRooms] = useState(reservation.RoomIds);

  const [roomHasBeenAdded, setRoomHasBeenAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [reservationDetails, setReservationDetails] = useState(reservation);

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

  const fetchChoosableRooms = async () => {
    const url = `https://localhost:7027/api/reservation/emptyBetween?startDate=${reservation.StartDate}&endDate=${reservation.EndDate}&hotelId=${reservation.HotelId}`;
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);

      setChoosableRooms(responseData);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };


  const addRoomToSelectedRooms = (id) => {
    setSelectedRooms((current) => [...current, id]);
    setRoomHasBeenAdded(true);
  };

  const addAnotherRoom = () => {
    setRoomHasBeenAdded(false);
  };

  useEffect(() => {
    fetchChoosableRooms();
  }, [reservation.HotelId, reservation.StartDate, reservation.EndDate]);


  return (
    <div>
      {isLoading ? (
        <div className="loader_overlay">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          {roomHasBeenAdded ? (
            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Room has been added successfully</p>
              <Button onClick={addAnotherRoom} variant="outlined" color="info">
                Add another Room
              </Button>
            </Box>
          ) : (
            <SelectRoom
              choosableRooms={choosableRooms}
              onAdd={addRoomToSelectedRooms}
              selectedRooms={selectedRooms}
            />
          )}
        </>
      )}

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


      </FormControl>
    </Box>

      <Box
        mt={2}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => onCreate({ ...reservationDetails }, selectedRooms)}
        >
          Create reservation
        </Button>
      </Box>
    </div>
  );
};

export default AddReservationForm;
