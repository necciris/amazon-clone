import {
    AppBar,
    Badge,
    Button,
    Divider,
    FormControlLabel,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    SwipeableDrawer,
    Typography,
    Switch,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import HistoryIcon from '@material-ui/icons/History';
import { Link } from 'react-router-dom';
import { CustomThemeContext } from '../../Shared/theme/CustomThemePrivider';
import { useStateContext } from '../../Shared/cotainer/StateProvider';
import { getTotalItem } from '../../Shared/reducer/Reducer';
import { auth } from '../../Shared/firebase/firebase';

const useStyle = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        top: 0,
        zIndex: 100,
        height: 60,
    },
    header__menuButton: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    header__logo: {
        width: 100,
        objectFit: 'contain',
        margin: '0 20px',
        marginTop: '18px',
        [theme.breakpoints.down('sm')]: {
            width: 50,
        },
    },
    header__search: {
        display: 'flex',
        flex: 1,
    },
    header__searchInput: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
    header__searchButton: {
        padding: 10,
    },
    header__nav: {
        display: 'flex',
        justifyContent: 'beetween-evenly',
        alignItems: 'center',
    },
    header__link: {
        textDecoration: 'none',
    },
    header__option: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 10px',
        alignItems: 'center',
    },
    header__pc: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    header_optionLineOne: {
        fontSize: '10px',
    },
    header_optionLineTwo: {
        fontSize: '13px',
        fontWeight: 'bold',
    },
    header__optionBasket: { alignItems: 'center', marginRight: 10 },
}));

const Header = () => {
    const classes = useStyle();
    const [openDrawer, setOpenDrawer] = useState(false);
    const { currentTheme, handleSetTheme } = useContext(CustomThemeContext);
    const [{ basket, user }, dispatch] = useStateContext();

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const menuItems = [
        {
            id: 1,
            lineOne: 'Returns',
            lineTwo: '& Orders',
            to: '/',
            icon: <HistoryIcon />,
        },
        {
            id: 2,
            lineOne: 'Your',
            lineTwo: 'Prime',
            to: '/cart',
            icon: <HistoryIcon />,
        },
    ];

    const list = (
        <div className='' role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {menuItems.map((menuItem) => (
                    <ListItem button key={menuItem.id}>
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={`${menuItem.lineOne} ${menuItem.lineTwo}`} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    };

    return (
        <>
            <AppBar position='sticky' color='primary' className={classes.header}>
                <IconButton edge='start' className={classes.header__menuButton} color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Link to='/'>
                    <img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='logo' className={classes.header__logo} />
                </Link>

                <FormControlLabel
                    control={
                        <Switch
                            checked={currentTheme === 'darkTheme'}
                            onChange={(e) => handleSetTheme(e.target.checked ? 'darkTheme' : 'whiteTheme')}
                            name='checkedB'
                            color='secondary'
                        />
                    }
                    label={currentTheme === 'darkTheme' ? 'Dark' : 'White'}
                />

                <Paper component='form' className={classes.header__search}>
                    <InputBase className={classes.header__searchInput} placeholder='search' />
                    <IconButton color='secondary' type='submit' className={classes.header__searchButton} aria-label='search'>
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <div className={classes.header__nav}>
                    <Button component={Link} to={!user && '/login'} color='inherit'>
                        <div className={classes.header__option} onClick={handleAuthentication}>
                            <Typography variant='subtitle2' className={classes.header_optionLineOne}>
                                Hello {user ? user.email : 'Guest'}
                            </Typography>
                            <Typography variant='subtitle1' className={classes.header_optionLineTwo}>
                                {user ? 'Sign Out' : 'Sign In'}
                            </Typography>
                        </div>
                    </Button>
                    {menuItems.map((menuItem) => (
                        <Button key={menuItem.id} component={Link} to={menuItem.to} color='inherit' className={classes.header__pc}>
                            <div className={classes.header__option}>
                                <Typography variant='subtitle2' className={classes.header_optionLineOne}>
                                    {menuItem.lineOne}
                                </Typography>
                                <Typography variant='subtitle1' className={classes.header_optionLineTwo}>
                                    {menuItem.lineTwo}
                                </Typography>
                            </div>
                        </Button>
                    ))}
                    <div className={classes.header__optionBasket}>
                        <IconButton component={Link} to='/cart' color='inherit'>
                            <Badge badgeContent={getTotalItem(basket)} color='secondary'>
                                <ShoppingBasket />
                            </Badge>
                        </IconButton>
                    </div>
                </div>
            </AppBar>
            <SwipeableDrawer anchor='left' open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                {list}
            </SwipeableDrawer>
        </>
    );
};

export default Header;
