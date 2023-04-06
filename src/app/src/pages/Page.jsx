import clsx from "clsx";
import { useContext } from "react";

import { makeStyles } from "@mui/styles";
import {
    Box, Container, Typography, Fade
} from "@mui/material";

import { SessionContext } from "contexts/SessionContext";

import NavBar from 'components/Navbar';
import Loading from "components/Loading";
// import Empty from "components/Empty";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1, 1),
        overflowX: "hidden",
    },
    contentFull: {
        flexGrow: 1,
        overflowX: "hidden",
    },
}));

const Page = ({ header, empty, full, noToolbar, children, profileSettings = true }) => { //, loading
    const classes = useStyles();
    const { loading } = useContext(SessionContext);

    return (
        <main className={clsx({ [classes.content]: !full, [classes.contentFull]: full })}>
            <div className={clsx({ [classes.toolbar]: !full && !noToolbar })} />
            <Container maxWidth={null} disableGutters={full}>
                <NavBar profileSettings={profileSettings}>
                    <Typography variant="h3" mt={full ? 0 : noToolbar ? 3 : 2}>
                        {header}
                    </Typography>
                    <Box mt={full ? 0 : 3} mb={full ? 0 : 3}>
                        {loading ? (
                            <Loading />
                            // ) : empty ? (
                            //     <Empty />
                            // ) : (
                        ) : (
                            <Fade in timeout={250}>
                                <Box>{children}</Box>
                            </Fade>
                        )}
                        {/* <Box>{children}</Box> */}
                    </Box>
                </NavBar>
            </Container>
        </main>
    );
};

export default Page;
