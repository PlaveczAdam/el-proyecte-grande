import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ReservationReservatorDetails = ({ reservator, cardBoxStyles }) => {
  return (
    <Card sx={{ minWidth: "80%" }}>
      <CardContent>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">{reservator.name}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Country
          </Typography>
          <Typography variant="body2">{reservator.address.country}</Typography>
        </Box>
        {reservator.address.region && (
          <Box sx={cardBoxStyles}>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Region
            </Typography>
            <Typography variant="body2">{reservator.address.region}</Typography>
          </Box>
        )}
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            City
          </Typography>
          <Typography variant="body2">{reservator.address.city}</Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Address
          </Typography>
          <Typography variant="body2">
            {`${reservator.address.addressLineOne} ${reservator.address.addressLineTwo}`}
          </Typography>
        </Box>
        <Box sx={cardBoxStyles}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            Postal code
          </Typography>
          <Typography variant="body2">
            {reservator.address.postalCode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReservationReservatorDetails;
