import { useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReservationModalBase from "./ReservationModalBase";
import AddReservation from "../Forms/AddReservation";
import ChildModal from "./ChildModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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

const AddReservationModal = ({
  onClose,
  buttonText = "Cancel",
  onReservationWasCreated,
}) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(null);
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const handleAddReservationError = (error) => {
    let errorMessage = "An unexpected problem occured, please try again later";
    if (error.status === 400) {
      errorMessage =
        error.title +
        "\n Please check if all required fields have been filled out correctly";
    }
    openChildModal(errorMessage);
  };

  const handleAddReservationSuccess = () => {
    openChildModal("Reservation has been successfully created");
  };

  const openChildModal = (message) => {
    setMessage(message);
    setChildModalIsOpen(true);
  };

  const childModalWasClosed = () => {
    setMessage(null);
    setChildModalIsOpen(false);
    onReservationWasCreated();
  };

  return (
    <ReservationModalBase
      open={open}
      handleClose={handleClose}
      boxStyle={style}
    >
      <Button
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: (style.p * 8) / 2,
          right: (style.p * 8) / 2,
        }}
      >
        <HighlightOffIcon sx={{ color: "brown", fontSize: "2rem" }} />
      </Button>
      {childModalIsOpen && (
        <ChildModal message={message} modalWasClosed={childModalWasClosed} />
      )}
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Add new Reservation
      </Typography>
      <AddReservation
        onError={handleAddReservationError}
        onSuccess={handleAddReservationSuccess}
      />
      <div className="modal-buttons-container">
        <Button onClick={handleClose} variant="contained" color="primary">
          {buttonText}
        </Button>
      </div>
    </ReservationModalBase>
  );
};

export default AddReservationModal;
