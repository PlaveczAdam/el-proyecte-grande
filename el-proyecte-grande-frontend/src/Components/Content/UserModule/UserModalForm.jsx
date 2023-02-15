import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
/* import Card from "@mui/material/Card"; */
import Button from "@mui/material/Button";
import { UserContext } from "./UserContextProvider";

const UserModalForm = (props) => {
  const [roles, setRoles] = useState(props.user.roles.map(x=>x.name));
  const [user, setUser] = useState(props.user);
  const context = useContext(UserContext);

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
            <Button sx={{marginLeft:"auto"}} onClick={()=>props.onSave({...user, roles: roles.map(x => ({name: x}))})}>Save</Button>
            <Button onClick={props.onCancel}>Cancel</Button>
        </Box>
      <TextField
        required
        label="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        required
        label="Password"
        value={user.password}
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <TextField
        required
        label="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Select
        multiple
        value={roles}
        label="Roles"
        onChange={(e) => setRoles( e.target.value )}
      >
        {Object.entries(context.enums.values).map(
          ([key, value]) => (
            <MenuItem value={key} key={value}>
              {key}
            </MenuItem>
          )
        )}
      </Select>
     
   
    </Box>
  );
};

export default UserModalForm;
