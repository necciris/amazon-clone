import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../Shared/cotainer/StateProvider';
import { db } from '../../Shared/firebase/firebase';
import Order from './order/Order';

const useStyle = makeStyles((theme) => ({
    orders: {
        marginTop: 20,
    },
}));

const Orders = () => {
    const classes = useStyle();
    const [{ basket, user }, dispatch] = useStateContext();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot((snapShot) =>
                    setOrders(
                        snapShot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    )
                );
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className={classes.orders}>
            <Container>
                <Typography variant='h3'>Yours Orders</Typography>
                <div className={classes.order}>
                    {orders?.map((order) => (
                        <Order order={order} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Orders;
