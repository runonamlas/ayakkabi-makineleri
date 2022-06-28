import Image from "next/image";
import Link from "next/link";
import Category from "../components/Category";
import Layout from "../components/Layout";
import styles from '../styles/ProductList.module.css'

export default function AyakkabiMakineleri(){
  const lastProducts = [
    { id: 0, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 1, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 2, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 3, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 4, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 5, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 6, title: 'Sahibinden sıfır ayarında bla bla bla ahsja ajhdajdha ahajdhad ajdh djah', to: '', price: '15.000', birim: 'TL' },,
    { id: 7, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 8, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 9, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 10, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 11, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 12, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 13, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 14, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 15, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 16, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 17, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 18, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 19, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
    { id: 20, title: 'Sahibinden sıfır ayarında bla bla bla', to: '', price: '15.000', birim: 'TL' },
  ]
  return <Layout>
    <Category catSelect={0}/>
    <main className={styles.main}>
        <h1 className={styles.title}>
          ayakkabı makineleri
        </h1>
        <div className={styles.productsList}>
          { lastProducts.map(product => (
            <Link key={product.id} href={`/ilan/${product.title}`}>
              <div className={styles.productCard}>
                <div className={styles.productLeft}>
                  <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100' layout='responsive'/>
                </div>
                <div className={styles.productRight}>
                  <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla hahdadhdh ahdhadhdhh ahdahdhsdh hadhasdhashdah</a>
                  <a className={styles.productOwner}>Salman Makine</a>
                  <a className={styles.productPrice}>15.000 TL</a>
                  <a className={styles.productAdress}>İstanbul / Başakşehir</a>
                </div>
              </div>
            </Link>
          ))}
          
        </div>

       
      </main>
  </Layout>
}