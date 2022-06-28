
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from '../../styles/MagazaScreen.module.css';

function MagazaScreen({data}){
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
  return (<Layout>
    <main className={styles.main}>
      <div className={styles.headText}>
      <h1>Salman Makine</h1>
      <h2>0542 744 78 39</h2>
      <h3>Aykosan Ayakkabıcılar Sanayi Sitesi 6lı E blok no:64</h3>
      <div className={styles.butonGroup}>
        
        <Link href={`/mesaj/${data.id}`}><div className={styles.mesajButton}>
          mesaj gönder</div>
        </Link>
        <Link href="tel:5551234567" ><div className={styles.callButton}>
            ara (+90 542 744 78 39)</div>
        </Link>
      </div>
      </div>
      <div className={styles.ilanlar}>
        <h1 className={styles.title}>
          ilanlar
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
      </div>
    </main>

  </Layout>)
}

export const getServerSideProps = async (context) => {
  return {
    props:{
      data: context.params
    }
  }
}

export default MagazaScreen;