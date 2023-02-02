import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
          {roomHasBeenAdded ? (
            <>
              <p>Room has been added successfully</p>
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
          >
            {Object.entries(choosableBoardTypes.values).map(([name, value]) => (
              <MenuItem value={name} key={value}>
                {name}
              </MenuItem>
            ))}
          </Select>

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
            />
          </Box>
        </FormControl>
      </Box>

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
        <Typography variant="h6" gutterBottom>
          Details of Reservator
        </Typography>
        <TextField
          required
          label="Name"
          value={reservatorDetails.Name}
          onChange={(e) =>
            setReservatorDetails({ ...reservatorDetails, Name: e.target.value })
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
        />
        <TextField
          required
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
        />
        <TextField
          required
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
        />

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
          />
        </LocalizationProvider>
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
        >
          Create reservation
        </Button>
      </Box>
    </div>
  );
};

export default AddReservationForm;
