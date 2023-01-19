import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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

function createData(id, item_name, item_type, amount, required_amount) {
    return { id, item_name, item_type, amount, required_amount };
}

const rows = [
    createData(1, 'Mop', 'Cleaning equipement', '8', '10'),
    createData(2, 'Towel', 'Room appliance', '90', '70'),
    createData(3, 'Bed sheet set', 'Room appliance', '40', '40'),
    createData(4, 'Bottle of bleach', 'Cleaning equipement', '10', '30'),
    createData(5, 'Television', 'Room appliance', '23', '25'),
];

const Inventories = () => {
    return (
        <div className="Inventory">
            <Box sx={{ textAlign: 'center' }}>
                <h2 >Inventory</h2>
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
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Current</TableCell>
                            <TableCell align="center">Required</TableCell>
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
                                <TableCell align="center">{row.item_name}</TableCell>
                                <TableCell align="center">{row.item_type}</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="center">{row.required_amount}</TableCell>
                                <TableCell align="center"><Button variant="text"><EditIcon /></Button></TableCell>
                                <TableCell align="center"><Button variant="text"><DisabledByDefaultIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ContentPagination />
        </div>
    )
}

export default Inventories