import { useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';

import { Button, TextField, Grid, Box } from '@mui/material';

// Yup.addMethod(Yup.string, "authenticate", function (val, errorMessage) {
//     return this.test(`test-card-type`, errorMessage, function (value) {
//         const { path, createError } = this;

//         return (
//             value === val ||
//             createError({ path, message: errorMessage })
//         );
//     });
// });

const validationSchema = Yup.object({
    // email: Yup
    //     .string('Enter your email')
    //     .email('Invalid email addresss`')
    //     .required('Email is required'),
    username: Yup
        .string('Enter your username')
        .required('Username is required'),
    password: Yup
        .string('Enter your password')
        .min(5, 'Password should be of minimum 5 characters length')
        .required('Password is required'),
    // .authenticate("admin","ERROR"),
});

const LoginForm = (props) => {
    const history = useHistory();
    const handleOnClick = useCallback((path) => history.push(path), [history]);

    const handleSubmit = async (event) => {
        var formBody = [];
        for (var property in formik.values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formik.values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            props.setSession(response);
            // props.updateEmail('abc@email.com');
            handleOnClick("/booking");
        }).catch((error) => {
            console.log(error);
            alert("ERROR");
        });

        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            // email: props.email,
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        // onSubmit: (values) => {
        //     alert(JSON.stringify(values, null, 2));
        // },
        onSubmit: handleSubmit
    });

    // useEffect(() => { props.updateEmail(formik.values.email); }, [formik.values.email, props]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
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
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="username"
                                name="username"
                                label="Username"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
                                // style={{ marginTop: 11, borderColor: (formik.touched.username && Boolean(formik.errors.username)) ? "red" : "" }}
                                // color="secondary"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && Boolean(formik.errors.username) && ("❌ " + formik.errors.username)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant='outlined'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onFocus={formik.handleFocus}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && Boolean(formik.errors.password) && ("❌ " + formik.errors.password)}
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

export default LoginForm;


// validationSchema = {
//     Yup.object({
//         firstName: Yup.string()
//             .max(15, "Must be 15 characters or less")
//             .required("Required"),
//         lastName: Yup.string()
//             .max(20, "Must be 20 characters or less")
//             .required("Required"),
//         email: Yup.string()
//             .email("Invalid email addresss`")
//             .required("Required"),
//         password: Yup.string().required("This field is required"),
//         acceptedTerms: Yup.boolean()
//             .required("Required")
//             .oneOf([true], "You must accept the terms and conditions."),
//         jobType: Yup.string()
//             // specify the set of valid values for job type
//             // @see http://bit.ly/yup-mixed-oneOf
//             .oneOf(
//                 ["designer", "development", "product", "other"],
//                 "Invalid Job Type"
//             )
//             .required("Required")
//     })
// }