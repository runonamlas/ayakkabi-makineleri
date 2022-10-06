import Head from 'next/head';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <>
      <Head>
      <title>Ayakkabı Taban Kesim Kemer vb. Makineleri Sahibinden Satılık - Ayakkabı Makineleri</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
   <Header/>
   <div style={{color:'#2F8d9d', position:'fixed', bottom:'0px', textAlign:'center', width:'100%', padding:'0.5em 0', fontSize:'1.2em', zIndex:'999'}}><p>Yardım veya sorularınız için <b>0544 565 8384</b> numarasını arayabilir veya Whattsap üzerinden ulaşabilirsiniz. </p></div>
  <Component {...pageProps} />
  </>
}

export default MyApp
