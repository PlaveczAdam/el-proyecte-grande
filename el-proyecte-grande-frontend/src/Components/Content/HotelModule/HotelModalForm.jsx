import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HotelContext } from "./HotelContextProvider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const HotelModalForm = (props) => {
  const [address, setAddress] = useState(props.hotel.address);
  const [hotel, setHotel] = useState(props.hotel);
  const context = useContext(HotelContext);

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{ padding: 4 }}
    >
      <Box typography="h4" display="flex" gap={4}>
        {props.title}
        <Button
          sx={{ marginLeft: "auto" }}
          onClick={() => props.onSave({ ...hotel, address })}
        >
          Save
        </Button>
        <Button
          onClick={props.onCancel}
          sx={{
            position: "relative",
          }}
        >
          <HighlightOffIcon sx={{ color: "brown", fontSize: "2rem" }} />
        </Button>
      </Box>
      <TextField
        required
        label="Name"
        value={hotel.name}
        onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
      />
      <div>
        <Typography variant="caption" display="block">
          Hotel status
        </Typography>
        <Select
          fullWidth
          value={hotel.hotelStatus}
          label="Hotel Status"
          onChange={(e) => setHotel({ ...hotel, hotelStatus: e.target.value })}
        >
          {Object.entries(context.enums.hotelStatus.values).map(
            ([key, value]) => (
              <MenuItem value={value} key={value}>
                {key}
              </MenuItem>
            )
          )}
        </Select>
      </div>
      <div>
        <Typography variant="caption" display="block">
          Hotel classification
        </Typography>
        <Select
          fullWidth
          value={hotel.classification}
          label="Classification"
          onChange={(e) =>
            setHotel({ ...hotel, classification: e.target.value })
          }
        >
          {Object.entries(context.enums.classification.values).map(
            ([key, value]) => (
              <MenuItem value={value} key={value}>
                {key}
              </MenuItem>
            )
          )}
        </Select>
      </div>
      <TextField
        number="number"
        required
        label="Floor"
        value={hotel.floor}
        min={0}
        onChange={(e) => setHotel({ ...hotel, floor: e.target.value })}
      />
      <TextField
        number="number"
        required
        label="Rooms"
        value={hotel.rooms}
        min={0}
        onChange={(e) => setHotel({ ...hotel, rooms: e.target.value })}
      />
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          gap: 1,
          padding: 1,
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <Box>
          <TextField
            required
            label="Postal Code"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
          <TextField
            required
            label="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
          <TextField
            required
            label="Region"
            value={address.region}
            onChange={(e) => setAddress({ ...address, region: e.target.value })}
          />
          <TextField
            required
            label="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </Box>

        <TextField
          required
          label="Address Line One"
          value={address.addressLineOne}
          onChange={(e) =>
            setAddress({ ...address, addressLineOne: e.target.value })
          }
        />
        <TextField
          required
          label="Address Line Two"
          value={address.addressLineTwo}
          onChange={(e) =>
            setAddress({ ...address, addressLineTwo: e.target.value })
          }
        />
      </Card>
    </Box>
  );
};

export default HotelModalForm;
