import { useContext, useState } from "react";
import Page from "pages/Page";
import NewSubGreddiit from "components/NewSubGreddiit";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

import { Grid, Button } from "@mui/material";
import { AddBox } from "@mui/icons-material";

const MySubGreddiits = () => {
    // const { isTabletOrMobile } = useContext(NavigationContext);
    const { session, data } = useContext(SessionContext);

    const [ modalopen, setModalOpen ] = useState(false);

    return (
        <Page full header={"My Other Pages"} loading={false} empty={false}>
            <Grid container justifyContent="flex-end">
                <Button
                    color="inherit"
                    variant="contained"
                    startIcon={<AddBox />}
                    onClick={() => { setModalOpen(true); }}
                >
                    New SubGreddiit
                </Button>
            </Grid>

            {modalopen ? <NewSubGreddiit modalopen={modalopen} setModalOpen={setModalOpen}/> : null}
        </Page>
    );
};

export default MySubGreddiits;
