import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from '../styles/Mesajlar.module.css'

export default function Ilanlarim(){
  var id=2
  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>mesajlar</h1>
      <div className={styles.productList}>
        <Link href={`/mesaj/${id}`}>
          <div className={styles.productCard}>
            <div>
              <a className={styles.mesajTitle}>Onur Salman</a>
              <a className={styles.mesajContent}>Sahibinden sıfır ayarında bla bla bla</a>
            </div>
            <Image className={styles.productimage} src='/icons/right-arrow.svg' height='20' width='30' />
          </div>
        </Link>
        
      </div>
    </main>
  </Layout>
}