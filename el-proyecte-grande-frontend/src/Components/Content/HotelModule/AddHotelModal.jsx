import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import Box from '@mui/material/Box';
import HotelModalForm from './HotelModalForm';
import Paper from '@mui/material/Paper';


const AddHotelModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async (hotel)=>{
        const response = await fetch("/api/hotel", {
            method: "POST",
            body: JSON.stringify(hotel),
            headers:{"Content-Type": "application/json"}
        })
        const newHotel = await response.json();
        props.onNewHotel(newHotel);
        handleClose();
    };

    const hotel = {
        "name": "",
        "hotelStatus": 0,
        "classification": 0,
        "floor": 1,
        "rooms": 1,
        "address": {
            "postalCode": "",
            "country": "",
            "region": "",
            "city": "",
            "addressLineOne": "",
            "addressLineTwo": ""
        }
    };

    return <><Modal
        open={open}
        onClose={handleClose}
    >
        <Box height="100vh"display="flex" sx={{overflowY:"auto"}} >
            <Paper sx={{margin:"auto"}}>
                <HotelModalForm hotel={hotel} title={"Add Hotel"} onCancel={handleClose} onSave={handleSave}></HotelModalForm>
            </Paper>
        </Box>
    </Modal>
    <Button variant="text" onClick={handleOpen}>Add new</Button>
    </>
}

export default AddHotelModal;