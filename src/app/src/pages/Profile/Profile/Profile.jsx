import { useContext, useState } from "react";
import Page from "pages/Page";
import PasswordForm from "components/Profile/PasswordForm";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

import { Grid, Avatar, Divider, Button } from "@mui/material";
import { Edit } from '@mui/icons-material';

const Profile = () => {
    // navbar
    // const { isTabletOrMobile } = useContext(NavigationContext);
    const { session, data } = useContext(SessionContext);
    const [formopen, setFormOpen] = useState(false);

    let openform = () => {
        setFormOpen(true);
    }

    return (
        <Page loading={false} empty={false}>
            {data &&
                <>
                    <h1>Hi, {data.full_name}</h1>
                    <Divider
                        sx={{
                            '&.MuiDivider-root': {
                                '&::before': {
                                    borderTop: `thin solid #070E40`
                                },
                                '&::after': {
                                    borderTop: `thin solid #070E40`
                                }
                            },
                            py: 3
                        }}
                        style={{
                            color: "white",
                        }}
                    >
                        {session ?
                            <Avatar alt={data.full_name || null} src="/static/images/avatar/2.jpg" sx={{ height: '70px', width: '70px' }} /> :
                            <Avatar sx={{ height: '70px', width: '70px' }} />}
                    </Divider>
                    <Grid container justifyContent="flex-end" mb={2}>
                        <Button
                            color="inherit"
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={openform}
                        >
                            Change Password
                        </Button>
                    </Grid>
                    <div className="profile_box">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Name : </th>
                                    <td>{data.full_name || "user"} {data.lname || ""}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Username: </th>
                                    <td>{data.username || "admin"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email : </th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Contact : </th>
                                    <td>{data.contact || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <PasswordForm formopen={formopen} setFormOpen={setFormOpen} />
                </>
            }
        </Page>
    );
};

export default Profile;
