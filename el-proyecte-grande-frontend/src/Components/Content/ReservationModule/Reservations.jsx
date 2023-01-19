import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ContentPagination from '../../Shared/Pagination';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function createData(id, reservator, reserveDate, startDate, endDate, hotelName) {
    return { id, reservator, reserveDate, startDate, endDate, hotelName };
}

const rows = [
    createData(1, 'Mr Smith', '2022-01-01', '2022-02-01', '2022-02-05', 'Hotel Menthol'),
    createData(2, 'Mr Jones', '2022-01-01', '2022-02-01', '2022-02-05', 'Hotel Coffee'),
    createData(3, 'Mrs Smith', '2022-01-01', '2022-02-01', '2022-02-05', 'Hotel Menthol'),
    createData(4, 'Mrs Anonymus', '2022-01-01', '2022-02-01', '2022-02-05', 'Hotel Menthol'),
    createData(5, 'Mr X', '2022-01-01', '2022-02-01', '2022-02-05', 'Hotel Zizi'),
];


const Reservations = () => {
    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <h2 >Reservation</h2>
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
                            <TableCell align="center">Reservator</TableCell>
                            <TableCell align="center">Reservation date</TableCell>
                            <TableCell align="center">Start date</TableCell>
                            <TableCell align="center">End date</TableCell>
                            <TableCell align="center">Hotel</TableCell>
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
                                <TableCell align="center">{row.reservator}</TableCell>
                                <TableCell align="center">{row.reserveDate}</TableCell>
                                <TableCell align="center">{row.startDate}</TableCell>
                                <TableCell align="center">{row.endDate}</TableCell>
                                <TableCell align="center">{row.hotelName}</TableCell>
                                <TableCell align="center"><Button variant="text"><EditIcon /></Button></TableCell>
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

export default Reservations