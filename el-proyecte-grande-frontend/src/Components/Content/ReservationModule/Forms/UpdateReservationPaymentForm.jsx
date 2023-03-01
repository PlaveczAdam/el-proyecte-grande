import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const UpdateReservationPaymentForm = ({ onSave, onCancel }) => {
  const [newPaymentMethod, setNewPaymentMethod] = useState("");
  const [choosablePaymentMethods, setChoosablePaymentMethods] = useState([]);

  const fetchChoosablePaymentMethods = async () => {
    const url = `/api/enum/PaymentMethod`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setChoosablePaymentMethods(responseData);
    } catch (err) {}
  };

  useEffect(() => {
    fetchChoosablePaymentMethods();
  }, []);

  return (
    <>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Set Payment of Reservation
      </Typography>
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
        <FormControl
          sx={{
            m: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>Payment method</InputLabel>
          <Select
            value={newPaymentMethod}
            onChange={(event) => setNewPaymentMethod(event.target.value)}
            error={!newPaymentMethod}
          >
            <MenuItem value={""}>Select a payment method</MenuItem>
            {Object.entries(choosablePaymentMethods.values).map(
              ([name, value]) => (
                <MenuItem value={name} key={value}>
                  {name}
                </MenuItem>
              )
            )}
          </Select>
          {!newPaymentMethod && (
            <FormHelperText error>
              Please select a payment method
            </FormHelperText>
          )}
        </FormControl>
        <Box
        sx={{
          m: 2,
          minWidth: 200,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1em",
        }}
      >
          <Button
            variant="contained"
            color="success"
            onClick={() => onSave(newPaymentMethod)}
            disabled={newPaymentMethod === ""}
          >
            Update reservation
          </Button>
          <Button onClick={onCancel} variant="contained" color="primary">
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateReservationPaymentForm;
