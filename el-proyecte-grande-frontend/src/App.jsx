import React from "react";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthContext } from "./Components/Shared/AuthContext";
import { Auth } from "./Components/Shared/Auth";
import Menu from "./Components/Menu/Menu.jsx";
import Header from "./Components/Shared/Header.jsx";
import Footer from "./Components/Shared/Footer.jsx";

import { RolesRoutes } from "./RolesRoutes.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme.jsx";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Login from "./Components/Content/Login";

function App() {
  const { user, login, logout } = Auth();
  const { staffRoutes, receptionistRoutes, managerRoutes, adminRoutes } =
    RolesRoutes();

  let routes;
  if (user.roles.includes("Admin")) {
    routes = adminRoutes;
  } else if (user.roles.includes("Manager")) {
    routes = managerRoutes;
  } else if (user.roles.includes("Receptionist")) {
    routes = receptionistRoutes;
  } else {
    routes = staffRoutes;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={Theme}>
          <CssBaseline enableColorScheme />
          <AuthContext.Provider
            value={{
              user: user,
              login: login,
              logout: logout,
            }}
          >
            <Container
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {user.username ? (
                <>
                  <Header />
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    sx={{  }}
                  >
                    <Grid item xs={12} md={2} sx={{ height: "100%" }}>
                      <Menu />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <Paper sx={{ padding: "2em", height: "100%" }}>
                        <Routes>{routes}</Routes>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Footer />
                </>
              ) : (
                <Login />
              )}
            </Container>
          </AuthContext.Provider>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
