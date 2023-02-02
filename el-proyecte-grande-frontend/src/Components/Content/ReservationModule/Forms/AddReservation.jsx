import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [chosenHotel, setChosenHotel] = useState(0);
  const [chosenStartDate, setChosenStartDate] = useState(null);
  const [chosenEndDate, setChosenEndDate] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleHotelSelectChange = (event) => {
    setChosenHotel(event.target.value);
  };
  const handleStartDateChange = (newValue) => {
    setChosenStartDate(newValue);
  };
  const handleEndDateChange = (newValue) => {
    setChosenEndDate(newValue);
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
                value={chosenHotel}
                label="Hotel"
                onChange={handleHotelSelectChange}
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
          Selected Hotel's ID: {chosenHotel !== 0 ? chosenHotel : "Not selected"}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <DesktopDatePicker
                label="Start date"
                inputFormat="YYYY/MM/DD"
                value={chosenStartDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End date"
                inputFormat="YYYY/MM/DD"
                value={chosenEndDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
          {chosenHotel !== "" && chosenStartDate && chosenEndDate && (
            <AddReservationForm chosenHotel={chosenHotel} chosenStartDate={chosenStartDate} chosenEndDate={chosenEndDate} />
          )}
        </>
      )}
    </>
  );
};

export default AddReservation;
