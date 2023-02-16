import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ReservationRoomDetails = ({ room, cardBoxStyles }) => {
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
  
  export default ReservationRoomDetails;