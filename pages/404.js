import Link from 'next/link'
import styles from '../styles/NotFound.module.css'

export default function Notfound() {
  return (
      <section className={styles.section}>
        <main className={styles.main}>
          <h1 className={styles.hone}>404</h1><br/>
          <h2 className={styles.htwo}>aradığın burada değil</h2><br/>
          <h3 className={styles.hthere}>
            <Link href='/'><a className={styles.link}>
            ana sayfa
            </a></Link>'ya dönebilir veya arama kısmından aradığına ulaşabilirsin</h3>
        </main>
      </section>
  )
}