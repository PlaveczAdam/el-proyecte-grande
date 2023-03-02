import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Footer = () => {
  return (
    <div className="Footer">
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={10} sx={{ marginTop: "20px", textAlign: "center" }}>
          <small>Copyright &#169; 2022 Grand Theft Hotel Team</small>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
