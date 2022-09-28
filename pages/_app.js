import Head from 'next/head';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <>
      <Head>
      <title>Ayakkabı Taban Kesim Kemer Makineleri Burada - ayakkab, Makineleri</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
   <Header/>
  <Component {...pageProps} />
  </>
}

export default MyApp
