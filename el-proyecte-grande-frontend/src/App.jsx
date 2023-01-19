import React from 'react';
import "./App.css";
import { BrowserRouter , Routes, Route, Link, Navigate } from 'react-router-dom';
import Menu from './Components/Menu/Menu.jsx';
import Header from './Components/Shared/Header.jsx';
import Footer from './Components/Shared/Footer.jsx';
import Home from './Components/Content/Home.jsx';
import Hotel from './Components/Content/HotelModule/Hotels.jsx';
import Room from './Components/Content/RoomModule/Rooms.jsx';
import Reservation from './Components/Content/ReservationModule/Reservations.jsx';
import Inventory from './Components/Content/InventoryModule/Inventories.jsx';
import Guest from './Components/Content/GuestModule/Guests.jsx';

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Menu />
                <Routes>
                    <Route path="/hotel" element={<Hotel />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/reservation" element={<Reservation />} />

                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
                <Footer />
            </div>

        </BrowserRouter>
    );
}

export default App;