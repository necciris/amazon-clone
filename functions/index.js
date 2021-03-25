const functions = require('firebase-functions');

const express = require('express');

const cors = require('cors');

const stripe = require('stripe')('sk_test_51IVCHyI9hu4NMh8IBYyGrMAptAiILRCDQ8oDjWTRZ1I1r6lo6pg7BjGzWV5ic3J0z9ghdWogk1xEruRZHKsvduTG00w9BtarW0');

// API

// - App connfig
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log('Payment Request total >>> ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    });

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-app-e9da4/us-central1/api
// firebase emulators:start
