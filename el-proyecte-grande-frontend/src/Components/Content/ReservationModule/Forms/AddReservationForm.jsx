import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import "../Reservations.css";
import SelectRoom from "./SelectRoom";
import AddOtherReservationFormFields from "./AddOtherReservationFormFields";

const AddReservationForm = ({ reservation, onAddRoom, onCreate }) => {
  const [choosableRooms, setChoosableRooms] = useState([]);
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);

  const [selectedRooms, setSelectedRooms] = useState(reservation.RoomIds);

  const [roomHasBeenAdded, setRoomHasBeenAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    onAddRoom(id);
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

      <AddOtherReservationFormFields
        reservation={reservation}
        onAdd={onCreate}
      />

      <Box
        mt={2}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* <Button onClick={onCreate} variant="contained" color="success">
          Create Reservation
        </Button> */}
      </Box>
    </div>
  );
};

export default AddReservationForm;
