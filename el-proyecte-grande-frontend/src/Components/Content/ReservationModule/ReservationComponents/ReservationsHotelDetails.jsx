import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ReservationsHotelDetails = ({ hotel, cardBoxStyles }) => {
  const [hotelClassifications, setHotelClassifications] = useState([]);
  const [hotelStatuses, setHotelStatuses] = useState([]);

  const fetchHotelClassifications = async () => {
    const url = `/api/enum/Classification`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setHotelClassifications(responseData);
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
    fetchHotelClassifications();
    fetchHotelStatuses();
  }, []);

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Id
          </Typography>
          <Typography variant="body2">{hotel.id}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">{hotel.name}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Number of rooms
          </Typography>
          <Typography variant="body2">{hotel.rooms}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Status
          </Typography>
          <Typography variant="body2">
            {getKeyByValue(hotelStatuses.values, hotel.status)}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Classification
          </Typography>
          <Typography variant="body2">
            {getKeyByValue(
              hotelClassifications.values,
              hotel.classification
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReservationsHotelDetails;
