import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const Header = () => {
    return (
        <div className="Header">

            <Box sx={{ marginY: 2 }}>
                <CardMedia
                    component="img"
                    src="https://via.placeholder.com/1200x120.png"
                ></CardMedia>
            </Box>
        </div>

    )
}

export default Header