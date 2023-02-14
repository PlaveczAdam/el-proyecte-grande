import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormHelperText from "@mui/material/FormHelperText";

const ReservationsFilters = ({ filterState, onFilter }) => {
  const [filters, setFilters] = useState(filterState);

  const [choosableHotels, setChoosableHotels] = useState([]);
  const [choosableBoardTypes, setChoosableBoardTypes] = useState([]);
  const [choosablePaymentMethods, setChoosablePaymentMethods] = useState([]);

  const {
    boardType,
    paymentMethod,
    reservedFor,
    payFulfillment,
    startDate,
    endDate,
    hotelId,
  } = filters;

  const fetchHotels = async () => {
    const url = `/api/hotel`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setChoosableHotels(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChoosableBoardTypes = async () => {
    const url = `/api/enum/BoardType`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setChoosableBoardTypes(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChoosablePaymentMethods = async () => {
    const url = `/api/enum/PaymentMethod`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setChoosablePaymentMethods(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchChoosableBoardTypes();
    fetchChoosablePaymentMethods();
  }, []);

  return (
    <FormControl
      sx={{ m: 2, display: "flex", alignItems: "center" }}
      component="fieldset"
      variant="standard"
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Reservation filters
      </Typography>

      <FormControl fullWidth>
        {choosableHotels.length > 0 ? (
          <>
            <InputLabel id="demo-simple-select-label">Hotels</InputLabel>
            <Select
              name="Select a Hotel"
              value={hotelId}
              label="Hotel"
              onChange={(e) =>
                setFilters({ ...filters, hotelId: e.target.value })
              }
            >
              <MenuItem value={""}>Select a hotel</MenuItem>
              {choosableHotels.map((h) => (
                <MenuItem key={h.id} value={h.id}>
                  {h.name}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : (
          "There are no hotels to choose from"
        )}
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={payFulfillment}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  [e.target.name]: e.target.checked,
                })
              }
              name="payFulfillment"
            />
          }
          label="Has been paid for"
        />
      </FormGroup>

      <Box
        mt={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          number="number"
          label="Reserved for"
          value={reservedFor}
          min={0}
          onChange={(e) =>
            setFilters({
              ...filters,
              reservedFor: e.target.value,
            })
          }
        />
        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
          }}
        >
          <InputLabel>Board type</InputLabel>
          <Select
            value={boardType}
            onChange={(e) =>
              setFilters({
                ...filters,
                boardType: e.target.value,
              })
            }
          >
            <MenuItem value={""}>Select a Board type</MenuItem>
            {Object.entries(choosableBoardTypes.values).map(([name, value]) => (
              <MenuItem value={name} key={value}>
                {name}
              </MenuItem>
            ))}
          </Select>{" "}
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
          }}
        >
          <InputLabel>Payment method</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) =>
              setFilters({
                ...filters,
                paymentMethod: e.target.value,
              })
            }
          >
            <MenuItem value={""}>Select a Payment method</MenuItem>
            {Object.entries(choosablePaymentMethods.values).map(
              ([name, value]) => (
                <MenuItem value={name} key={value}>
                  {name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <DesktopDatePicker
            label="Start date"
            inputFormat="YYYY/MM/DD"
            value={startDate}
            onChange={(newValue) =>
              setFilters({ ...filters, startDate: newValue })
            }
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End date"
            inputFormat="YYYY/MM/DD"
            value={endDate}
            onChange={(newValue) =>
              setFilters({ ...filters, endDate: newValue })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        {startDate !== null && endDate !== null && startDate > endDate && (
          <FormHelperText error>
            End date cannot be earlier than start date
          </FormHelperText>
        )}
      </LocalizationProvider>

      <Box
        mt={3}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            onFilter({
              ...filters,
            })
          }
          disabled={startDate !== null && endDate !== null && startDate > endDate}
        >
          Filter reservations
        </Button>
      </Box>
    </FormControl>
  );
};

export default ReservationsFilters;
