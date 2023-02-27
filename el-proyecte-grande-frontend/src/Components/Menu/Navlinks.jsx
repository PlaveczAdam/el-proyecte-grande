import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../Shared/AuthContext";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Navlinks() {
  const auth = useContext(AuthContext);

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            component={RouterLink}
            sx={{ width: "100%" }}
            to="/"
          >
            Home
          </Button>
        </ListItem>

        <ListItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            component={RouterLink}
            sx={{ width: "100%" }}
            to="/hotel"
          >
            Hotel
          </Button>
        </ListItem>

        <ListItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            component={RouterLink}
            sx={{ width: "100%" }}
            to="/room"
          >
            Room
          </Button>
        </ListItem>

        {auth.user.roles.some((el) =>
          ["Admin", "Manager", "Receptionist"].includes(el)
        ) && (
          <ListItem sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              component={RouterLink}
              sx={{ width: "100%" }}
              to="/guest"
            >
              Guest
            </Button>
          </ListItem>
        )}

        {auth.user.roles.includes("Admin") && (
          <ListItem sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              component={RouterLink}
              sx={{ width: "100%" }}
              to="/user"
            >
              User
            </Button>
          </ListItem>
        )}

        <ListItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            component={RouterLink}
            sx={{ width: "100%" }}
            to="/inventory"
          >
            Inventory
          </Button>
        </ListItem>

        {auth.user.roles.some((el) =>
          ["Admin", "Manager", "Receptionist"].includes(el)
        ) && (
          <ListItem sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              component={RouterLink}
              sx={{ width: "100%" }}
              to="/reservation"
            >
              Reservation
            </Button>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default Navlinks;
