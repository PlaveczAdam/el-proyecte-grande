import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ItemModalForm from "./ItemModalForm";

const AddItemModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async (item) => {
        const response = await fetch("/api/item", {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "Content-Type": "application/json" },
        });
        const newItem = await response.json();
        props.onNewItem(newItem);
        handleClose();
    };

    const item = {
        name: "",
        amount: "",
        requiredAmount: "",
        itemType: "",
        hotelId: "",
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box height="100vh" display="flex" sx={{ overflowY: "auto" }}>
                    <Paper sx={{ margin: "auto" }}>
                        <ItemModalForm
                            item={item}
                            title={"Add Item"}
                            onCancel={handleClose}
                            onSave={handleSave}
                        />
                    </Paper>
                </Box>
            </Modal>
            <Button variant="text" onClick={handleOpen}>
                Add new
            </Button>
        </>
    );
};

export default AddItemModal;
