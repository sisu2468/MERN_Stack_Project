import { useState, useContext, useCallback, useEffect } from 'react';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
// import InboxIcon from '@mui/icons-material/MoveToInbox';

import {
    AppBar, Box, CssBaseline, Toolbar, Typography, Menu, Container, Avatar, Tooltip, Button, MenuItem, Divider, Drawer, Fade, IconButton,
    ListItemText, ListItemIcon, ListItemButton, ListItem, List
} from '@mui/material';
import { useHistory, Link } from "react-router-dom";

import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from 'contexts/SessionContext';
import { ReactComponent as LogoFull } from "assets/images/logo.svg";
import logo from "assets/images/logo.png";
import Login from 'components/Login/Login';

// const pages = ['AA', 'BB', 'CC'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { navigation, setLoginopen, isTabletOrMobile } = useContext(NavigationContext);
    const { session, setSession, data } = useContext(SessionContext);
    const history = useHistory();
    const handleOnClick = useCallback((path) => history.push(path), [history]);

    useEffect(() => { setLoginopen(false); }, []);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenUserMenu = (event) => {
        props.profileSettings ? setAnchorElUser(event.currentTarget) : setAnchorElUser(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((response) => {
            handleCloseUserMenu();

            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            setSession(null);
            handleOnClick("/");
        }).catch((error) => {
            console.log(error);
            alert("ERROR");
        });;
    };

    const ProfileSettings = [
        ['Login/Register', [setLoginopen, true], Boolean(!session)],
        ['Profile', [handleOnClick, "/profile"], Boolean(session)],
        ['Logout', [handleLogout, null], Boolean(session)]
    ];

    const handleProfileSettings = (fun) => {
        fun[0](fun[1]);
        // handleCloseUserMenu();
        // for (var i = 2; i < fun.length; i = i + 2) {
        //     if (fun[i + 1])
        //         fun[i](fun[i + 1]);
        // }
    };

    // console.log(props);
    // console.log(session, data);

    const drawer = (
        <div style={{ marginTop: isTabletOrMobile ? 20 : 0 }}>
            <Toolbar />
            {Object.keys(navigation).map(
                (category, cidx) =>
                    !!navigation[category].length && (
                        <div key={cidx}>
                            {cidx ? <Divider /> : null}
                            <Fade in>
                                <List > {/* style={{ margin: "0 0.8em" }} */}
                                    {navigation[category].map((item, iidx) => (
                                        <ListItem key={item.title} disablePadding>
                                            <ListItemButton onClick={(e) => handleOnClick(item.path)}>
                                                <ListItemIcon>
                                                    <item.icon style={{ color: "#070E40" }} />
                                                </ListItemIcon>
                                                <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Fade>
                        </div>
                    )
            )}
        </div>
    );

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Divider sx={{ background: "#070E40" }} />
                <AppBar
                    position="fixed"
                    sx={{
                        ml: { sm: `${drawerWidth}px` },
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        background: "white"
                    }}
                    color="transparent"
                    elevation={0}
                    height={80}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters variant="dense">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, flexGrow: 1 }}>
                                {/* <LogoFull style={{ height: 60 }} /> */}
                                <img
                                    src={`${logo}`}
                                    srcSet={`${logo}`}
                                    // src={`${logo}?w=248&fit=crop&auto=format`}
                                    // srcSet={`${logo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={'Logo'}
                                    loading="lazy"
                                />
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, flexGrow: 1 }}>
                                {/* <LogoFull style={{ height: 80 }} /> */}
                                <img
                                    src={`${logo}`}
                                    srcSet={`${logo}`}
                                    // src={`${logo}?w=248&fit=crop&auto=format`}
                                    // srcSet={`${logo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={'Logo'}
                                    loading="lazy"
                                />
                            </Box>
                            {/* <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'VAGRounded',
                            // fontWeight: 700,
                            // letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Greddiit
                    </Typography> */}

                            {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'VAGRounded',
                            fontWeight: 700,
                            // letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Greddiit
                    </Typography> */}

                            {/* Currently for styling */}
                            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            disabled
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        </Button>
                    </Box> */}

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={props.profileSettings ? "Open settings" : ""}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }} disabled={!props.profileSettings}>
                                        {session ?
                                            <Avatar
                                                alt={data && data.fname || null}
                                                src="/static/images/avatar/2.jpg"
                                                sx={{ background: "#070E40" }} /> :
                                            <Avatar />}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {ProfileSettings.map((setting) => (
                                        setting[2] ?
                                            <MenuItem key={setting[0]} onClick={() => handleProfileSettings(setting[1])}>
                                                <Typography textAlign="center">{setting[0]}</Typography>
                                            </MenuItem>
                                            : null
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                    <Divider sx={{ background: "#070E40" }} />
                </AppBar>

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, pt: isTabletOrMobile ? 5 : 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>
            <Login />
        </>
    );
}

ResponsiveDrawer.defaultProps = {
    profileSettings: true
};

export default ResponsiveDrawer;