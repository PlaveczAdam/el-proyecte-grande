import { useState } from "react";

import UpdateReservationPaymentForm from "../Forms/UpdateReservationPaymentForm";
import ReservationDetails from "../ReservationComponents/ReservationDetails";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
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
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "auto",
};

const UpdateReservationPaymentModal = ({
  reservation,
  onReservationWasUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReservationPaymentUpdate = async (paymentMethod) => {
    const response = await fetch(`/api/reservation/status/${reservation.id}`, {
      method: "PUT",
      body: JSON.stringify({ paymentMethod: paymentMethod }),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();

    onReservationWasUpdated(responseData);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} >
        <Box sx={style} >
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
          <UpdateReservationPaymentForm
            onCancel={handleClose}
            onSave={handleReservationPaymentUpdate}
          />

          <ReservationDetails reservationId={reservation.id} />

        </Box>
      </Modal>

      <Button variant="text" onClick={handleOpen}>
        <EditIcon />
      </Button>
    </>
  );
};

export default UpdateReservationPaymentModal;
