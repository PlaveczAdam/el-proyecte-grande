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

function createData(id, name, address, status, stars, floors, rooms) {
    return { id, name, address, status, stars, floors, rooms };
}

const rows = [
    createData(1, 'Hotel Coffee', 'Lorem ipsum address', 'In use', 'Comfort', 4, 40),
    createData(2, 'Hotel Menthol', 'Lorem ipsum address', 'In use', 'First class', 10, 100),
    createData(3, 'Hotel Lorem', 'Lorem ipsum address', 'Renovation in progress', 'Comfort', 5, 50),
    createData(4, 'Hotel Ipsum', 'Lorem ipsum address', 'Building in progress', 'Luxury', 10, 110),
    createData(5, 'Hotel Grabde Superior', 'Lorem ipsum address', 'In use', 'Comfort', 12, 200),
];



const Hotels = () => {
    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Stars</TableCell>
                        <TableCell align="center">Floors</TableCell>
                        <TableCell align="center">Rooms</TableCell>
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
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.stars}</TableCell>
                            <TableCell align="center">{row.floors}</TableCell>
                            <TableCell align="center">{row.rooms}</TableCell>
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

export default Hotels