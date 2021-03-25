import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router';
import Orders from './feature/order/Orders';
import Payment from './feature/payment/Payment';
import { useStateContext } from './Shared/cotainer/StateProvider';

const ROUTES = {
    ORDERS: '/orders',
    PAYMENT: '/payment',
};

const ProtectedRouted = () => {
    const [status, setStatus] = useState('initial');
    const [{ user }] = useStateContext();
    const history = useHistory();
    const location = useLocation();

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    useEffect(() => {
        if (!user) {
            history.replace(`/login?returnurl=${location.pathname}`);
        }
        setStatus('success');
    }, [user]);

    if (status !== 'success') {
        return <div>Loading</div>;
    }
    return (
        <>
            <Route exact path={ROUTES.ORDERS} component={Orders} />
            <Route exact path={ROUTES.PAYMENT}>
                <Elements stripe={stripePromise}>
                    <Payment />
                </Elements>
            </Route>
        </>
    );
};

ProtectedRouted.routes = Object.values(ROUTES);

export default ProtectedRouted;
