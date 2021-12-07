import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import RestoreIcon from '@material-ui/icons/Restore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',


    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pageContent: {
        padding: theme.spacing(3),
        width: '35vw'
    },
    '@media only screen and (max-width: 600px)': {
        pageContent: {
            padding: theme.spacing(3),
            width: '80vw'
        }
    }

}));

export const ForgotPasswordPage = () => {
    const classes = useStyles();
    const [values, setValues] = useState()
    const [errors, setErrors] = useState({});
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    




    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('email' in fieldValues)
            temp.email = fieldValues.email && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(fieldValues.email)// eslint-disable-line 
                ? ""
                : "Невалиден имейл адрес"
        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")

    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        validate({ [name]: value })
    }

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(values)
        
        try {
            const { email } = values
            const { data } = await axios.post(
                "/api/users/forgotpassword",
                { email },
                config
            );

            setSuccess(data.data);

        } catch (error) {
            setError(error.response.data.error);
            setValues();
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper className={classes.pageContent}>
                    <Avatar className={classes.avatar}>
                        <RestoreIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" align="center">
                        Моля въведете имейл адреса си. Ще получите имейл с информация за възтановяването на паролата ви.
                    </Typography>
                    <form onSubmit={forgotPasswordHandler} className={classes.form} noValidate>
                        {success && <Alert severity="success">Успешна заявка за възтановяване на парола е изпратена на имейл адресът ви.</Alert>}
                        {error && <Alert severity="error">Невалидна заявка</Alert>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имейл адрес"
                            name="email"
                            autoFocus
                            onChange={handleInputChange}
                            error={errors.email}
                            helperText={errors.email}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Изпрати
                        </Button>
                    </form>
                </Paper>
            </div>

        </Container>

    );
}