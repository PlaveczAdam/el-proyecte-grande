import { useState, useEffect } from "react";

import ReservationRoomDetails from "./ReservationRoomDetails";
import ReservationsHotelDetails from "./ReservationsHotelDetails";
import ReservationReservatorDetails from "./ReservationReservatorDetails";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const cardBoxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1em",
};

const ReservationDetails = ({ reservationId }) => {
  const [detailedReservation, setDetailedReservation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [roomDetailsAreOpen, setRoomDetailsAreOpen] = useState(false);
  const [hotelDetailsAreOpen, setHotelDetailsAreOpen] = useState(false);
  const [reservatorDetailsAreOpen, setReservatorDetailsAreOpen] =
    useState(false);

  const fetchReservationDetails = async () => {
    const url = `/api/reservation/${reservationId}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        setError(
          "Could not load details of Reservation, please try again later"
        );
        return;
      }
      setDetailedReservation(responseData);
    } catch (err) {
      setIsLoading(false);
      setError("Could not load details of Reservation, please try again later");
    }
  };

  useEffect(() => {
    fetchReservationDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box sx={centerStyle}>
          <CircularProgress />
        </Box>
      ) : error ? (
        error
      ) : (
        detailedReservation && (
          <Box
            sx={{
              minWidth: 500,
              m: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Typography variant="h5" component="div">
              Details of Reservation {detailedReservation.id}
            </Typography>

            <Typography variant="h6" component="h6">
              Reservation
            </Typography>
            <ReservationReservationDetails reservation={detailedReservation} />

            <Box
              sx={
                (centerStyle,
                {
                  width: "80%",
                })
              }
            >
              <Box sx={centerStyle}>
                <Typography variant="h6" component="h6">
                  Rooms' details
                </Typography>
                <Button
                  onClick={() => setRoomDetailsAreOpen(!roomDetailsAreOpen)}
                >
                  {roomDetailsAreOpen ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </Box>

              {roomDetailsAreOpen && (
                <>
                  <Typography
                    sx={{ fontSize: "0.9rem", textAlign: "center" }}
                    color="text.secondary"
                  >
                    Number of rooms: {detailedReservation.rooms.length}
                  </Typography>
                  {detailedReservation.rooms.map((r) => (
                    <ReservationRoomDetails
                      key={r.id}
                      room={r}
                      cardBoxStyles={cardBoxStyles}
                    />
                  ))}
                </>
              )}
            </Box>

            <Box sx={centerStyle}>
              <Typography variant="h6" component="div">
                Reservator's details
              </Typography>
              <Button
                onClick={() =>
                  setReservatorDetailsAreOpen(!reservatorDetailsAreOpen)
                }
              >
                {reservatorDetailsAreOpen ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </Box>

            {reservatorDetailsAreOpen && (
              <ReservationReservatorDetails
                reservator={detailedReservation.reservator}
                cardBoxStyles={cardBoxStyles}
              />
            )}

            <Box sx={centerStyle}>
              <Typography variant="h6" component="div">
                Hotel's details
              </Typography>
              <Button
                onClick={() => setHotelDetailsAreOpen(!hotelDetailsAreOpen)}
              >
                {hotelDetailsAreOpen ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </Box>

            {hotelDetailsAreOpen && (
              <ReservationsHotelDetails
                hotel={detailedReservation.hotel}
                cardBoxStyles={cardBoxStyles}
              />
            )}
          </Box>
        )
      )}
    </>
  );
};

const ReservationReservationDetails = ({ reservation }) => {
  return (
    <Card sx={{ minWidth: "90%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Board type
          </Typography>
          <Typography variant="body2">{reservation.boardType}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Cancelled?
          </Typography>
          <Typography variant="body2">
            {reservation.isCancelled ? "Cancelled" : "Active"}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Pay fulfillment
          </Typography>
          <Typography variant="body2">
            {reservation.payFullfillment ? "Settled" : "Unresolved"}
          </Typography>
        </Box>
        {reservation.payFulfillment && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Payment method
            </Typography>
            <Typography variant="body2">{reservation.paymentMethod}</Typography>
          </Box>
        )}
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Price
          </Typography>
          <Typography variant="body2">{reservation.price}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Reserved for
          </Typography>
          <Typography variant="body2">{reservation.reservedFor}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Reservation date
          </Typography>
          <Typography variant="body2">
            {reservation.reserveDate.substring(0, 10)}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Start date
          </Typography>
          <Typography variant="body2">
            {reservation.startDate.substring(0, 10)}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            End date
          </Typography>
          <Typography variant="body2">
            {reservation.endDate.substring(0, 10)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReservationDetails;
