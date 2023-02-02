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

const AddReservation = () => {
  const [choosableHotels, setChoosableHotels] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [reservation, setReservation] = useState({
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
  });

  const addReservation = (reservation) => {
    console.log(reservation);
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
                  setReservation({ ...reservation, HotelId: e.target.value })
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
          Selected Hotel's ID:{" "}
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
                onAddRoom={(newValue) =>
                  setReservation({ ...reservation, RoomIds: [...reservation.RoomIds, newValue] })
                }
                onCreate={addReservation}
              />
            )}
        </>
      )}
    </>
  );
};

export default AddReservation;
