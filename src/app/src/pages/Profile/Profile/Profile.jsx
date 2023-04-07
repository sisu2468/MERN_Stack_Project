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

const followinglist = [
    createData(1, 'Maharnav', 'Singhal', 500, 3),
    createData(2, 'Tanveer', 'Ul Mustafa', 50, 3000),
    createData(3, 'Pranav', 'Agarwal', 600, 500),
    createData(4, 'Divij', '', 300, 250),
    createData(5, 'Pranav', 'Agrawal', 500, 500),
];

const followerslist = [
    createData(1, 'Maharnav', 'Singhal', 500, 3),
    createData(2, 'Tanveer', 'Ul Mustafa', 50, 3000),
    createData(3, 'Pranav', 'Agarwal', 600, 500),
    createData(4, 'Divij', '', 300, 250),
    createData(5, 'Pranav', 'Agrawal', 500, 500),
    createData(6, 'Pranav', 'Gupta', 50, 50),
];

const Profile = () => {
    // navbar
    // const { isTabletOrMobile } = useContext(NavigationContext);
    const { session, data } = useContext(SessionContext);
    const [followingopen, setFollowingOpen] = useState(false);
    const [followersopen, setFollowersOpen] = useState(false);

    const mystyle = {
        color: "red",
        "textDecoration": "underline",
        cursor: "pointer",
    };

    return (
        <Page full header={"User Information"} loading={false} empty={false}>
            {/* <Divider><Chip label="CHIP" /></Divider> */}

            {data &&
                <>
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
                    <h3>Name: {data.full_name || "ADMIN"} {data.lname || ""}</h3>
                    <h3>Username: {data.username || "admin"}</h3>
                    <h3>Email: {data.email}</h3>
                    <h3>Contact: {data.contact || "-"}</h3>
                    <h3>Age: {data.age || "-"}</h3>
                    <h3>Followers: <a onClick={() => { setFollowersOpen(true); }} style={mystyle}>{data.followers || followerslist.length || "0"}</a></h3>
                    <h3>Following: <a onClick={() => { setFollowingOpen(true); }} style={mystyle}>{data.following || followinglist.length || "0"}</a></h3>

                    <ListFollowers
                        title="Following"
                        rows={followinglist}
                        open={followingopen}
                        setOpen={setFollowingOpen}
                    />
                    <ListFollowers
                        title="Followers"
                        rows={followerslist}
                        open={followersopen}
                        setOpen={setFollowersOpen}
                    />
                </>
            }
        </Page>
    );
};

export default Profile;
