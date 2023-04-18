import { useContext } from "react";
import Page from "pages/Page";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

import { Box, Grid, Avatar, Divider } from "@mui/material";

const Profile = () => {
    // navbar
    // const { isTabletOrMobile } = useContext(NavigationContext);
    const { session, data } = useContext(SessionContext);

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
                </>
            }
        </Page>
    );
};

export default Profile;
