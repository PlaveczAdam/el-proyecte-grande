import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import "../Reservations.css";
import SelectRoom from "./SelectRoom";

const AddReservationForm = ({
  chosenHotel,
  chosenStartDate,
  chosenEndDate,
}) => {
  const [choosableRooms, setChoosableRooms] = useState([]);
  const [chosenRoom, setChosenRoom] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);

  const [roomHasBeenAdded, setRoomHasBeenAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChoosableRooms = async () => {
    const url = `https://localhost:7027/api/reservation/emptyBetween?startDate=${chosenStartDate}&endDate=${chosenEndDate}&hotelId=${chosenHotel}`;
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

  const addReservation = () => {
    console.log(chosenRoom);
  };

  const addRoomToSelectedRooms = (id) => {
    console.log(id);
    setSelectedRooms((current) => [...current, id]);
    setRoomHasBeenAdded(true);
    setChosenRoom(null);
  };

  const addAnotherRoom = () => {
    setRoomHasBeenAdded(false);
  };

  const handleRoomSelectChange = (event) => {
    setChosenRoom(event.target.value);
  };

  useEffect(() => {
    fetchChoosableRooms();
  }, [chosenHotel, chosenStartDate, chosenEndDate]);

  useEffect(() => {
    fetchChoosableBoardTypes();
  }, []);

  useEffect(() => {
    console.log(selectedRooms);
  }, [selectedRooms, chosenRoom]);

  return (
    <div>
      {isLoading ? (
        <div className="loader_overlay">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          {roomHasBeenAdded ? (
            <>
              <Button onClick={addAnotherRoom} variant="outlined" color="info">
                Add another Room
              </Button>
            </>
          ) : (
            <SelectRoom
              choosableRooms={choosableRooms}
              onAdd={addRoomToSelectedRooms}
              selectedRooms={selectedRooms}
            />
          )}
        </>
      )}
      <br />
      <br />

      <Button onClick={addReservation} variant="contained" color="success">
        Create Reservation
      </Button>
    </div>
  );
};

export default AddReservationForm;
