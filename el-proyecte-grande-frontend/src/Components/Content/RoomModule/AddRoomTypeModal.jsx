import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import RoomTypeModalForm from "./RoomTypeModalForm";
import Paper from "@mui/material/Paper";

const AddRoomTypeModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (roomtype) => {
    const response = await fetch("/api/room/roomtype", {
      method: "POST",
      body: JSON.stringify(roomtype),
      headers: { "Content-Type": "application/json" },
    });
    const newRoomType = await response.json();
    props.onNewRoomType(newRoomType);
    handleClose();
  };

  const roomType = {
    name: "",
    price: "",
    roomQuality: "",
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <RoomTypeModalForm
              roomType={roomType}
              title={"Add Room Type"}
              enums={props.enums}
              onCancel={handleClose}
              onSave={handleSave}
            />
          </Paper>
        </Box>
      </Modal>
      <Button variant="text" onClick={handleOpen}>
        Add new
      </Button>
    </>
  );
};

export default AddRoomTypeModal;
