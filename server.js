const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_51LPegtAIBrj9YgXz0wypZd5noZKhsJuw5DELuhqduygdlBpbm2hJSthkOr5q4XHMJgf0fpVxlWPsJhRJUXVydIQW00xBnX0CjS');

app.use(express.static("public"));
app.use(express.json());

const Port = process.env.Port || 8000

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

api.get("/test", async (req, res) => {
    res.send({
        "message": "ok"
    });
})

app.listen(Port, () => console.log(`Node server listening on port ${Port} !`));