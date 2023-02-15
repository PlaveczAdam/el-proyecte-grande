import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ContentPagination from "../../Shared/Pagination";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

import "./Reservations.css";
import AddReservationModal from "./Modals/AddReservationModal";
import Searchbar from "./QueryComponents/Searchbar";
import ReservationsFilters from "./QueryComponents/ReservationsFilters";
import UpdateReservationPaymentModal from "./Modals/UpdateReservationPaymentModal";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [reservatorNameSearch, setReservatorNameSearch] = useState("");
  const emptyFilters = {
    boardType: "",
    paymentMethod: "",
    reservedFor: "",
    payFulfillment: false,
    startDate: "",
    endDate: "",
    hotelId: "",
  };
  const [filters, setFilters] = useState(emptyFilters);

  const [addReservationModalIsOpen, setAddReservationModalIsOpen] =
    useState(false);

  const [filtersAreOpen, setFiltersAreOpen] = useState(false);

  const fetchReservations = async () => {
    const url = "/api/reservation";

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
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

  const reservationWasCreatedOrUpdated = (newReservation) => {
    console.log(newReservation);
    fetchReservations();
  };

  const reservatorNameChangedHandler = (searchedName) => {
    setReservatorNameSearch(searchedName);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    const getFilteredReservations = async () => {
      const url = `/api/reservation/filter?boardType=${
        filters.boardType
      }&paymentMethod=${filters.paymentMethod}&reservedFor=${
        filters.reservedFor
      }&payFulfillment=${filters.payFulfillment ? true : ""}&startDate=${
        filters.startDate === null ? "" : filters.startDate
      }&endDate=${filters.endDate === null ? "" : filters.endDate}&hotelId=${
        filters.hotelId
      }`;
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
        setIsLoading(false);

        if (!response.ok) {
          setError("Cannot load Reservations, please try again later");
          return;
        }

        setReservations(responseData);
      } catch (err) {
        setIsLoading(false);
        setError("Cannot load Reservations, please try again later");
      }
    };
    getFilteredReservations();
  }, [filters]);

  const reservationFiltersChanged = (filters) => {
    setFilters(filters);
    console.log(filters);
  };

  const clearAllFilters = () => {
    setFilters(emptyFilters);
  };

  const handleReservationCancellation = async (reservation) => {
    const newStatus = !reservation.isCancelled;

    const response = await fetch(
      `/api/reservation/${reservation.id}?isCancelled=${newStatus}`,
      {
        method: "PUT",
      }
    );
    await response.json();

    fetchReservations();
  };

  return (
    <>
      {isLoading ? (
        <div className="loader_overlay">
          <CircularProgress color="primary" />
        </div>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {addReservationModalIsOpen && (
            <AddReservationModal
              onClose={() => {
                setAddReservationModalIsOpen(false);
              }}
              onReservationWasCreated={reservationWasCreatedOrUpdated}
            />
          )}

          <Box sx={{ textAlign: "center" }}>
            <h2>Reservations</h2>
          </Box>
          <Box sx={{ marginY: 1 }}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Button
                  variant="text"
                  onClick={() => {
                    setAddReservationModalIsOpen(true);
                  }}
                >
                  Add new Reservation
                </Button>
              </Grid>

              <Grid item xs={12} md={4}>
                <Searchbar
                  onSearch={reservatorNameChangedHandler}
                  searchName="Search reservator's name"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => setFiltersAreOpen(!filtersAreOpen)}
            >
              {filtersAreOpen ? "Close filters" : "Open filters"}
            </Button>
          </Box>
          {filtersAreOpen && (
            <ReservationsFilters
              filterState={filters}
              onFilter={reservationFiltersChanged}
              onClearFilters={clearAllFilters}
            />
          )}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Hotel</TableCell>
                  <TableCell align="center">Reservator</TableCell>
                  <TableCell align="center">Reserved for</TableCell>
                  <TableCell align="center">Start date</TableCell>
                  <TableCell align="center">End date</TableCell>
                  <TableCell align="center">Board type</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Payment</TableCell>
                  <TableCell align="center">Edit payment</TableCell>
                  <TableCell align="center">Cancellation status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations
                  .filter((res) =>
                    res.reservator.name
                      .toLowerCase()
                      .includes(reservatorNameSearch.toLowerCase())
                  )
                  .sort((a, b) => a.id - b.id)
                  .map((reservation) => (
                    <>
                      <TableRow
                        key={reservation.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          {reservation.startDate.substring(0, 10)}
                        </TableCell>
                        <TableCell align="center">
                          {reservation.endDate.substring(0, 10)}
                        </TableCell>
                        <TableCell align="center">
                          {reservation.boardType}
                        </TableCell>
                        <TableCell align="center">
                          {reservation.price}
                        </TableCell>
                        <TableCell align="center">
                          {reservation.payFullfillment
                            ? reservation.paymentMethod
                            : "not been paid"}
                        </TableCell>

                        <TableCell align="center">
                          <UpdateReservationPaymentModal
                            reservation={reservation}
                            onReservationWasUpdated={
                              reservationWasCreatedOrUpdated
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  onClick={() =>
                                    handleReservationCancellation(reservation)
                                  }
                                  checked={
                                    reservation.isCancelled ? false : true
                                  }
                                />
                              }
                              label={
                                reservation.isCancelled ? "Cancelled" : "Active"
                              }
                            />
                          </FormGroup>
                        </TableCell>
                      </TableRow>
                    </>
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
