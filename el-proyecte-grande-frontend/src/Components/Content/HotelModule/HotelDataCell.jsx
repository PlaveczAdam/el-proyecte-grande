
import { Modal } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import React from 'react';
import Box from '@mui/material/Box';

const HotelDataCell = (props) => {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(false);
    const handleClose = () => setOpen(false);

    return <>
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box>
            Box
        </Box>
    </Modal>
    <TableCell sx={{userSelect:"none"}} align="center" onClick={handleOpen}>{props.data}</TableCell>    
    </>
}

export default HotelDataCell;