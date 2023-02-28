import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ContentPagination from "../../Shared/Pagination";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HotelDataCell from "./HotelDataCell";
import AddHotelModal from "./AddHotelModal";
import EditHotelModal from "./EditHotelModal";
import { HotelContext } from "./HotelContextProvider";
import { AuthContext } from "../../Shared/AuthContext";

const Hotels = () => {
  const auth = useContext(AuthContext);

  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const handleNewHotel = (hotel) => {
    setRows([...rows, hotel]);
  };

  async function handleStatusChange(row) {
    const status =
      row.hotelStatus === context.enums.hotelStatus.values.InUse
        ? context.enums.hotelStatus.values.RenovationInProgress
        : context.enums.hotelStatus.values.InUse;
    await fetch(`/api/hotel/${row.id}/${status}`, {
      method: "PUT",
    });
    handleHotelUpdate({ ...row, hotelStatus: status });
  }
  const context = useContext(HotelContext);
  const handleHotelUpdate = (hotel) => {
    const newRows = [...rows];
    const indexOfHotel = newRows.findIndex((x) => x.id === hotel.id);
    newRows[indexOfHotel] = hotel;
    setRows(newRows);
  };
  useEffect(() => {
    async function getHotels() {
      const response = await fetch("/api/hotel");
      const hotels = await response.json();
      setRows(hotels);
    }
    getHotels();
  }, []);

  function getAddressString(address) {
    return `${address.postalCode} ${address.country}  ${address.region}  ${address.city}  ${address.addressLineOne}  ${address.addressLineTwo}`;
  }

  return (
    <div className="Hotels">
      <Box sx={{ textAlign: "center" }}>
        <h2>Hotel</h2>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          {auth.user.roles.includes("Admin") && (
            <Grid item xs={12} md={9}>
              <AddHotelModal onNewHotel={handleNewHotel} />
            </Grid>
          )}
          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Filter"
              variant="outlined"
              size="small"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
          </Grid>
        </Grid>
      </Box>
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
              {auth.user.roles.includes("Admin") && (
                <>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Set status</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((x) =>
                x.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <HotelDataCell data={row.id}></HotelDataCell>
                  <HotelDataCell data={row.name}></HotelDataCell>
                  <HotelDataCell
                    data={getAddressString(row.address)}
                  ></HotelDataCell>
                  <HotelDataCell
                    data={
                      Object.keys(context.enums.hotelStatus.values)[
                        row.hotelStatus
                      ]
                    }
                  ></HotelDataCell>
                  <HotelDataCell data={row.classification}></HotelDataCell>
                  <HotelDataCell data={row.floor}></HotelDataCell>
                  <HotelDataCell data={row.rooms}></HotelDataCell>

                  {auth.user.roles.includes("Admin") && (
                    <>
                      <TableCell align="center">
                        <EditHotelModal
                          hotel={row}
                          onHotelUpdate={handleHotelUpdate}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {/* <Button
                          variant="text"
                          onClick={() => handleStatusChange(row)}
                        >
                          <DisabledByDefaultIcon
                            sx={{
                              color:
                                row.hotelStatus ===
                                context.enums.hotelStatus.values.InUse
                                  ? "red"
                                  : "green",
                            }}
                          />
                        </Button> */}
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                              onClick={() => handleStatusChange(row)}
                                checked={row.hotelStatus ===
                                  context.enums.hotelStatus.values.InUse ? true : false}
                              />
                            }
                            // label={
                            //   row.hotelStatus ===
                            //   context.enums.hotelStatus.values.InUse ? "In use" : "oUT OF USE"
                            // }
                          />
                        </FormGroup>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ContentPagination />
    </div>
  );
};

export default Hotels;
