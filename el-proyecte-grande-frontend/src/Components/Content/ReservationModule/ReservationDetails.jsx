import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const cardBoxStyles = {
  minWidth: "90%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
};

const ReservationDetails = ({ reservationId }) => {
  const [detailedReservation, setDetailedReservation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [hotelClassifications, setHotelClassifications] = useState([]);
  const [hotelStatuses, setHotelStatuses] = useState([]);

  const fetchReservationDetails = async () => {
    const url = `/api/reservation/${reservationId}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
      setIsLoading(false);
      console.log(responseData);

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

  const fetchHotelClassifications = async () => {
    const url = `/api/enum/Classification`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setHotelClassifications(responseData);
      console.log(responseData);
    } catch (err) {}
  };

  const fetchHotelStatuses = async () => {
    const url = `/api/enum/HotelStatus`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setHotelStatuses(responseData);
    } catch (err) {}
  };

  useEffect(() => {
    fetchReservationDetails();
    fetchHotelClassifications();
    fetchHotelStatuses();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            <Card sx={{ minWidth: "80%" }}>
              <CardContent>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Board type
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.boardType}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Cancelled?
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.isCancelled ? "Cancelled" : "Active"}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Pay fulfillment
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.payFulfillment
                      ? "Settled"
                      : "Unresolved"}
                  </Typography>
                </Box>
                {detailedReservation.payFulfillment && (
                  <Box sx={cardBoxStyles}>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Payment method
                    </Typography>
                    <Typography variant="body2">
                      {detailedReservation.paymentMethod}
                    </Typography>
                  </Box>
                )}
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.price}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Reserved for
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.reservedFor}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Reservation date
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.reserveDate.substring(0, 10)}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Start date
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.startDate.substring(0, 10)}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    End date
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.endDate.substring(0, 10)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <div>
              <Typography variant="h6" component="div">
                Rooms' details
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }} color="text.secondary">
                Number of rooms: {detailedReservation.rooms.length}
              </Typography>
            </div>
            {detailedReservation.rooms.map((r) => (
              <RoomDetails key={r.id} room={r} />
            ))}

            <Typography variant="h6" component="div">
              Reservator's details
            </Typography>
            <Card sx={{ minWidth: "80%" }}>
              <CardContent>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.reservator.name}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Country
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.reservator.address.country}
                  </Typography>
                </Box>
                {detailedReservation.reservator.address.region && (
                  <Box sx={cardBoxStyles}>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      Region
                    </Typography>
                    <Typography variant="body2">
                      {detailedReservation.reservator.address.region}
                    </Typography>
                  </Box>
                )}
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    City
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.reservator.address.city}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body2">
                    {`${detailedReservation.reservator.address.addressLineOne} ${detailedReservation.reservator.address.addressLineTwo}`}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Postal code
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.reservator.address.postalCode}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="h6" component="div">
              Hotel's details
            </Typography>
            <Card sx={{ minWidth: "80%" }}>
              <CardContent>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Id
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.hotel.id}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.hotel.name}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Number of rooms
                  </Typography>
                  <Typography variant="body2">
                    {detailedReservation.hotel.rooms}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body2">
                    {getKeyByValue(
                      hotelStatuses.values,
                      detailedReservation.hotel.status
                    )}
                  </Typography>
                </Box>
                <Box sx={cardBoxStyles}>
                  <Typography sx={{ mb: 1 }} color="text.secondary">
                    Classification
                  </Typography>
                  <Typography variant="body2">
                    {getKeyByValue(
                      hotelClassifications.values,
                      detailedReservation.hotel.classification
                    )}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )
      )}
    </>
  );
};
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
const RoomDetails = ({ room }) => {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Id
          </Typography>
          <Typography variant="body2">{room.id}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Floor
          </Typography>
          <Typography variant="body2">{room.floor}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Door
          </Typography>
          <Typography variant="body2">{room.doorNo}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReservationDetails;
