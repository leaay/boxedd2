import {loadStripe} from '@stripe/stripe-js';


let stripe:any


const getStripe = async () => {
    if (!stripe) {
        stripe = await loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!);
    }
    return stripe
}

export default getStripe