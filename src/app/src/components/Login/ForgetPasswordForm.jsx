import {  useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';

import { Button, TextField, Grid, Box, CircularProgress } from '@mui/material';

const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Invalid email addresss`')
        .required('Email is required')
});

const ForgetPasswordForm = (props) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        var formBody = [];
        for (var property in formik.values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formik.values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/auth/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(formik.values)
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            // handleOnClick("/booking");
            props.setSnackopen(true);
            props.handleClose();
        }).catch((error) => {
            console.log(error);
            alert("ERROR");
        });

        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
                                // style={{ marginTop: 11, borderColor: (formik.touched.email && Boolean(formik.errors.email)) ? "red" : "" }}
                                // color="secondary"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && Boolean(formik.errors.email) && ("❌ " + formik.errors.email)}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    {loading ? <CircularProgress color="error"/> : "Submit"}
                </Button>
            </form>
        </div>
    );
};

export default ForgetPasswordForm;