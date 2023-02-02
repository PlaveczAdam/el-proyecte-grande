import React from "react";
import RoomModalForm from "./RoomModalForm";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";

const EditRoomModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (room) => {
    const response = await fetch(`/api/room/${room.id}`, {
      method: "PUT",
      body: JSON.stringify(room),
      headers: { "Content-Type": "application/json" },
    });
    const updatedRoom = await response.json();
    props.onRoomUpdate(updatedRoom);
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <RoomModalForm
              room={props.room}
              title={"Edit Room"}
              onCancel={handleClose}
              onSave={handleSave}
            />
          </Paper>
        </Box>
      </Modal>
      <Button variant="text" onClick={handleOpen}>
        <EditIcon />
      </Button>
    </>
  );
};

export default EditRoomModal;
