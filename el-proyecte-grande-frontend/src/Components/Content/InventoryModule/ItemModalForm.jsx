import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const ItemModalForm = (props) => {
    const [item, setItem] = useState(props.item);
    const [hotel, setHotel] = useState(null);
    const [itemTypes, setItemTypes] = useState(null);

    useEffect(() => {
        async function getCategories() {
            const response = await fetch(`/api/enum/ItemType`);
            const responseBody = await response.json();
            setItemTypes(responseBody.value);
        }

        async function getHotels() {
            const response = await fetch(`/api/hotel`);
            const responseBody = await response.json();
            setHotel(responseBody);
        }

        getCategories();
        getHotels();
    }, []);

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
                    onClick={() => props.onSave({ ...item })}
                >
                    Save
                </Button>
                <Button onClick={props.onCancel}>Cancel</Button>
            </Box>

            <TextField
                required
                label="Name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
            />

            <TextField
                type="number"
                required
                label="Amount"
                value={item.amount}
                min={0}
                onChange={(e) => setItem({ ...item, amount: e.target.value })}
            />

            <TextField
                type="number"
                required
                label="RequiredAmount"
                value={item.requiredAmount}
                min={0}
                onChange={(e) => setItem({ ...item, requiredAmount: e.target.value })}
            />

            <FormControl fullWidth>
                <InputLabel id="itemTypeSelect">Type</InputLabel>
                <Select
                    id="itemTypeSelect"
                    value={item.itemType}
                    label="Category"
                    onChange={(e) => setItem({ ...item, itemType: e.target.value })}
                >
                    {itemTypes ? (
                        Object.entries(itemTypes.values).map((category) => (
                            <MenuItem value={category.id} key={category.id}>
                                {category.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem value={item.itemType}>Loading...</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
};

export default ItemModalForm;