import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ContentPagination from "../../Shared/Pagination";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";


import "./Reservations.css";
import AddReservationModal from "./Modals/AddReservationModal";
import Searchbar from "./Searchbar";


const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const [reservatorNameSearch, setReservatorNameSearch] = useState("");
  const [filteredReservations, setFilteredReservations] = useState(reservations)


  const [addReservationModalIsOpen, setAddReservationModalIsOpen] =
    useState(false);


  const fetchReservations = async () => {
    const url = "https://localhost:7027/api/reservation";


    try {
      setIsLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);


      if (!response.ok) {
        const error = response.message;
        setError(error);
        console.log(error);
        return;
      }


      setReservations(responseData);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.log(err);
    }
  };


  useEffect(() => {
    fetchReservations();
  }, []);


  const openAddReservationModal = () => {
    setAddReservationModalIsOpen(true);
  };
  const closeModal = () => {
    setAddReservationModalIsOpen(false);
  };


  const reservationWasCreated = (newReservation) => {
    console.log(newReservation);
    fetchReservations();
  };


  const reservatorNameChangedHandler = (searchedName) => {
    setReservatorNameSearch(searchedName);
  };


  useEffect(() => {
    const newReservations = reservations.filter((res) =>
      res.reservator.name.toLowerCase().includes(reservatorNameSearch.toLowerCase())
    );
    setFilteredReservations(newReservations);
  }, [reservatorNameSearch, reservations]);


  return (
    <>
      {isLoading ? (
        <div className="loader_overlay">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          {addReservationModalIsOpen && (
            <AddReservationModal
              onClose={closeModal}
              reservationWasCreated={reservationWasCreated}
            />
          )}
          <Box sx={{ textAlign: "center" }}>
            <h2>Reservations</h2>
          </Box>
          <Box sx={{ marginY: 1 }}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12} md={9}>
                <Button variant="text" onClick={openAddReservationModal}>
                  Add new Reservation
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Searchbar
                  onSearch={reservatorNameChangedHandler}
                  searchName="Reservator's name"
                />
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Hotel</TableCell>
                  <TableCell align="center">Reservator</TableCell>
                  <TableCell align="center">Reserved for</TableCell>
                  <TableCell align="center">Reservation date</TableCell>
                  <TableCell align="center">Start date</TableCell>
                  <TableCell align="center">End date</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Payment</TableCell>
                  <TableCell align="center">Edit payment</TableCell>
                  <TableCell align="center">Cancel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow
                    key={reservation.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{reservation.id}</TableCell>
                    <TableCell align="center">
                      {reservation.hotel.name}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.reservator.name}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.reservedFor}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.reserveDate.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.startDate.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {reservation.endDate.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">{reservation.price}</TableCell>
                    <TableCell align="center">
                      {reservation.payFullfillment
                        ? reservation.paymentMethod
                        : "not been paid"}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="text">
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {reservation.isCancelled ? (
                        "Cancelled"
                      ) : (
                        <Button variant="text">
                          <DisabledByDefaultIcon />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ContentPagination />
        </>
      )}
    </>
  );
};


export default Reservations;