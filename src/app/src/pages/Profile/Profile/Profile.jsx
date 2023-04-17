import { useContext, useState } from "react";
import Page from "pages/Page";
import ListFollowers from "components/ListFollowers";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";

import { Box, Grid, Avatar, Divider, Chip } from "@mui/material";

function createData(id, fname, lname, followerscount, followingcount) {
    const followers = followerscount.toLocaleString('en-US');
    const following = followingcount.toLocaleString('en-US');
    return { id, fname, lname, followers, following };
}


const Profile = () => {
    // navbar
    // const { isTabletOrMobile } = useContext(NavigationContext);
    const { session, data } = useContext(SessionContext);

    const mystyle = {
        color: "red",
        "textDecoration": "underline",
        cursor: "pointer",
    };

    return (
        <Page loading={false} empty={false}>
            {/* <Divider><Chip label="CHIP" /></Divider> */}
            
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
                    {/* <div class="row">
                        <div class="col">
                            <h3>Name: </h3>
                            <h3>Username: </h3>
                            <h3>Email: </h3>
                            <h3>Contact: </h3>
                        </div>
                        <div class="col">
                            <h3>{data.full_name || "user"} {data.lname || ""} </h3>
                            <h3>{data.username || "admin"} </h3>
                            <h3>{data.email} </h3>
                            <h3>{data.contact || "-"} </h3>
                        </div> */}
                        <table class="table">
                        {/* <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead> */}
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
                    {/* <h3>Name: {data.full_name || "user"} {data.lname || ""}</h3>
                    <h3>Username: {data.username || "admin"}</h3>
                    <h3>Email: {data.email}</h3>
                    <h3>Contact: {data.contact || "-"}</h3> */}
                    {/* </div> */}
                </>
            }
        </Page>
    );
};

export default Profile;
