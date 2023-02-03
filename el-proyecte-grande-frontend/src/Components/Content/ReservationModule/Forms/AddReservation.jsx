import { useState, useEffect } from "react";

import AddReservationForm from "./AddReservationForm";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CircularProgress from "@mui/material/CircularProgress";

import "../Reservations.css";

const initialReservation = {
  ReservedFor: 0,
  ReserveDate: null,
  StartDate: null,
  EndDate: null,
  Price: 0,
  PayFulfillment: false,
  BoardType: "",
  PaymentMethod: "",
  HotelId: "",
  RoomIds: [],
  Reservator: {
    Name: "",
    Address: {
      PostalCode: "",
      Country: "",
      Region: "",
      City: "",
      AddressLineOne: "",
      AddressLineTwo: "",
    },
  },
};

const AddReservation = ({onCreated}) => {
  const [choosableHotels, setChoosableHotels] = useState([]);
  const [createdReservation, setCreatedReservation] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [reservation, setReservation] = useState(initialReservation);

  const addReservation = async (reservation) => {
    console.log(reservation);

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7027/api/reservation/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reservation),
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      // setReservation(initialReservation);
      setIsLoading(false);

      if (!response.ok) {
        const error = responseData.title;
        console.log(error);
        return error;
      }

      setCreatedReservation(responseData);
      onCreated(createdReservation)
    } catch (err) {
      //setReservation(initialReservation);
      setIsLoading(false);
      console.log(err);
    }
  };

  const fetchChoosableHotels = async () => {
    const url = `https://localhost:7027/api/hotel`;
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);

      setChoosableHotels(responseData);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChoosableHotels();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader_overlay">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Hotels</InputLabel>
            {choosableHotels.length > 0 ? (
              <Select
                name="Select a Hotel"
                value={reservation.HotelId}
                label="Hotel"
                onChange={(e) =>
                  setReservation({ ...reservation, HotelId: parseInt(e.target.value) })
                }
              >
                {choosableHotels.map((h) => (
                  <MenuItem key={h.id} value={h.id}>
                    {h.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              "There are no hotels to choose from"
            )}
          </FormControl>
          Selected Hotel's ID:
          {reservation.HotelId !== 0 ? reservation.HotelId : "Not selected"}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <DesktopDatePicker
                label="Start date"
                inputFormat="YYYY/MM/DD"
                value={reservation.StartDate}
                onChange={(newValue) =>
                  setReservation({ ...reservation, StartDate: newValue })
                }
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End date"
                inputFormat="YYYY/MM/DD"
                value={reservation.EndDate}
                onChange={(newValue) =>
                  setReservation({ ...reservation, EndDate: newValue })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
          {reservation.HotelId !== "" &&
            reservation.StartDate &&
            reservation.EndDate && (
              <AddReservationForm
                reservation={reservation}
                onCreate={addReservation}
              />
            )}
        </>
      )}
    </>
  );
};

export default AddReservation;
