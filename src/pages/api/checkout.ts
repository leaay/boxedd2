/* eslint @typescript-eslint/no-var-requires: "off" */

const stripe = require('stripe')(process.env.NEXT_PUBLIC_SECRET_KEY)



interface item{
    id: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
    slug: string;
}





export default async function handler(req:any, res: any){

    if(req.method === 'POST'){

        try{
            const session = await stripe.checkout.sessions.create({
                submit_type: 'pay',
                mode: "payment",
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
                payment_method_types: ["card"],
                shipping_address_collection: {
                    allowed_countries : ["PL"]
                },
                shipping_options:[
                  {shipping_rate:'shr_1LbKtPKPKyIgb2c0ZFxeQyAi'}
                ],
                line_items: req.body.cartItems.map((item:item) => {
                    return {
                      price_data: {
                        currency: "pln",
                        product_data: {
                          name: item.name,
                          images:[item.img],
                        },
                        unit_amount: item.price * 100,
                      },
                      adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                      },
                      quantity: item.quantity,
                    };
                  }),
                })

            res.status(200).json(session);

        }catch(error:any){

            res.status(error.statusCode || 500).json(error.message);

        }
    }
}