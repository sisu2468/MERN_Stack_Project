import Page from "pages/Page";
import { Box, Typography } from "@mui/material";

const Error401 = () => {
    return (
        <Page header={null} loading={false} empty={false}>
            <Box
                p={4}
                width="100%"
                height="60vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                {/* <Box mb={3}>
                    <img
                        src={Error404SVG}
                        alt="404: Page Not Found"
                        width="350px"
                        style={{ maxWidth: "80vw" }}
                    />
                </Box> */}
                <Typography variant="h5" color="textSecondary">
                    SERVER ERROR 401
                </Typography>
            </Box>
        </Page>
    );
}

export default Error401;