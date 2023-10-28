import Stripe from "stripe"

export async function POST(req: Request, res: Response) {

    try {

        const body = await req.json()

        console.log()
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
            apiVersion: '2023-10-16'
        })


        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/',
            line_items: body.lineItems,
            mode: 'payment',
            shipping_address_collection:{
                allowed_countries:['BT']
            },
            shipping_options:[
                {
                    shipping_rate:'shr_1O688VA1NEBIqXuyc3w9ru3t'
                }
            ],
        })

        console.log('pay sesion', session)

        return new Response(JSON.stringify(session))
    } catch (e) {
        //@ts-ignore
        return new Response(`${e.message}`, { status: 500 })
    }

}

