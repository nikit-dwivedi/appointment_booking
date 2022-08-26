require('dotenv').config()
const stripe_secret = process.env.STRIPE_SECRET_KEY
const stripe_publisher = process.env.STRIPE_PUBLISHER_KEY
const stripe = require('stripe')(stripe_secret)


const initPayment = async (name, amount) => {
    try {
        console.log(stripe_secret);
        const customer = await stripe.customers.create({
            name: name,
        })
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2020-08-27' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'INR',
            customer: customer.id,
            automatic_payment_methods: {
                enabled: false,
            },
        });
        const data = {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: stripe_publisher, amount: paymentIntent.amount
        }
        return data
    } catch (error) {
        // console.log(error)
        return false
    }
}

module.exports = { initPayment }
