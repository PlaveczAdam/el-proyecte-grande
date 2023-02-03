import React from "react";
import RoomTypeModalForm from "./RoomTypeModalForm";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";

const EditRoomTypeModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (roomType) => {
    const response = await fetch(`/api/room/roomtype/${roomType.id}`, {
      method: "PUT",
      body: JSON.stringify(roomType),
      headers: { "Content-Type": "application/json" },
    });
    const updatedRoom = await response.json();
    props.onRoomTypeUpdate(updatedRoom);
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <RoomTypeModalForm
              roomType={props.roomType}
              title={"Edit Room Type"}
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

export default EditRoomTypeModal;
