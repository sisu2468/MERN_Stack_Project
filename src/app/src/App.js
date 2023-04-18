import { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Theme } from "theme";
import { ThemeProvider } from "@mui/material/styles";

// import logo from './logo.svg';
import './App.css';

import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from 'contexts/SessionContext';
import * as Public from "pages/Public";
import * as ProfileSystem from "pages/Profile";
import * as Booking from "pages/Booking";

import { HomeOutlined, AccountCircle, Login, EvStation } from "@mui/icons-material";

const publicRoutes = [
    {
        title: "Home",
        path: "/",
        icon: HomeOutlined,
        component: <Public.Home />,
        exact: true,
    },
];

const loginRoutes = [
    {
        title: "Login/Register",
        path: "/login",
        icon: Login,
        component: <ProfileSystem.Login />,
    },
];

const secureRoutes = [
    {
        title: "Profile",
        path: "/profile",
        icon: AccountCircle,
        component: <ProfileSystem.Profile />,
        // exact: true,
    },
    {
        title: "Book a Charge",
        path: "/booking",
        icon: EvStation,
        component: <Booking.Selection />,
    },
];

function App() {
    const { setNavigation } = useContext(NavigationContext);
    const { session, setSession } = useContext(SessionContext);

    useEffect(() => {
        const otherRoutes = session ? secureRoutes : loginRoutes;
        setNavigation({
            publicRoutes,
            otherRoutes
        });
    }, [session, setNavigation]);

    // console.log(`${process.env.PUBLIC_URL}`);

    return (
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <Switch>
                    {/* <Navbar /> */}
                    {publicRoutes.map((route, idx) => (
                        <Route exact={route.exact} path={route.path} key={idx}>
                            {route.component}
                        </Route>
                    ))}

                    <Route path={"/login"}>
                        {session ? <Redirect to="/profile" /> : <ProfileSystem.Login />}
                    </Route>

                    {secureRoutes.map((route, idx) => (
                        <Route exact={route.exact} path={route.path} key={idx}>
                            {!session ? <Redirect to="/login" /> : route.component}
                        </Route>
                    ))}

                    {/* <Route path={"/profile"}>
                        {!session ? <Redirect to="/login" /> : <ProfileSystem.Profile />}
                    </Route> */}

                    {/* {profileRoutes.map((route, idx) => (
                        <Route exact={route.exact} path={route.path} key={idx}>
                            {route.component}
                        </Route>
                    ))} */}

                    {/* error routes */}
                    <Route exact path="/404">
                        <Public.Error404 />
                    </Route>
                    <Route exact path="/401">
                        <Public.Error401 />
                    </Route>
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
