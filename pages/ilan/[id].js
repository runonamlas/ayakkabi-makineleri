import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Layout from "../../components/Layout";
import styles from '../../styles/ProductDetail.module.css';

function ProductPage({data}){
  const [image, setImage] = React.useState('add')
  const changeImage = (i) => {
    setImage(i)
  }

  return (<Layout>
    <Head>
      <title>{data.id}</title>
    </Head>
    <main className={styles.main}>
      <div className={styles.left}>
        <div class={styles.imageTop}>
          <button type="button" name="sag" onClick={()=>{}} className={styles.leftbutton}>&lt;</button>
          <Image className={styles.productimage} src={'/icons/'+ image + '.svg'}  height='700' width='700'/>
          <button type="button" name="sol" onClick={()=>{}} className={styles.rightbutton}>&gt;</button>

        </div>
        <div className={styles.imageDown}>
          <Image className={styles.productimage} src='/icons/home.svg' onClick={()=>{changeImage('home')}}  height='100' width='100'/>
          <Image className={styles.productimage} src='/icons/user.svg'  height='100' width='100'/>
          <Image className={styles.productimage} src='/icons/home.svg'  height='100' width='100'/>
          <Image className={styles.productimage} src='/icons/user.svg'  height='100' width='100'/>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla hahda akdskdjaj ajkdaskdja akdasdjakdj </h1>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>Satıcı</a>
          <Link href={`/magaza/${'salman-makine'}`}><a className={styles.productOwner}>Salman Makine</a></Link>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>İlan Tarihi</a>
          <a className={styles.productDetailData}>08.08.2022</a>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>İlan Adresi</a>
          <a className={styles.productDetailData}>İstanbul / Başakşehir</a>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>Marka</a>
          <a className={styles.productDetailData}>Bilinmiyor</a>
        </div>
        <a className={styles.productPrice}>15.000 TL</a>

        <Link href={`/mesaj/${data.id}`}><div className={styles.mesajButton}>
          mesaj gönder</div>
        </Link>
        <Link href="tel:5551234567" ><div className={styles.callButton}>
            ara (+90 542 744 78 39)</div>
        </Link>

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

export default ProductPage;