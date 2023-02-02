import AccessoryModalForm from "./AccessoryModalForm";

import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const AddAccessoryModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (accessory) => {
    const response = await fetch("/api/room/accessory", {
      method: "POST",
      body: JSON.stringify(accessory),
      headers: { "Content-Type": "application/json" },
    });
    const newAccessory = await response.json();
    props.onNewAccessory(newAccessory);
    handleClose();
  };

  const accessory = {
    name: "",
    quantity: "",
    roomTypeId: "",
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <AccessoryModalForm
              accessory={accessory}
              title={"Add Room Accessory"}
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

export default AddAccessoryModal;
