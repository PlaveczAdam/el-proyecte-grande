import { useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const userLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="Header">
      <Paper>
        <Grid container alignItems="right" spacing={2}>
          <Grid item xs={12} md={8}></Grid>
          <Grid item xs={12} md={4}>
            <div className="User">
              <span>Logged in: </span>
              <Tooltip
                title={
                  "Roles: " + (auth.user.roles ? auth.user.roles : "No roles")
                }
              >
                <span>
                  <b>{auth.user.username ? auth.user.username : "N/A"}</b> (
                  {auth.user.email ? auth.user.email : "N/A"}){" "}
                </span>
              </Tooltip>
              <Button variant="outlined" size="small" onClick={userLogout}>
                Logout
              </Button>
            </div>
          </Grid>
        </Grid>
        <Box sx={{ marginY: 2, textAlign: "center" }}>
          <h1>Grande management</h1>
        </Box>
      </Paper>
    </div>
  );
};

export default Header;
