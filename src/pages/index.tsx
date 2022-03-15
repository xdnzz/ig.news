import {GetStaticProps} from 'next';

import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';

import style from '../pages/home.module.scss';

import { stripe } from '../services/stripe';

interface productProps {
  product: {
  priceId: string; 
  amount: number;
  }
}


export default function Home( {product}:productProps) {
  return (

    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>
     
     <main className={style.contentContainer}>
      <section className={style.hero}>
        <span>🖐🏻Hey, welcome!</span>
        <h1>News about the <span>React</span> World.</h1>
        <p>
          Get access to all publications <br/>
          <span>Only {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>

      <img src="/images/ilustra.svg" alt="Girl coding"/>
     </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KbBUQGMwwtOX6MTf1yxztR1');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  return {
      props: {
        product
      },
      revalidate: 60 * 60 * 24, //24h
  }
}