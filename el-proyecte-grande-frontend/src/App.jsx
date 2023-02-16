import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Components/Shared/AuthContext";
import { Auth } from "./Components/Shared/Auth";
import Menu from "./Components/Menu/Menu.jsx";
import Header from "./Components/Shared/Header.jsx";
import Footer from "./Components/Shared/Footer.jsx";
import Home from "./Components/Content/Home.jsx";
import Hotel from "./Components/Content/HotelModule/Hotels.jsx";
import HotelContextProvider from "./Components/Content/HotelModule/HotelContextProvider.jsx";
import UserContextProvider from "./Components/Content/UserModule/UserContextProvider.jsx";
import Room from "./Components/Content/RoomModule/Rooms.jsx";
import Reservation from "./Components/Content/ReservationModule/Reservations.jsx";
import Inventory from "./Components/Content/InventoryModule/Inventories.jsx";
import Guest from "./Components/Content/GuestModule/Guests.jsx";
import User from "./Components/Content/UserModule/Users.jsx";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme.jsx";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Login from "./Components/Content/Login";

function App() {
  const { user, login, logout } = Auth();

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
            <Container>
              {user.username ? (
                <>
                  <Header />
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={2}>
                      <Menu />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <Paper sx={{ padding: "10px" }}>
                        <Routes>
                          <Route
                            path="/hotel"
                            element={
                              <HotelContextProvider>
                                {() => <Hotel />}
                              </HotelContextProvider>
                            }
                          />
                          <Route path="/room" element={<Room />} />
                          <Route path="/guest" element={<Guest />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/user" element={
                              <UserContextProvider>
                                {() => <User />}
                              </UserContextProvider>
                              } 
                            />
                          <Route
                            path="/reservation"
                            element={<Reservation />}
                          />

                          <Route path="/" element={<Home />} />
                          <Route
                            path="*"
                            element={<Navigate replace to="/" />}
                          />
                        </Routes>
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
