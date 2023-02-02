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
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from '@mui/icons-material/Edit';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ContentPagination from '../../Shared/Pagination';
import Filter from "./Filter.jsx";
import { useEffect } from 'react';

const Guests = () => {
    const [loading, setLoading] = React.useState(true);
    const [filterLoading, setFilterLoading] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [enums, setEnums] = React.useState({});
    const [hotelNames, setHotelNames] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [selectedHotelId, setSelectedHotelId] = React.useState(null);
    const [selectedStatusId, setSelectedStatusId] = React.useState(null);

    function searchBoxChanged(e) {
        const text = e.target.value;
        console.log(text);
        const filteredUsers = rows.filter(r => r.firstName.includes(text) || r.lastName.includes(text));
        setSearchText(text);
        if (text !== "" && text !== undefined) {
            setFilteredRows(filteredUsers);
        } else {
            setFilteredRows(rows);
        }
        
    }

    useEffect(() => {
        async function getGuests() {
            const response = await fetch("api/guest");
            const guestsJson = await response.json();
            setRows(guestsJson);
            setFilteredRows(guestsJson);
        }

        async function getFilteredGuests() {
            let url = "api/guest/filter?";
            url += selectedHotelId !== null ? `hotelId=${selectedHotelId}` : "";
            url += selectedStatusId !== null ? selectedHotelId !== null ? `&guestStatus=${selectedStatusId}` : `guestStatus=${selectedStatusId}` : "";
            console.log(url);
            const filteredResp = await fetch(url);
            const filteredJson = await filteredResp.json();
            console.log(filteredJson);
            setRows(filteredJson);
            setFilteredRows(filteredJson);
        }

        async function getHotelNames() {
            const hotelsResp = await fetch("api/hotel");
            const hotelJson = await hotelsResp.json();
            const namesArray = hotelJson.map(({ id, name }) => {
                return { name, id };
            });
            setHotelNames(namesArray);
        }

        async function getEnums() {
            const genderResp = await fetch("api/enum/Gender");
            const gender = await genderResp.json();
            const statusResp = await fetch("api/enum/GuestStatus");
            const status = await statusResp.json();
            const enumsObj = { gender, status };
            setEnums(enumsObj);
        }

        async function load() {
            await getHotelNames();
            await getEnums();
            if (selectedHotelId === null && selectedStatusId === null) {
                setFilterLoading(true);
                await getGuests();
                setTimeout(() => {
                    setFilterLoading(false);
                    setLoading(false);

                }, 500);
            } else {
                setFilterLoading(true);
                await getFilteredGuests();
                setTimeout(() => { setFilterLoading(false); }, 500);
            }

        }

        load();
    }, [selectedHotelId, selectedStatusId]);

    return (
        <>
            {loading ? <CircularProgress /> : <>
                <Box sx={{ textAlign: 'center' }}>
                    <h2 >Guest</h2>
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
                            <TextField
                                id="outlined-basic"
                                onInput={searchBoxChanged}
                                value={searchText}
                                label="Search"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Filter
                                enums={enums}
                                hotelNames={hotelNames}
                                setSelectedHotelId={setSelectedHotelId}
                                setSelectedStatusId={setSelectedStatusId}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {filterLoading ? <CircularProgress /> : <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Personal Id</TableCell>
                                <TableCell align="center">Birth Date</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.firstName + " " + row.lastName}</TableCell>
                                    <TableCell align="center">{row.personalId}</TableCell>
                                    <TableCell align="center">{new Date(Date.parse(row.birthDate)).toLocaleDateString('en-US')}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{Object.keys(enums.status.values)[row.status]}</TableCell>
                                    <TableCell align="center"><Button variant="text"><EditIcon /></Button></TableCell>
                                    <TableCell align="center"><Button variant="text"><DisabledByDefaultIcon /></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ContentPagination />
                </>}
            </>
            }
        </>
    )
}

export default Guests