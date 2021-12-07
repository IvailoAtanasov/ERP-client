import React from 'react'
import { AppBar, Toolbar, Grid, IconButton, makeStyles } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      backgroundColor: '#fff',
      transform: 'translateZ(0)',
      '& .MuiToolbar-regular': {
        minHeight: "40px"
      }
    }
   
  });


const Header = () => {

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName')
        localStorage.removeItem('userRole')
        navigate('/login')
    }

    

    const classes = useStyles();
    return (

        <AppBar position="static" className={classes.root}>
            <Toolbar >
                <Grid container alignItems='center'>
                    <Grid item >
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton onClick={logoutHandler}>
                            <PowerSettingsNewIcon />
                        </IconButton>
                    </Grid>
                </Grid >

            </Toolbar>
        </AppBar>

    )
}

export default Header;