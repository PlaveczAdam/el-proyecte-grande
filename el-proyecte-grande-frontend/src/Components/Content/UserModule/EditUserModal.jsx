import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import UserModalForm from "./UserModalForm";
import Paper from "@mui/material/Paper";

const EditUserModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async (user) => {
    const response = await fetch(`/api/user/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const updatedUser = await response.json();
    props.onUserUpdate(updatedUser);
    handleClose();
  };

  

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
          <Paper sx={{ margin: "auto" }}>
            <UserModalForm
              user={props.user}
              title={"Edit User"}
              onCancel={handleClose}
              onSave={handleSave}
            ></UserModalForm>
          </Paper>
        </Box>
      </Modal>
      <Button variant="text" onClick={handleOpen}>
        <EditIcon />
      </Button>
    </>
  );
};

export default EditUserModal;
