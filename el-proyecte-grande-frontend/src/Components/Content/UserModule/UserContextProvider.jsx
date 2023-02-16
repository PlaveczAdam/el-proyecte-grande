import { createContext, useState, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';

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
        return <CircularProgress color="primary" />;
    }
    return <UserContext.Provider value={{enums}}>{props.children()}</UserContext.Provider>
}

export default UserContextProvider;