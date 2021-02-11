import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps } from 'next';

import { getJouets } from '../../lib/airtable';

import s from './bois.module.css';

export const getStaticProps: GetStaticProps = async (context) => {
  const allBois = await getJouets('Bois');
  return {
    props: {
      bois: allBois,
    }
  }
}

export default function Bois({ bois }) {
  console.log(bois);
  return (
    <>
      <Head>
        <title>Les Jouets en Bois de NJC-PWA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-3/4 m-auto'>
        <h1 className={s.pageTitle}>Les Jouets en bois</h1>
        <Link href='/'><a className={s.link}>&#60; retour NJC-PWA</a></Link>
        <ul className='center flex flex-wrap justify-center'>
          {bois.results.map(p => {
            let image = p.images.filter(i => i.filename.indexOf(".webp") === -1);
            let image_webp = p.images.filter(i => i.filename.indexOf(".webp") !== -1);
            return <li key={p.id} className='pb-2 px-2 my-2 ml-2 border-separate bg-yellow-400 rounded-md flex flex-col items-center w-4/6 md:w-2/6'>
              <h2 className='w-full text-xl'>{p.jouet}</h2>
              <span className='w-full flex justify-around items-center'>
                <h2 className='text-xl'>{`${p.prix}`}</h2>
                <button className='p-2 my-2 rounded-lg bg-white text-xl font-bold text-blue-900'>Acheter</button>
              </span>
              <picture>
                  <source srcSet={`${image_webp[0].url}`} type="image/webp" 
                  />
                  <img crossOrigin='anonymous' src={`${image[0].url}`} alt={`${p.jouet}`} width="190" height="190" />
              </picture>
            </li>
          })

          }
        </ul>
      </main>

    </>
  )
}