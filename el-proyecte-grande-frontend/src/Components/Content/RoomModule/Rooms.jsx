import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ContentPagination from '../../Shared/Pagination';
import Check from '@mui/icons-material/Check';

function createData(id, hotel, roomNumber, confort, status, accessible) {
    return { id, hotel, roomNumber, confort, status, accessible };
}

const rows = [
    createData(1, 'Hotel Coffee', 101, 'Standard', 'In use', false),
    createData(2, 'Hotel Coffee', 102, 'Confort', 'In use', false),
    createData(3, 'Hotel Coffee', 103, 'Superior', 'In use', true),
    createData(4, 'Hotel Coffee', 105, 'Deluxe', 'In use', false),
    createData(5, 'Hotel Coffee', 106, 'Deluxe', 'Out of order', true),
];

const Rooms = () => {
  return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <h2 >Room</h2>
            </Box>
            <Box sx={{ marginY: 1 }}>
                <Grid container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} md={9} >
                        <Button variant="text">Add new</Button>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField id="outlined-basic" label="Filter" variant="outlined" size="small" />
                    </Grid>
                </Grid>
            </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Hotel</TableCell>
                        <TableCell align="center">Room number</TableCell>
                        <TableCell align="center">Confort</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Accessible</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Set status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.hotel}</TableCell>
                            <TableCell align="center">{row.roomNumber}</TableCell>
                            <TableCell align="center">{row.confort}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.accessible ? <Check color="primary" /> : ""}</TableCell>
                            <TableCell align="center"><Button variant="text"><EditIcon/></Button></TableCell>
                            <TableCell align="center"><Button variant="text"><DisabledByDefaultIcon /></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <ContentPagination />
        </>
    )
}

export default Rooms