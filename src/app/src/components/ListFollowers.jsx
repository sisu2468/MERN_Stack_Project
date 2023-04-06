import { useState } from "react";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Dialog, DialogActions, DialogContent, Button, DialogTitle, Box, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'fname', headerName: 'First name', minWidth: 150, flex: 1 },
    { field: 'lname', headerName: 'Last name', minWidth: 130, flex: 1 },
    {
        field: 'followers',
        headerName: "Follower's Count",
        type: 'number',
        minWidth: 90,
        flex: 1,
    },
    {
        field: 'following',
        headerName: "Following Count",
        type: 'number',
        minWidth: 90,
        flex: 1,
        // description: 'Non-Sortable',
        // sortable: false,
        // valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const ListFollowers = (props) => {
    const [pageSize, setPageSize] = useState(5);

    const handleOpen = () => {
        props.setOpen(true);
    };
    const handleClose = () => {
        props.setOpen(false);
    };

    const handlePageSizeChange = (params) => {
        setPageSize(params);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>{props.title || "Followers"}</DialogTitle>
            <DialogContent>                                                    
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Box mb={2}>
                            {/* <div style={{ height: 400 }}> */}
                            <DataGrid
                                rows={props.rows}
                                columns={columns}
                                pageSize={pageSize}
                                onPageSizeChange={handlePageSizeChange}
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                autoHeight={true}
                                pagination
                                // checkboxSelection
                            />
                            {/* </div> */}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

ListFollowers.defaultProps = {
    title: "Followers",
    rows: [],
    open: false
};

export default ListFollowers;