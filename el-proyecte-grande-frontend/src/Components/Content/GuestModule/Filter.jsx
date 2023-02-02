import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from"@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Filter() {
    const guestStatuses = [
        "Checked in",
        "Checked out"
    ];
    const hotels = [
        "Hotel Lorem Ipsum",
        "Grand Hotel Szekszárd",
        "Grand Theft Hotel",
        "Really Long Named Lorem Ipsum Hotel All Stars"
    ];
    const [guestStatus, setGuestStatus] = React.useState("");
    const [hotel, setHotel] = React.useState("");

    const handleStatusChange = (e) => {
        setGuestStatus(e.target.value);
    }
    const handleHotelChange = (e) => {
        setHotel(e.target.value);
    }

    const resetFilters = () => {
        setHotel("");
        setGuestStatus("");
    };
    return (
        <Box>
            <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                    <InputLabel id="guest-status-filter-label">Guest status</InputLabel>
                    <Select
                        labelId="guest-status-filter-label"
                        id="guest-status-filter-select"
                        value={guestStatus}
                        label="Guest Status"
                        onChange={handleStatusChange}
                        >
                            { guestStatuses.map((s, i) => <MenuItem value={i}>{s}</MenuItem>) }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                        <InputLabel id="hotel-filter-label">Hotel</InputLabel>
                        <Select
                            labelId="hotel-filter-label"
                            id="hotel-filter-select"
                            value={hotel}
                            label="Hotel"
                            onChange={handleHotelChange}
                        >
                            {hotels.map((h, i) => <MenuItem value={i}>{h}</MenuItem>) }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Tooltip title="Reset filters" arrow placement="right">
                        <Button variant="text" onClick={resetFilters}>
                            <RestartAltIcon />
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
        );
}