import { useState, useContext } from "react";
import * as React from 'react';
import { PropTypes } from 'prop-types';
import { Box, Snackbar, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tabs, Tab } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgetPasswordForm from "./ForgetPasswordForm";

import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     // width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {/* <Typography>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const { loginopen, setLoginopen, loginemail, setLoginemail } = useContext(NavigationContext);
    const { session, setSession, data, setData } = useContext(SessionContext);

    const [value, setValue] = useState(0);

    const [snackopen, setSnackopen] = useState(false);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackopen(false);
    };

    // const handleOpen = () => {
    //     setLoginopen(true);
    // };
    const handleClose = () => {
        setLoginopen(false);
    };

    const handleTab = (event, newValue) => {
        setValue(newValue);
    };

    const updateEmail = (email) => {
        setLoginemail(email);
    };

    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal> */}
            {/* <Button variant="outlined" onClick={handleOpen}>
                Open form dialog
            </Button> */}
            <Dialog open={loginopen} onClose={handleClose}>
                {/* <DialogTitle>Subscribe</DialogTitle> */}
                {/* <DialogContent> */}
                <Tabs
                    value={value}
                    onChange={handleTab}
                    // TabIndicatorProps={{ style: { background: '#070E40' } }}
                    sx={{
                        '& .MuiTabs-indicator': { backgroundColor: "#070E40" },
                        '& .Mui-selected': { color: "#070E40" },
                    }}
                >
                    <Tab label="login" sx={{ width: "35%", backgroundColor: "aqua" }} />
                    <Tab label="register" sx={{ width: "35%", backgroundColor: "yellow" }} />
                    <Tab label="forget password" sx={{ width: "30%", backgroundColor: "red" }} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <LoginForm email={loginemail} updateEmail={updateEmail} setSession={setSession} setData={setData} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        /> */}
                    <SignupForm email={loginemail} updateEmail={updateEmail} setSession={setSession} setData={setData} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ForgetPasswordForm setSnackopen={setSnackopen} handleClose={handleClose} />
                </TabPanel>
                {/* </DialogContent> */}
                {/* <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions> */}
            </Dialog>

            <Snackbar open={snackopen} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                    Sent Mail with the new Password!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;

// https://stackoverflow.com/questions/40881616/how-to-submit-the-form-by-material-ui-dialog-using-reactjs