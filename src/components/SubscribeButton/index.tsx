import style from '../SubscribeButton/style.module.scss';
import {signIn, useSession} from 'next-auth/react';
import {api} from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
interface SubscribeButton {
    priceId: string;
} 


export function SubscribeButton({priceId}:SubscribeButton){

    const { data: session } = useSession();
   async function handleSubscribe(){
        if(!session) {
            signIn('github');
            return;
        }

        try { 
            const response = await api.post('/subscribe')
            const {sessionId} = response.data;
            const stripe = await getStripeJs();

           await stripe.redirectToCheckout({sessionId});

            
        }
        catch(err) {
           alert(err.message);

        }


    }

    return (
        <button 
        type="button"
        className={style.subscribeButton}
        onClick={handleSubscribe}
        >
        Subscribe Now   
        </button>
        )
}
    