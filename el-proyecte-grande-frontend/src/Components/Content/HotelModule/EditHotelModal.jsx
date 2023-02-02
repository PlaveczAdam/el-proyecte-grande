import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import HotelModalForm from "./HotelModalForm";
import Paper from "@mui/material/Paper";

const EditHotelModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (hotel) => {
    const response = await fetch(`/api/hotel/${hotel.id}`, {
      method: "PUT",
      body: JSON.stringify(hotel),
      headers: { "Content-Type": "application/json" },
    });
    const updatedHotel = await response.json();
    props.onHotelUpdate(updatedHotel);
    handleClose();
  };

  

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <HotelModalForm
              hotel={props.hotel}
              title={"Edit Hotel"}
              onCancel={handleClose}
              onSave={handleSave}
            ></HotelModalForm>
          </Paper>
        </Box>
      </Modal>
      <Button variant="text" onClick={handleOpen}>
        <EditIcon />
      </Button>
    </>
  );
};

export default EditHotelModal;
