import { useFormik } from 'formik';

import * as Yup from 'yup';
import "yup-phone";

import { Button, TextField, Grid, Box, Dialog } from '@mui/material';

const validationSchema = Yup.object({
    current_password: Yup
        .string('Enter your current password')
        .min(5, 'Password should be of minimum 5 characters length')
        .required('Required'),
    new_password: Yup
        .string('Enter your password')
        .min(5, 'Password should be of minimum 5 characters length')
        .required('Required')
});

const Edit_Form = (props) => {
    const handleSubmit = async () => {
        var formBody = [];
        for (var property in formik.values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formik.values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            props.handleClose();
        }).catch((error) => {
            console.log(error);
            alert("ERROR");
        });
    };

    const formik = useFormik({
        initialValues: {
            current_password: '',
            new_password: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="current_password"
                                name="current_password"
                                label="Current Password"
                                type="password"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
                                value={formik.values.current_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                                helperText={formik.touched.current_password && Boolean(formik.errors.current_password) && ("❌ " + formik.errors.current_password)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="new_password"
                                name="new_password"
                                label="New Password"
                                type="password"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                helperText={formik.touched.new_password && Boolean(formik.errors.new_password) && ("❌ " + formik.errors.new_password)}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

const PasswordForm = (props) => {
    const handleClose = () => {
        props.setFormOpen(false);
    };

    return (
        <Dialog open={props.formopen} onClose={handleClose}>
            <Grid mt={2} mx={1} mb={1}>
                <Edit_Form handleClose={handleClose} />
            </Grid>
        </Dialog>
    );
}

export default PasswordForm;