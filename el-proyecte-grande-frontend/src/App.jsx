import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './Components/Menu/Menu.jsx';
import Header from './Components/Shared/Header.jsx';
import Footer from './Components/Shared/Footer.jsx';
import Home from './Components/Content/Home.jsx';
import Hotel from './Components/Content/HotelModule/Hotels.jsx';
import Room from './Components/Content/RoomModule/Rooms.jsx';
import Reservation from './Components/Content/ReservationModule/Reservations.jsx';
import Inventory from './Components/Content/InventoryModule/Inventories.jsx';
import Guest from './Components/Content/GuestModule/Guests.jsx';

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from "./Theme.jsx"
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <ThemeProvider theme={Theme}>
                    <CssBaseline enableColorScheme />
                    <Container>
                        <Header />
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12} md={2}>
                                <Menu />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <Paper sx={{padding: '10px'}}>

                                    <Routes>
                                        <Route path="/hotel" element={<Hotel />} />
                                        <Route path="/room" element={<Room />} />
                                        <Route path="/guest" element={<Guest />} />
                                        <Route path="/inventory" element={<Inventory />} />
                                        <Route path="/reservation" element={<Reservation />} />

                                        <Route path="/" element={<Home />} />
                                        <Route path="*" element={<Navigate replace to="/" />} />
                                    </Routes>

                                </Paper>
                            </Grid>
                        </Grid>
                        <Footer />
                    </Container>
                </ThemeProvider>
            </div>

        </BrowserRouter >
    );
}

export default App;