import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GuestModalForm from './GuestModalForm.jsx';
import dayjs from 'dayjs';

function EditGuestModal(props) {
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false)
    const [outcome, setOutcome] = useState("success");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSave = async (guest) => {
        guest.reservationIds = [];
        guest.birthDate = new Date(Date.parse(guest.birthDate)).toJSON();
        console.log(JSON.stringify(guest));
        if (guest.hotelId === "" || guest.roomId === "") {
            guest.hotelId = null;
            guest.roomId = null;
        }
        const url = `api/guest/${guest.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest)
        };

        const resp = await fetch(url, options);
        if (resp.ok) {
            setOutcome("success")
            props.onSave();
            handleClose();
        } else {
            setOutcome("error");
        }
        setSnackOpen(true);

    };

    const snackClose = () => setSnackOpen(false);
  return (
      <>
          <Snackbar open={snackOpen} autoHideDuration={3000} onClose={snackClose}>
              <Alert onClose={snackClose} severity={outcome} sx={{ width: '100%' }}>
                  {outcome === "success" ? "Guest saved succesfully." : "Something happened try again later."}
              </Alert>
          </Snackbar>
          <Modal open={open} onClose={handleClose}>
              <Box height="100vh" display="flex" sx={{ overflowY: "auto" }} >
                  <Paper sx={{ margin: "auto" }}>
                      <GuestModalForm enums={props.enums} hotels={props.hotels} guest={props.guest} title={"Edit Guest"} onCancel={handleClose} onSave={handleSave}></GuestModalForm>
                  </Paper>
              </Box>
          </Modal>

          <Button variant="text" onClick={handleOpen}><EditIcon /></Button>
      </>
  );
}

export default EditGuestModal;