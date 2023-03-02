import React from "react";
import AccessoryModalForm from "./AccessoryModalForm";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";

const EditAccessoryModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (accessory) => {
    const response = await fetch(`/api/room/accessory/${accessory.id}`, {
      method: "PUT",
      body: JSON.stringify(accessory),
      headers: { "Content-Type": "application/json" },
    });
    const updatedAccessory = await response.json();
    props.onAccessoryUpdate(updatedAccessory);
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <AccessoryModalForm
              accessory={props.accessory}
              roomTypes={props.roomTypes}
              title={"Edit Room Accessory"}
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

export default EditAccessoryModal;
