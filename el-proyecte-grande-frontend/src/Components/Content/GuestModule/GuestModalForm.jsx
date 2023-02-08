import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function GuestModalForm(props) {
    console.log("Guest: ", props.guest);
    const [guest, setGuest] = useState(props.guest);
    const [address, setAddress] = useState(props.guest.address);
    const [roomList, setRoomList] = useState([]);
    const [showRoom, setShowRoom] = useState(false);

    const setHotel = async (e) => {
        const hotelId = e.target.value !== undefined ? e.target.value : e;
        setGuest({ ...guest, hotelId: hotelId });
        if (hotelId !== "") {
            fetchHotelRooms(hotelId);
        } else {
            setRoomList([]);
        }
    };

    const fetchHotelRooms = async(hotelId) => {
        const url = `api/room/hotel/${hotelId}`;
        const resp = await fetch(url);
        const respJson = await resp.json();
        const list = respJson.map((r) => <MenuItem key={r.id} value={r.id}>{r.doorNo}</MenuItem>);
        setRoomList(list);
    }

    useEffect(() => {
        const load = async() => {
            if (props.guest.hotelId !== "" || props.guest.hotelId !== null) {
                await fetchHotelRooms(props.guest.hotelId);
                setGuest({ ...guest, roomId: props.guest.roomId });
            }
        }

        load();
    }, [])

    useEffect(() => {
        if (roomList.length === 0) {
            setGuest({ ...guest, roomId: "" });
            setShowRoom(false);
        } else {
            setShowRoom(true);
        }
    }, [roomList]);

    useEffect(() => {
        if (guest.status === props.enums.status.values["CheckedOut"]) {
            setGuest({ ...guest, hotelId: "", roomId: "" });
            setShowRoom(false);
        }
    }, [guest]);

    return (
        <Box component="form"
            display="flex"
            flexDirection="column"
            gap={4}
            sx={{ padding: 4 }}
        >
            <Box typography="h4" display="flex" gap={4}>
                {props.title}
                <Button sx={{ marginLeft: "auto" }} onClick={() => { props.onSave(guest); console.log(guest) }}>Save</Button>
                <Button onClick={props.onCancel}>Cancel</Button>
            </Box>
            <TextField
                required
                label="First name:"
                value={guest.firstName}
                onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
            />
            <TextField
                required
                label="Last name:"
                value={guest.lastName}
                onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
            />
            <TextField
                required
                label="Personal Id:"
                value={guest.personalId}
                onChange={(e) => setGuest({ ...guest, personalId: e.target.value })}
            />
            <TextField
                required
                label="Place of birth:"
                value={guest.birthPlace}
                onChange={(e) => setGuest({ ...guest, birthPlace: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    required
                    label="Date of birth"
                    inputFormat="MM/DD/YYYY"
                    value={guest.birthDate}
                    onChange={(e) => setGuest({ ...guest, birthDate: e.toString() })}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Card variant="outlined" sx={{ display: "flex", gap: 1, padding: 1, flexWrap: "wrap", flexDirection: "column" }}>
                <Box>
            <TextField
                required
                multiline
                label="Country:"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />
            <TextField
                required
                multiline
                label="Region:"
                value={address.region}
                onChange={(e) => setAddress({ ...address, region: e.target.value })}
            />
            <TextField
                required
                multiline
                label="Postal Code:"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            />
            <TextField
                required
                multiline
                label="City:"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
                </Box>
            <TextField
                required
                multiline
                label="Address line #1:"
                value={address.addressLineOne}
                onChange={(e) => setAddress({ ...address, addressLineOne: e.target.value })}
            />
            <TextField
                required
                multiline
                label="Address line #2:"
                value={address.addressLineTwo}
                onChange={(e) => setAddress({ ...address, addressLineTwo: e.target.value })}
                    />
                </Card>
            <TextField
                required
                label="Phone number:"
                value={guest.phone}
                onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            />
            <TextField
                required
                label="Email:"
                value={guest.email}
                onChange={(e) => setGuest({ ...guest, email: e.target.value })}
            />
            <TextField
                multiline
                label="Note:"
                value={guest.note}
                onChange={(e) => setGuest({ ...guest, note: e.target.value })}
            />
            <FormControl fullWidth>
                <InputLabel>Gender:</InputLabel>
                <Select
                    value={guest.gender}
                    label="Gender:"
                    onChange={(e) => setGuest({ ...guest, gender: e.target.value })}
                >
                    {Object.keys(props.enums.gender.values).map(
                        (g) => <MenuItem value={props.enums.gender.values[g]} key={props.enums.gender.values[g]}>{g}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Status:</InputLabel>
                <Select
                    value={guest.status}
                    label="Status:"
                    onChange={(e) => setGuest({ ...guest, status: e.target.value })}
                >
                    {Object.keys(props.enums.status.values).map(
                        (g) => <MenuItem value={props.enums.status.values[g]} key={props.enums.status.values[g]}>{g}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {guest.status === props.enums.status.values["CheckedIn"] &&
                <FormControl fullWidth>
                    <InputLabel>Hotel:</InputLabel>
                    <Select
                        value={guest.hotelId}
                        label="Hotel:"
                        onChange={(e) => setHotel(e)}
                    >
                        <MenuItem key={-1000} value="">None</MenuItem>
                        {props.hotels.map((h) => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
                    </Select>
                </FormControl>
            }
            {(showRoom)&&
                <FormControl fullWidth>
                    <InputLabel>Room:</InputLabel>
                    <Select
                        value={guest.roomId}
                        label="Room:"
                        onChange={(e) => setGuest({ ...guest, roomId: e.target.value })}
                    >
                        <MenuItem key={-1000} value="">None</MenuItem>
                        {roomList}
                    </Select>
                </FormControl>
            }
        </Box>
    );
}

export default GuestModalForm;