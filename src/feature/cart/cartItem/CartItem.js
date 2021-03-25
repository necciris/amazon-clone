import { Button, Card, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import Stars from '../../../Shared/component/Stars';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateContext } from '../../../Shared/cotainer/StateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        margin: '20px 0',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 250,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const CartItem = forwardRef(({ id, title, body, image, price, rating, quantity, hideAction }, ref) => {
    const classes = useStyles();

    const [{ basket }, dispatch] = useStateContext();

    const reduceItem = () => {
        dispatch({
            type: 'REDUCE_ITEM_BASKET',
            id: id,
        });
    };

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                body: body,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    const removeFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id,
        });
    };

    return (
        <Card className={classes.root} ref={ref}>
            <CardMedia className={classes.cover} image={image} title='Live from space album cover' />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>
                        {title}
                    </Typography>
                    <Typography variant='subtitle1'>${price}</Typography>
                    <Typography variant='subtitle2' gutterBottom>
                        <Stars rating={rating} />
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        {body}
                    </Typography>
                </CardContent>
                {!hideAction && (
                    <div className={classes.controls}>
                        <IconButton aria-label='minus' onClick={reduceItem}>
                            <RemoveIcon />
                        </IconButton>
                        {quantity}
                        <IconButton aria-label='add' onClick={addToCart}>
                            <AddIcon />
                        </IconButton>
                        <Button color='secondary' variant='contained' onClick={removeFromCart}>
                            Remove from cart
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
});

export default CartItem;
