import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles/navbar_styles';
import {Link} from 'react-router-dom'



function Navbar() {

    const classes = useStyles();
    return (
        <AppBar className={classes.appbar} position="static">

            <Toolbar >
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Link to='/'><img src='logo.png' alt='logo' height='120px' width='120px' /></Link>
                <div style={{flexGrow:'1'}}>
                <Typography variant='h5' style={{color:'#ddbd17'}}><b>We innovate your cultivation!</b></Typography>
                </div>
                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

