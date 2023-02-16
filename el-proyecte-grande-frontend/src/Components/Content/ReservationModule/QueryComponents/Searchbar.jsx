import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const Searchbar = ({ onSearch, searchName }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    onSearch(searchQuery);
  });

  return (

      <TextField
        id="search-bar"
        className="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        label={`${searchName}`}
        variant="outlined"
        placeholder="Search..."
        size="small"
      />

  );
};

export default Searchbar;