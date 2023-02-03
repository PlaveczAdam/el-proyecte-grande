import { useState } from "react";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReservationModalBase from "./ReservationModalBase";
import AddReservation from "../Forms/AddReservation";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "auto",
};

const AddReservationModal = ({ onClose, buttonText = "Close", reservationWasCreated }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <ReservationModalBase
      open={open}
      handleClose={handleClose}
      boxStyle={style}
    >
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Add new Reservation
      </Typography>

      <AddReservation onCreated={reservationWasCreated} />

      <div className="modal-buttons-container">
        <Button onClick={handleClose} variant="outlined" color="error">
          {buttonText}
        </Button>
      </div>
    </ReservationModalBase>
  );
};

export default AddReservationModal;
