import { createContext, useState, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';

export const HotelContext = createContext({enums:{}})

const HotelContextProvider = (props) => {
    const [enums, setEnums] = useState({});

    useEffect(() => {
        async function getEnums(){
            let response = await fetch(
                "/api/enum/Classification"
            )
            const classification = await response.json();
            response = await fetch(
                "/api/enum/HotelStatus"
            )
            const hotelStatus = await response.json();
            setEnums({classification, hotelStatus});
        }
        getEnums();
    },[]);
    if(!enums.classification)
    {
        return <CircularProgress color="primary" />;
    }
    return <HotelContext.Provider value={{enums}}>{props.children()}</HotelContext.Provider>
}

export default HotelContextProvider;