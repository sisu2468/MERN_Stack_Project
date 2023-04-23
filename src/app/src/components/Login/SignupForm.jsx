import { useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";

import * as Yup from 'yup';
import "yup-phone";

import { Button, TextField, Grid, Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// const MyTextField = styled((props) => (
//     <TextField {...props} />
// ))(({ theme }) => ({
//     '& .MuiFilledInput-root': {
//         border: '1px solid #e2e2e1',
//         overflow: 'hidden',
//         borderRadius: 4,
//         backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//         transition: theme.transitions.create([
//             'border-color',
//             'background-color',
//             'box-shadow',
//         ]),
//         '&:hover': {
//             backgroundColor: 'transparent',
//         },
//         '&.Mui-focused': {
//             backgroundColor: 'transparent',
//             boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//             borderColor: theme.palette.primary.main,
//         },
//     },
// }));

const validationSchema = Yup.object({
    full_name: Yup.string('Enter your full name').required('Required'),
    username: Yup.string('Enter your username').required('Required'),
    email: Yup
        .string('Enter your email')
        .email('Invalid email addresss`')
        .required('Required'),
    password: Yup
        .string('Enter your password')
        .min(5, 'Password should be of minimum 5 characters length')
        .required('Required'),
    contact: Yup.string()
        .phone("IN")
        .required('Required')
});

const SignupForm = (props) => {
    const history = useHistory();
    const handleOnClick = useCallback((path) => history.push(path), [history]);

    const handleSubmit = async () => {
        var formBody = [];
        for (var property in formik.values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formik.values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formik.values)
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            props.setSession(response);
            props.updateEmail('abc@email.com');
            handleOnClick("/profile");
        }).catch((error) => {
            console.log(error);
            alert("ERROR");
        });

        // props.updateEmail('abc@email.com');
        // handleOnClick("/profile");
    };

    const formik = useFormik({
        initialValues: {
            full_name: '',
            email: props.email,
            username: '',
            password: '',
            contact: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    useEffect(() => { props.updateEmail(formik.values.email); }, [formik.values.email, props]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="full_name"
                                name="full_name"
                                label="Full Name"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
                                value={formik.values.full_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                helperText={formik.touched.full_name && Boolean(formik.errors.full_name) && ("❌ " + formik.errors.full_name)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="username"
                                name="username"
                                label="Username"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
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
                    <Grid item xs={12} md={6}>
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
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box mb={2}>
                            <TextField
                                // fullWidth
                                id="contact"
                                name="contact"
                                label="Contact"
                                variant="outlined"
                                sx={{ "&:before:content": "❌ " }}
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contact && Boolean(formik.errors.contact)}
                                helperText={formik.touched.contact && Boolean(formik.errors.contact) && ("❌ " + formik.errors.contact)}
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

export default SignupForm;