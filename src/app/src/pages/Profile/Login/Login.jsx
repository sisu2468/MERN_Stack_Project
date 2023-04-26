import { useContext, useEffect } from "react";
import { Box, Modal, Button, Typography } from "@mui/material";

import Page from "pages/Page";

import { NavigationContext } from "contexts/NavigationContext";

import Login from "components/Login";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

const LoginPage = () => {
    const { loginopen, setLoginopen } = useContext(NavigationContext);
    useEffect(() => { setLoginopen(true); }, []);

    const handleOpen = () => { setLoginopen(true) };

    return (
        <Page full header={null} loading={false} empty={false} profileSettings={false}>
            <Login />
            {!loginopen ?
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // minHeight="100vh"
                    // sx={{ borderRadius: 2, borderColor: 'text.primary', border: 1, mx: "20%" }}
                    sx={style}
                >
                    <Button variant="outlined" onClick={handleOpen}>
                        Click Here to Login/Register
                    </Button>
                </Box>
                : null}
        </Page>
    );
};

export default LoginPage;
