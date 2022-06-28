import Link from "next/link";
import Layout from "../components/Layout";
import styles from '../styles/Hesabim.module.css'

export default function Hesabim(){
  return <Layout navSelect={2}>
    <main className={styles.main}>
      <h1 className={styles.title}>Salman Makine</h1>
      <h2 className={styles.title}>0542 744 78 39</h2>
      <h3 className={styles.title}>Aykosan Ayakkabıcılar Sanayi Sitesi 6lı E blok no:64</h3>
      <div className={styles.hesapType}>
        <a>amatör hesap</a>
        <Link href='hesap-yukselt'>
          <div className={styles.saveButton}>
          yükselt</div>
        </Link>
      </div>
      <div className={styles.butonGroup}>
        <Link href='istatistikler'>
          <div className={styles.saveButton}>
          istatistikler</div>
        </Link><br/>
        <Link href='mesajlar'>
          <div className={styles.saveButton}>
          mesajlar</div>
        </Link><br/>
        <Link href='ilanlarim'>
          <div className={styles.saveButton}>
          ilanlarım</div>
        </Link><br/>
        <Link href='hesap-guncelle'>
          <div className={styles.saveButton}>
          bilgileri güncelle</div>
        </Link>
      </div>

      <div className={styles.butonGroup}>
        <Link href='hesap-yukselt'>
          <div className={styles.saveButton}>
          çıkış yap</div>
        </Link>
      </div>
      
    </main>

  </Layout>
}