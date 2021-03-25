import { Grid, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import moment from 'moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import CartItem from '../../cart/cartItem/CartItem';

const useStyle = makeStyles((theme) => ({
    order: {
        padding: 20,
        margin: '20px 0',
        backgroundColor: grey[100],
        position: 'relative',
    },
    order_id: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
}));

const Order = ({ order }) => {
    const classes = useStyle();

    return (
        <div className={classes.order}>
            <Typography variant='subtitle1'>Order : </Typography>
            <Typography variant='subtitle2' className={classes.order_id}>
                {order.id}
            </Typography>

            <Typography variant='body2'>{moment.unix(order.data.created).format('MMMM Do  YYYY, h:mma')}</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {order.data.basket?.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            body={item.body}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                            quantity={item.quantity}
                            hideAction
                        />
                    ))}
                </Grid>
                <Grid item xs={12} alignItems='flex-end' style={{ textAlign: 'end' }}>
                    <CurrencyFormat
                        renderText={(value) => (
                            <>
                                <Typography variant='h5'>Order Total : {value}</Typography>
                            </>
                        )}
                        value={order.data.amount / 100}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={2}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Order;
