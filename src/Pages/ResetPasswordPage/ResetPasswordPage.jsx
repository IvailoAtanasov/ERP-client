import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Alert } from '@material-ui/lab';


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
        width: '40vw'
    }, 
    '@media only screen and (max-width: 600px)': {
        pageContent: {
            padding: theme.spacing(3),
            width: '80vw'
        }
    }
}));

const ResetPasswordPage = () => {
    const { resetToken } = useParams();
    const classes = useStyles();
    const [values, setValues] = useState();
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const navigate = useNavigate();




    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "Това поле е задължително"
        if ('confirmPassword' in fieldValues)
            temp.confirmPassword = fieldValues.confirmPassword ? "" : "Паролите не съвпадат"


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

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        
        if (values.password !== values.confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Паролите не съвпадат");
        }

        try {
            
            const { data } = await axios.put(
                `/api/users/resetpassword/${resetToken}`,
                {
                    password: values.password,
                },
                config
            );

            setSuccess(data.data);
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.response.data.error);
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" align="center">
                        Възтановяване на парола
                    </Typography>
                    <form onSubmit={resetPasswordHandler} className={classes.form} noValidate>
                        {success && <Alert severity="success">Успешна регистрация на нова парола</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Парола"
                            type="password"
                            id="password"
                            onChange={handleInputChange}
                            error={errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Потвърди парола"
                            type="password"
                            id="confirmPassword"
                            onChange={handleInputChange}
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword}
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

export default ResetPasswordPage