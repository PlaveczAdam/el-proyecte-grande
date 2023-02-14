import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CircularProgress from "@mui/material/CircularProgress";

import SelectRoom from "./SelectRoom";
import "../Reservations.css";

const AddReservationForm = ({ reservation, onCreate }) => {
  const [choosableRooms, setChoosableRooms] = useState([]);
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);

  const [selectedRooms, setSelectedRooms] = useState([]);

  const [roomHasBeenAdded, setRoomHasBeenAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [reservationDetails, setReservationDetails] = useState(reservation);
  const [reservatorDetails, setReservatorDetails] = useState(
    reservation.Reservator
  );

  const fetchChoosableBoardTypes = async () => {
    const url = `https://localhost:7027/api/enum/BoardType`;
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setIsLoading(false);
      setChoosableBoardTypes(responseData);
    } catch (err) {
      setIsLoading(false);
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
      setIsLoading(false);
      setChoosableRooms(responseData);
    } catch (err) {
      setIsLoading(false);
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

  const isMinLength = (value, min) => {
    let isValid = true;
    isValid = value.trim().length >= min;
    return isValid;
  };

  const isValidNumber = (value) => {
    let isValid = true;
    isValid = value > 0 && value.match(/^[0-9]+$/) !== null;
    return isValid;
  };

  const checkAllFields = () => {
    let areAllValid = true;
    areAllValid =
      selectedRooms.length > 0 &&
      reservationDetails.BoardType &&
      isValidNumber(reservationDetails.Price) &&
      isValidNumber(reservationDetails.ReservedFor) &&
      isMinLength(reservatorDetails.Address.Country, 1) &&
      isMinLength(reservatorDetails.Address.City, 1) &&
      isMinLength(reservatorDetails.Address.AddressLineOne, 1) &&
      isValidNumber(reservatorDetails.Address.PostalCode) &&
      reservationDetails.ReserveDate !== null;

    return areAllValid;
  };

  return (
    <div>
      {isLoading ? (
        <div className="">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Details of Rooms
          </Typography>
          {selectedRooms.length === 0 && (
            <FormHelperText error>Please select at least one room</FormHelperText>
          )}
          {roomHasBeenAdded ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <p>Room has been added successfully</p>
              <Button onClick={addAnotherRoom} variant="outlined" color="info">
                Ok
              </Button>
            </Box>
          ) : (
            <SelectRoom
              choosableRooms={choosableRooms}
              onAdd={addRoomToSelectedRooms}
              selectedRooms={selectedRooms}
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2em",
        }}
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>Board type</InputLabel>
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
            error={!reservationDetails.BoardType}
          >
            {Object.entries(choosableBoardTypes.values).map(([name, value]) => (
              <MenuItem value={name} key={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {!reservationDetails.BoardType && (
            <FormHelperText error>Please select a board type</FormHelperText>
          )}

          <Box
            sx={{
              m: 2,
              minWidth: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <TextField
              number="number"
              required
              label="Price"
              value={reservationDetails.Price}
              min={0}
              onChange={(e) =>
                setReservationDetails({
                  ...reservationDetails,
                  Price: e.target.value,
                })
              }
              error={!isValidNumber(reservationDetails.Price)}
              helperText={
                !isValidNumber(reservationDetails.Price) &&
                "Please enter valid price"
              }
            />
            <TextField
              number="number"
              required
              label="Reserved for"
              value={reservationDetails.ReservedFor}
              min={0}
              onChange={(e) =>
                setReservationDetails({
                  ...reservationDetails,
                  ReservedFor: e.target.value,
                })
              }
              error={!isValidNumber(reservationDetails.ReservedFor)}
              helperText={
                !isValidNumber(reservationDetails.ReservedFor) &&
                "Please enter valid guest number"
              }
            />
          </Box>
        </FormControl>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Details of Reservator
      </Typography>
      <Box
        sx={{
          m: 2,
          minWidth: 200,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <TextField
          required
          label="Name"
          value={reservatorDetails.Name}
          onChange={(e) =>
            setReservatorDetails({ ...reservatorDetails, Name: e.target.value })
          }
          error={!isMinLength(reservatorDetails.Name, 1)}
          helperText={
            !isMinLength(reservatorDetails.Name, 1) && "Name is required"
          }
        />
        <TextField
          required
          label="Country"
          value={reservatorDetails.Address.Country}
          onChange={(e) =>
            setReservatorDetails({
              ...reservatorDetails,
              Address: {
                ...reservatorDetails.Address,
                Country: e.target.value,
              },
            })
          }
          error={!isMinLength(reservatorDetails.Address.Country, 1)}
          helperText={
            !isMinLength(reservatorDetails.Address.Country, 1) &&
            "Countryis required"
          }
        />
        <TextField
          label="Region"
          value={reservatorDetails.Address.Region}
          onChange={(e) =>
            setReservatorDetails({
              ...reservatorDetails,
              Address: {
                ...reservatorDetails.Address,
                Region: e.target.value,
              },
            })
          }
        />
        <TextField
          required
          label="City"
          value={reservatorDetails.Address.City}
          onChange={(e) =>
            setReservatorDetails({
              ...reservatorDetails,
              Address: {
                ...reservatorDetails.Address,
                City: e.target.value,
              },
            })
          }
          error={!isMinLength(reservatorDetails.Address.City, 1)}
          helperText={
            !isMinLength(reservatorDetails.Address.City, 1) &&
            "City is required"
          }
        />
        <TextField
          required
          label="Address Line One"
          value={reservatorDetails.Address.AddressLineOne}
          onChange={(e) =>
            setReservatorDetails({
              ...reservatorDetails,
              Address: {
                ...reservatorDetails.Address,
                AddressLineOne: e.target.value,
              },
            })
          }
          error={!isMinLength(reservatorDetails.Address.AddressLineOne, 1)}
          helperText={
            !isMinLength(reservatorDetails.Address.AddressLineOne, 1) &&
            "Please enter a valid address"
          }
        />
        <TextField
          label="Address Line Two"
          value={reservatorDetails.Address.AddressLineTwo}
          onChange={(e) =>
            setReservatorDetails({
              ...reservatorDetails,
              Address: {
                ...reservatorDetails.Address,
                AddressLineTwo: e.target.value,
              },
            })
          }
        />
        <TextField
          required
          label="Postal Code"
          value={reservatorDetails.Address.PostalCode}
          onChange={(e) =>
            setReservatorDetails({
              ...reservatorDetails,
              Address: {
                ...reservatorDetails.Address,
                PostalCode: e.target.value,
              },
            })
          }
          error={!isValidNumber(reservatorDetails.Address.PostalCode)}
          helperText={
            !isValidNumber(reservatorDetails.Address.PostalCode) &&
            "Please enter a valid Postal Code"
          }
        />
        <Box
          mt={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Reservation"
              inputFormat="YYYY/MM/DD"
              value={reservationDetails.ReserveDate}
              onChange={(newValue) =>
                setReservationDetails({
                  ...reservationDetails,
                  ReserveDate: newValue,
                })
              }
              renderInput={(params) => <TextField {...params} />}
              error={reservationDetails.ReserveDate}
              helperText={
                !reservationDetails.ReserveDate &&
                "Please enter a valid Postal Code"
              }
            />
          </LocalizationProvider>
          {!reservationDetails.ReserveDate && (
            <FormHelperText error>Date of reservation is required</FormHelperText>
          )}
        </Box>
      </Box>

      <Box
        mt={3}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            onCreate({
              ...reservationDetails,
              RoomIds: selectedRooms,
              Reservator: { ...reservatorDetails },
            })
          }
          disabled={checkAllFields() === false}
        >
          Create reservation
        </Button>
      </Box>
    </div>
  );
};
export default AddReservationForm;
