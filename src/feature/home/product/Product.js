import { Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import React from 'react';
import Stars from '../../../Shared/component/Stars';
import { useStateContext } from '../../../Shared/cotainer/StateProvider';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        zIndex: '1 !important',
        display: 'flex',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        margin: '20px',
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    btn__addToCart: {
        marginTop: 'auto',
        marginLeft: 'auto',
    },
}));

const Product = ({ id, title, body, image, price, rating }) => {
    const classes = useStyle();
    const [{ basket }, dispatch] = useStateContext();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

        enqueueSnackbar(`Add ${title} to cart.`, {
            variant: 'success',
        });
    };

    return (
        <Grid item xs={12} md={6} lg={4} className={classes.root}>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={image} title={title} />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {title}
                    </Typography>
                    <Typography variant='subtitle1'>${price}</Typography>
                    <Typography variant='subtitle2' gutterBottom>
                        <Stars rating={rating} />
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' variant='contained' color='secondary' className={classes.btn__addToCart} onClick={addToCart}>
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;
