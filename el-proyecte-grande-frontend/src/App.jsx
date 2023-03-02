import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthContext } from "./Components/Shared/AuthContext";
import { Auth } from "./Components/Shared/Auth";
import Menu from "./Components/Menu/Menu.jsx";
import Header from "./Components/Shared/Header.jsx";
import Footer from "./Components/Shared/Footer.jsx";
import Login from "./Components/Content/Login";
import AppError from "./Components/Shared/AppError";

import { RolesRoutes } from "./RolesRoutes.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme.jsx";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import WarningSnackbar from "./Components/Shared/WarningSnackbar";

function App() {
  const { user, login, logout } = Auth();
  const { staffRoutes, receptionistRoutes, managerRoutes, adminRoutes } =
    RolesRoutes();
  const [appStatus, setAppStatus] = useState(null);
  const [error, setError] = useState(null);

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

  const getHealth = async () => {
    const url = "/api/health";

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.status !== "Healthy") {
        setAppStatus("App needs maintenance, please consult with IT");
        return;
      }
      console.log(responseData);
    } catch (err) {
      setError("App is currently down, please try again later");
    }
  };

  useEffect(() => {
    getHealth();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={Theme}>
          <CssBaseline enableColorScheme />
          {error ? (
            <AppError error={error} />
          ) : (
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
                {user.loggedIn ? (
                  <>
                    <Header />
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={12} md={2}>
                        <Menu />
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <Paper sx={{ padding: "10px" }}>
                          <Routes>{routes}</Routes>
                        </Paper>
                      </Grid>
                    </Grid>
                    <Footer />
                  </>
                ) : (
                  <Login />
                )}
                <WarningSnackbar
                  opened={appStatus !== null}
                  message={appStatus}
                  closed={() => setAppStatus(null)}
                />
              </Container>
            </AuthContext.Provider>
          )}
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
