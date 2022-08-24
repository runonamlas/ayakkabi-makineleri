import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/NotFound.module.css'

export default function Notfound() {
  return (
      <section className={styles.section}>
        <Head>
          <title>404 - ayakkabi makineleri</title>
          <meta name='description' content='Aradığınız sayfayı bulamadık ama ana sayfaya giderek tüm ayakkabı taban kesim vb makinelerini görebilirsiniz.' />
          <meta name='twitter:url' content='https://ayakkabimakineleri.com/404' />
          <meta name='twitter:title' content='404 - ayakkabi makineleri' />
          <meta name='twitter:description' content='Aradığınız sayfayı bulamadık ama ana sayfaya giderek tüm ayakkabı taban kesim vb makinelerini görebilirsiniz.' />
          <meta property='og:title' content='404 - ayakkabi makineleri' />
          <meta property='og:description' content='Aradığınız sayfayı bulamadık ama ana sayfaya giderek tüm ayakkabı taban kesim vb makinelerini görebilirsiniz.' />
          <meta property='og:url' content='https://ayakkabimakineleri.com/404' />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.hone}>404</h1><br/>
          <h2 className={styles.htwo}>aradığın burada değil</h2><br/>
          <h3 className={styles.hthere}>
            <Link href='/'><a className={styles.link}>
            ana sayfa
            </a></Link>&quot;ya dönebilir veya arama kısmından aradığına ulaşabilirsin</h3>
        </main>
      </section>
  )
}