import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GuestModalForm from './GuestModalForm.jsx';
import dayjs from 'dayjs';

function AddGuestModal(props) {
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false)
    const [outcome, setOutcome] = useState("success");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSave = async (guest) => {
        console.log('Guest:', JSON.stringify(guest));
        guest.birthDate = new Date(Date.parse(guest.birthDate)).toJSON();
        if (guest.hotelId === "" || guest.roomId === "") {
            guest.hotelId = null;
            guest.roomId = null;
        }
        const url = "api/guest";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest)
        };
        
        const resp = await fetch(url, options);
        if (resp.ok) {
            setOutcome("success");
            props.onSave();
            handleClose();
        } else {
            setOutcome("error");
        }
        setSnackOpen(true);
        
    };

    const snackClose = () => setSnackOpen(false);

    const guest = {
        "id": 0,
        "personalId": "",
        "firstName": "",
        "lastName": "",
        "birthPlace": "",
        "phone": "",
        "email": "",
        "note": "",
        "birthDate": dayjs().toString(),
        "gender": 0,
        "status": 0,
        "address": {
            "id": 0,
            "postalCode": "",
            "country": "",
            "region": "",
            "city": "",
            "addressLineOne": "",
            "addressLineTwo": ""
        },
        "hotelId": "",
        "roomId": "",
        "reservationIds": []
    };

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
                        <GuestModalForm enums={props.enums} hotels={props.hotels} guest={guest} title={"Add Guest"} onCancel={handleClose} onSave={handleSave}></GuestModalForm>
                    </Paper>
                </Box>
            </Modal>

            <Button variant="text" onClick={handleOpen}>Add new</Button>
        </>
  );
}

export default AddGuestModal;