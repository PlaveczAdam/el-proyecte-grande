import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import RoomModalForm from "./RoomModalForm";
import Paper from "@mui/material/Paper";

const AddRoomModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (room) => {
    const response = await fetch("/api/room", {
      method: "POST",
      body: JSON.stringify(room),
      headers: { "Content-Type": "application/json" },
    });
    const newRoom = await response.json();
    props.onNewRoom(newRoom);
    handleClose();
  };

  const room = {
    floor: "",
    doorNo: "",
    accessible: false,
    status: "",
    hotelId: "",
    roomTypeId: "",
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <RoomModalForm
              room={room}
              title={"Add Room"}
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

export default AddRoomModal;
