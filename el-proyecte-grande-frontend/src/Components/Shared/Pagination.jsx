import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ContentPagination = ({ val, page, onChange, pageCount }) => {
    const containerStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
        margin: "1.3em auto",
    };

    const pageNumStyles = {
        fontSize: "1.2em",
        fontWeight: "700",
        marginTop: "10px",
    };

    const listStyles = {
        margin: "5px !important",
        padding: "5px",
        borderRadius: "10px",
    };

    return (
        <Stack spacing={2} sx={containerStyles}>
            <Typography sx={pageNumStyles}>Page {page}</Typography>
            <Pagination
                count={pageCount}
                page={page}
                onChange={onChange}
                value={val}
                siblingCount={1}
                boundaryCount={2}
                color="primary"
                sx={listStyles}
            />
        </Stack>
    );
};

export default ContentPagination;