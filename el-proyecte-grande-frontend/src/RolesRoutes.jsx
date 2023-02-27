import { Route, Navigate } from "react-router-dom";

import Home from "./Components/Content/Home.jsx";
import Hotel from "./Components/Content/HotelModule/Hotels.jsx";
import HotelContextProvider from "./Components/Content/HotelModule/HotelContextProvider.jsx";
import UserContextProvider from "./Components/Content/UserModule/UserContextProvider.jsx";
import Room from "./Components/Content/RoomModule/Rooms.jsx";
import Reservation from "./Components/Content/ReservationModule/Reservations.jsx";
import Inventory from "./Components/Content/InventoryModule/Inventories.jsx";
import Guest from "./Components/Content/GuestModule/Guests.jsx";
import User from "./Components/Content/UserModule/Users.jsx";

export const RolesRoutes = () => {
  const staffRoutes = (
    <>
      <Route
        path="/hotel"
        element={<HotelContextProvider>{() => <Hotel />}</HotelContextProvider>}
      />
      <Route path="/room" element={<Room />} />
      <Route path="/inventory" element={<Inventory />} />

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </>
  );

  const receptionistRoutes = (
    <>
      <Route
        path="/hotel"
        element={<HotelContextProvider>{() => <Hotel />}</HotelContextProvider>}
      />
      <Route path="/room" element={<Room />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reservation" element={<Reservation />} />

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </>
  );

  const managerRoutes = (
    <>
      <Route
        path="/hotel"
        element={<HotelContextProvider>{() => <Hotel />}</HotelContextProvider>}
      />
      <Route path="/room" element={<Room />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reservation" element={<Reservation />} />

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </>
  );

  const adminRoutes = (
    <>
      <Route
        path="/hotel"
        element={<HotelContextProvider>{() => <Hotel />}</HotelContextProvider>}
      />
      <Route path="/room" element={<Room />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route
        path="/user"
        element={<UserContextProvider>{() => <User />}</UserContextProvider>}
      />
      <Route path="/reservation" element={<Reservation />} />

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </>
  );

  return { staffRoutes, receptionistRoutes, managerRoutes, adminRoutes };
};
