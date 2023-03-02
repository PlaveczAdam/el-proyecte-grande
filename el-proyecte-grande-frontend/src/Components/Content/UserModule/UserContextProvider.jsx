import { createContext, useState, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const UserContext = createContext({enums:{}})

const UserContextProvider = (props) => {
    const [enums, setEnums] = useState({});

    useEffect(() => {
        async function getEnums(){
            let response = await fetch(
                "/api/enum/UserRoles"
            )
            const roles = await response.json();
            setEnums(roles);
        }
        getEnums();
    },[]);
    if(!enums.values)
    {
        return      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress color="primary" />;
      </Box>
    }
    return <UserContext.Provider value={{enums}}>{props.children()}</UserContext.Provider>
}

export default UserContextProvider;