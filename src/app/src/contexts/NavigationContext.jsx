import { useState, createContext } from "react";
import { useMediaQuery } from "react-responsive";

export const NavigationContext = createContext();

const NavigationContextProvider = ({ children }) => {
    const [navigation, setNavigation] = useState({});
    const [loginopen, setLoginopen] = useState(false);
    const [loginemail, setLoginemail] = useState('xyz@greddit.com');
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <NavigationContext.Provider
            value={{ navigation, setNavigation, loginopen, setLoginopen, loginemail, setLoginemail, isTabletOrMobile }}
        >
            {children}
        </NavigationContext.Provider>
    );
};;

export default NavigationContextProvider;
