import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import { useStateContext } from '../../Shared/cotainer/StateProvider';
import { getTotalItem, getTotalPrice } from '../../Shared/reducer/Reducer';
import CartItem from '../cart/cartItem/CartItem';
import axios from '../../Shared/axios/axios';
import { db } from '../../Shared/firebase/firebase';

const useStyle = makeStyles((theme) => ({
    root: {
        margin: '20px',
    },
    totalItems: {
        textAlign: 'center',
        backgroundColor: grey[100],
        padding: theme.spacing(2),
    },
    section: {
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        borderBottom: '1px solid lightgray',
    },
}));

const Payment = () => {
    const classes = useStyle();
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateContext();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setprocessing] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setclientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const getClientSecret = async () => {
            const res = await axios({
                method: 'post',
                url: `/payments/create?total=${getTotalPrice(basket) * 100}`,
            });
            setclientSecret(res.data.clientSecret);
        };
        getClientSecret();
    }, [basket]);

    console.log(clientSecret);

    const handleSubmit = async (e) => {
        console.log('handleSubmit');
        e.preventDefault();
        setprocessing(true);

        const payload = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })
            .then(({ paymentIntent }) => {
                //paymentIntent = payment confirmation
                db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

                setSucceeded(true);
                setError(null);
                setprocessing(false);

                dispatch({
                    type: 'EMPTY_BASKET',
                });

                history.replace('/orders');
            });
    };

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    };

    return (
        <div className={classes.root}>
            <div className={clsx(classes.totalItems, classes.section)}>
                <div className={classes.items_head}>
                    <Typography variant='h4'>
                        Checkout (<Link to='/cart'> {getTotalItem(basket)} items</Link>)
                    </Typography>
                </div>
            </div>
            <div className={classes.section}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='h4'>Delivery Address</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant='body1'>Delivery Address</Typography>
                        <Typography variant='body1'>Delivery Address</Typography>
                        <Typography variant='body1'>Delivery Address</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.section}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.items_head}>
                            <Typography variant='h4'>Your shopping items</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9}>
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
                    </Grid>
                </Grid>
            </div>
            <div className={classes.section}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='h4'>Payment Method</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className={classes.priceContainer}>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                Order Total: <strong>{value}</strong>
                                            </p>
                                        </>
                                    )}
                                    value={getTotalPrice(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale={2}
                                />
                                <Button type='submit' variant='contained' color='secondary' disabled={processing || disabled || succeeded}>
                                    {processing ? 'Processing' : 'Buy Now'}
                                </Button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Payment;
