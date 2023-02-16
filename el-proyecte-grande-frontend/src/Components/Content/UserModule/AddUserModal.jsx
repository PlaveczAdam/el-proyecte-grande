import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import Box from '@mui/material/Box';
import UserModalForm from './UserModalForm';
import Paper from '@mui/material/Paper';


const AddUserModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async (user)=>{
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify(user),
            headers:{"Content-Type": "application/json"}
        })
        const newUser = await response.json();
        props.onNewUser(newUser);
        handleClose();
    };

    const user = {
        "name": "",
        "email": "",
        "roles": [],
        "IsActive":true
    };

    return <><Modal
        open={open}
        onClose={handleClose}
    >
        <Box height="100vh"display="flex" sx={{overflowY:"auto"}} >
            <Paper sx={{margin:"auto"}}>
                <UserModalForm user={user} title={"Add User"} onCancel={handleClose} onSave={handleSave}></UserModalForm>
            </Paper>
        </Box>
    </Modal>
    <Button variant="text" onClick={handleOpen}>Add new</Button>
    </>
}

export default AddUserModal;