import Stripe from "stripe"


export const getProducts = async () => {

    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
        apiVersion: '2023-10-16'
    })
  
    const response = await stripe.prices.list({
        limit:10,
        expand:['data.product']
    })
  
    const prices = response.data.filter(price=> price.active)
  
  
    return prices
  }