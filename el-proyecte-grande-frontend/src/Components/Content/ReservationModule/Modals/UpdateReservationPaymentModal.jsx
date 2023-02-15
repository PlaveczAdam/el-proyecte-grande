import { useState, useEffect } from "react";

import UpdateReservationPaymentForm from "../Forms/UpdateReservationPaymentForm";
import ReservationDetails from "../ReservationDetails";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import ChildModal from "./ChildModal";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

const UpdateReservationPaymentModal = ({
  reservation,
  reservationWasUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>

          <ReservationDetails reservation={reservation} />
          <UpdateReservationPaymentForm />
          
        </Box>
      </Modal>
      <Button variant="text" onClick={handleOpen}>
        <EditIcon />
      </Button>
    </>
  );
};

export default UpdateReservationPaymentModal;
