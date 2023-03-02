import { createTheme } from "@mui/material/styles";
//import { green, orange } from "@mui/material/colors";

const Theme = createTheme({
  palette: {
    background: {
      default: "#cca387",
      paper: "#f4eae0",
    },
    primary: {
      main: "#b06921",
      //light: "",
      //dark: "",
      contrastText: "#fff",
    },
    secondary: {
      main: "#824614",
    },
  },
});

export default Theme;
