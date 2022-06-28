import Image from "next/image";
import Layout from "../components/Layout";
import styles from '../styles/Ilanlarim.module.css'

export default function Ilanlarim(){
  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>ilanlarım</h1>
      <div>
        <h2 className={styles.categoryTitle}>
          taban ilanları
        </h2>
        <div className={styles.productList}>
          <div className={styles.productCard}>
            <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
            <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
            <a className={styles.productPrice}>15.000 TL</a>
          </div>
          <div className={styles.productCard}>
            <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
            <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
            <a className={styles.productPrice}>15.000 TL</a>
          </div>
          <div className={styles.productCard}>
            <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
            <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
            <a className={styles.productPrice}>15.000 TL</a>
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.categoryTitle}>
          ayakkabı ilanları
        </h2>
        <div className={styles.productList}>
          <div className={styles.productCard}>
            <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
            <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
            <a className={styles.productPrice}>15.000 TL</a>
          </div>
          <div className={styles.productCard}>
            <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
            <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
            <a className={styles.productPrice}>15.000 TL</a>
          </div>
          <div className={styles.productCard}>
            <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
            <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
            <a className={styles.productPrice}>15.000 TL</a>
          </div>
        </div>
      </div>
      
    </main>

  </Layout>
}