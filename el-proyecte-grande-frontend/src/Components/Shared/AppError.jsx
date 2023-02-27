import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const AppError = ({ error }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Card
        sx={{
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ padding: "1em" }}>
          <Typography
            sx={{ fontSize: "1.5em" }}
            color="text.secondary"
            gutterBottom
          >
            {error}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default AppError;
