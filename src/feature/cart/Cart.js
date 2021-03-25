import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../Shared/cotainer/StateProvider';
import CartItem from './cartItem/CartItem';
import Subtotal from './subtotal/Subtotal';
import FlipMove from 'react-flip-move';

const useStyle = makeStyles((theme) => ({
    root: {
        margin: '20px',
    },
    items_head: {
        fontWeight: 'bold',
        width: '100%',
        borderBottom: '2px solid #eee',
    },
}));

const Cart = () => {
    const classes = useStyle();
    const [{ basket }, dispatch] = useStateContext();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <div className={classes.items_head}>
                        <Typography variant='h4'>Your shopping items</Typography>
                    </div>
                    {basket?.length === 0 && (
                        <Typography>
                            you have no items.<Link to='/'>Get some</Link>{' '}
                        </Typography>
                    )}
                    <FlipMove>
                        {basket.map((item) => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                body={item.body}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                                quantity={item.quantity}
                            />
                        ))}
                    </FlipMove>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Subtotal basket={basket} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Cart;
