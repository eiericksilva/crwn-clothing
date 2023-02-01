require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51MWfhqF0T0zw7JLFBPhDcwIsjwlgQedOlN12ZZsZybUQtqItHjbrunXpmTE68yToWrdwOucXG69mbQ3v6yDJX0Bl00yZCKb8XV"
);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
