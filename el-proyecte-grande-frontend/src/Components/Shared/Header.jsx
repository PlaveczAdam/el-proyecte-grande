import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const Header = () => {
    return (
        <div className="Header">
            <Paper>
                <Grid container alignItems="right" spacing={2}>
                    <Grid item xs={12} md={9}>

                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className="User">
                        <span>Logged in: Admin</span>
                        <Button>Logout</Button>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{ marginY: 2, textAlign: 'center' }}>
                <h1>Grande management</h1>
            </Box>
        </Paper >
        </div >

    )
}

export default Header