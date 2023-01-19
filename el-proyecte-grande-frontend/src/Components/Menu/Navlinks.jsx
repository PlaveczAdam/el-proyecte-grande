import React from 'react';
import { Link } from "react-router-dom";

function Navlinks() {
  return (
      <ul>
          <li>
              <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/hotel">Hotel</Link>
          </li>
          <li>
              <Link to="/room">Room</Link>
          </li>
          <li>
              <Link to="/guest">Guest</Link>
          </li>
          <li>
              <Link to="/inventory">Inventory</Link>
          </li>
          <li>
              <Link to="/reservation">Reservation</Link>
          </li>
      </ul>
  );
}

export default Navlinks;