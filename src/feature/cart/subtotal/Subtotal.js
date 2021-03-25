import { Button, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router';
import { getTotalItem, getTotalPrice } from '../../../Shared/reducer/Reducer';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        backgroundColor: grey[200],
        border: '1px solid',
        borderColor: grey[500],
        borderRadius: 4,
    },
}));

const Subtotal = ({ basket }) => {
    const history = useHistory();
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({getTotalItem(basket)} items) : <strong>{value}</strong>
                        </p>
                        <small className={classes.subtotal_gift}>
                            <FormControlLabel control={<Checkbox checked={true} name='checkedA' />} label='This order contains a gift' />
                        </small>
                    </>
                )}
                value={getTotalPrice(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
            />
            <Button color='secondary' variant='contained' onClick={(e) => history.push('/payment')} disabled={basket?.length <= 0}>
                Process to Checkout
            </Button>
        </div>
    );
};

export default Subtotal;
