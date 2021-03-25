import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import InputPassword from '../../Shared/component/Input/InputPassword';
import { auth } from '../../Shared/firebase/firebase';
import { useStateContext } from '../../Shared/cotainer/StateProvider';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    login__logo: {
        margin: '20px auto',
        objectFit: 'contain',
        width: 200,
    },
    login__container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyle();
    const history = useHistory();
    const location = useLocation();

    const params = new URLSearchParams(location.search); // ?returnurl=/asd

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [{ user }, dispatch] = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            history.push('/');
        }
        setLoading(false);
    }, [user]);

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    dispatch({
                        type: 'SET_USER',
                        user: auth.user,
                    });
                    history.push(params.get('returnurl') || '/');
                }
            })
            .catch((error) => alert(error));
    };

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) signIn(e);
            })
            .catch((error) => alert(error));
    };

    if (loading) return <div>Loading....</div>;

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.login__container}>
                <Link to='/'>
                    <img
                        className={classes.login__logo}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                        alt='logo'
                    />
                </Link>
                <Typography component='h1' variant='h3'>
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2} alignItems='flex-end'>
                        <Grid item xs={1}>
                            <MailIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                id='email'
                                label='Email Address'
                                margin='normal'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <LockIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <InputPassword onChange={(e) => setPassword(e.target.value)} value={password} required={true} />
                        </Grid>
                    </Grid>
                    <FormControlLabel control={<Checkbox value='remember' color='secondary' />} label='Remember me' />
                    <Button fullWidth variant='contained' color='secondary' onClick={signIn}>
                        Sign In
                    </Button>
                    <Button fullWidth variant='contained' color='secondary' className={classes.submit} onClick={register}>
                        Create Account
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
