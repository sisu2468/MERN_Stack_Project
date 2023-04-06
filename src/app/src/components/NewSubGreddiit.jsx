import { useState, useContext, useEffect, useCallback } from "react";
import { PropTypes } from 'prop-types';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { Box, Grid, Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

import { NavigationContext } from "contexts/NavigationContext";
import { SessionContext } from "contexts/SessionContext";


const validationSchema = Yup.object({
    name: Yup
        .string('Enter the name')
        .required('Name is required'),
    description: Yup
        .string('Enter the description')
        .min(5, 'Minimum 5 Characters Long')
        .required('Description is required'),
    tagged: Yup.string('Enter the tags'),
    banned: Yup.string('Enter the banned words')
    // .authenticate("admin","ERROR"),
});

const NewSubGreddiit = (props) => {
    // const { loginopen, setLoginopen, loginname, setLoginname } = useContext(NavigationContext);
    const { session, setSession, data, setData } = useContext(SessionContext);

    // const handleOpen = () => {
    //     props.setModalOpen(true);
    // };
    const handleClose = () => {
        props.setModalOpen(false);
    };

    const handleSubmit = async (event) => {
        var formBody = [];
        for (var property in formik.values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formik.values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/subgreddiit/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            // Refetch the mysubgreddiits
            props.setModalOpen(false);
        }).catch((error) => {
            console.log(error);
            alert("ERROR");
        });

        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            tags: '',
            banned: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return (
        session ?
        <>
            <Dialog open={props.modalopen} onClose={handleClose}>
                <DialogTitle>New SubGreddiit Form</DialogTitle>
                <DialogContent>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Box mb={2} mt={3}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="Name"
                                            variant="outlined"
                                            sx={{ "&:before:content": "❌ " }}
                                            // style={{ marginTop: 11, borderColor: (formik.touched.name && Boolean(formik.errors.name)) ? "red" : "" }}
                                            // color="secondary"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && Boolean(formik.errors.name) && ("❌ " + formik.errors.name)}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            name="description"
                                            label="Description"
                                            variant='outlined'
                                            multiline
                                            rows={4}
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            onFocus={formik.handleFocus}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && Boolean(formik.errors.description) && ("❌ " + formik.errors.description)}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            id="tags"
                                            name="tags"
                                            label="Tags"
                                            variant="outlined"
                                            sx={{ "&:before:content": "❌ " }}
                                            // style={{ marginTop: 11, borderColor: (formik.touched.tags && Boolean(formik.errors.tags)) ? "red" : "" }}
                                            // color="secondary"
                                            value={formik.values.tags}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.tags && Boolean(formik.errors.tags)}
                                            helperText={formik.touched.tags && Boolean(formik.errors.tags) && ("❌ " + formik.errors.tags)}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            id="banned"
                                            name="banned"
                                            label="Banned Keywords"
                                            variant="outlined"
                                            sx={{ "&:before:content": "❌ " }}
                                            // style={{ marginTop: 11, borderColor: (formik.touched.banned && Boolean(formik.errors.banned)) ? "red" : "" }}
                                            // color="secondary"
                                            value={formik.values.banned}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.banned && Boolean(formik.errors.banned)}
                                            helperText={formik.touched.banned && Boolean(formik.errors.banned) && ("❌ " + formik.errors.banned)}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button onClick={handleSubmit}>Submit</Button> */}
                </DialogActions>
            </Dialog>
            </>
            : null
    );
};

export default NewSubGreddiit;