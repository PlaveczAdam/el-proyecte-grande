import React, { useEffect, useState } from 'react';
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ContentPagination from '../../Shared/Pagination';
import TextField from '@mui/material/TextField';
import AddItemModal from "./AddItemModal";

const Inventories = () => {

    const [items, setItems] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedHotel, setSelectedHotel] = useState("");
    const handleNewItem = (item) => {
        setItems([...items, item]);
    };


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/inventory/item');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/hotel');
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHotels();
        fetchItems();
    },[]);

    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(filter.toLowerCase());
    });

    const handleFilterChange = (event) => {
        const filterText = event.target.value;
        setFilter(filterText);
    }

    const handleHotelChange = event => {
        setSelectedHotel(event.target.value);
    };

    const filteredByHotelItems = selectedHotel ? filteredItems.filter(item => {
        return item.hotel.name === selectedHotel;
    }) : filteredItems;

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
                    <Grid item xs={12} md={3} >
                        <AddItemModal onNewItem={handleNewItem} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="HotelSelect">Hotels</InputLabel>
                            <Select
                                labelId="HotelSelect"
                                id="HotelSelect"
                                value={selectedHotel}
                                onChange={handleHotelChange}
                                label="Hotels"
                            >
                                <MenuItem value={""}>Select a hotel...</MenuItem>
                                {hotels ? (
                                    hotels.map((hotel) => (
                                        <MenuItem key={hotel.id} value={hotel.id}>
                                            {hotel.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value={""}>Loading...</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField id="outlined-basic" label="Filter" variant="outlined" size="small" value={filter} onChange={handleFilterChange} />
                    </Grid>
                </Grid>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Hotel</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Current</TableCell>
                            <TableCell align="center">Required</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredByHotelItems.map(item => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{item.id}</TableCell>
                                <TableCell align="center">{item.hotel.name}</TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.itemType}</TableCell>
                                <TableCell align="center">{item.amount}</TableCell>
                                <TableCell align="center">{item.requiredAmount}</TableCell>
                                <TableCell align="center"><Button variant="text"><EditIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ContentPagination />
        </div>
    );
};

export default Inventories;
